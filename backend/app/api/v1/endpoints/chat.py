import json
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, desc, func

from app.api import deps
from app.models.user import User
from app.models.social import Message
from app.schemas.chat import MessageCreate, MessageOut, ConversationOut
from app.core.websocket import manager

router = APIRouter()

@router.get("/conversations", response_model=List[ConversationOut])
def get_conversations(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    # Subquery to find the latest message per peer
    subquery = db.query(
        func.max(Message.id).label("max_id")
    ).filter(
        or_(Message.sender_id == current_user.id, Message.receiver_id == current_user.id)
    ).group_by(
        func.if_(Message.sender_id == current_user.id, Message.receiver_id, Message.sender_id)
    ).subquery()

    latest_messages = db.query(Message).filter(Message.id.in_(subquery)).order_by(desc(Message.created_at)).all()
    
    results = []
    for msg in latest_messages:
        peer_id = msg.receiver_id if msg.sender_id == current_user.id else msg.sender_id
        peer = db.query(User).filter(User.id == peer_id).first()
        
        unread_count = db.query(func.count(Message.id)).filter(
            and_(Message.sender_id == peer_id, Message.receiver_id == current_user.id, Message.is_read == False)
        ).scalar()
        
        results.append({
            "with_user_id": peer_id,
            "with_user_name": peer.full_name,
            "last_message": msg.text,
            "last_message_time": msg.created_at,
            "unread_count": unread_count
        })
        
    return results

@router.get("/messages/{peer_id}", response_model=List[MessageOut])
def get_messages_with_peer(
    peer_id: str,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    messages = db.query(Message).filter(
        or_(
            and_(Message.sender_id == current_user.id, Message.receiver_id == peer_id),
            and_(Message.sender_id == peer_id, Message.receiver_id == current_user.id)
        )
    ).order_by(Message.created_at).all()
    
    # Mark messages as read
    db.query(Message).filter(
        and_(Message.sender_id == peer_id, Message.receiver_id == current_user.id, Message.is_read == False)
    ).update({"is_read": True}, synchronize_session=False)
    db.commit()
    
    return messages

@router.post("/messages", response_model=MessageOut)
async def send_message(
    *,
    db: Session = Depends(deps.get_db),
    msg_in: MessageCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    db_obj = Message(
        sender_id=current_user.id,
        receiver_id=msg_in.receiver_id,
        text=msg_in.text,
        type=msg_in.type,
        media_url=msg_in.media_url
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    # Broadcast via WebSocket
    payload = {
        "event": "new_message",
        "data": {
            "id": db_obj.id,
            "sender_id": db_obj.sender_id,
            "text": db_obj.text,
            "type": db_obj.type,
            "created_at": str(db_obj.created_at)
        }
    }
    await manager.send_personal_message(json.dumps(payload), msg_in.receiver_id)
    
    return db_obj

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    # In production, we'd verify the token here too
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming client events if needed (like 'typing' status)
            await websocket.send_text(f"Message received: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)
