from flask import Blueprint, request, jsonify
from models import db, Message, Match, User
from flask_jwt_extended import jwt_required, get_jwt_identity

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    user_id = get_jwt_identity()
    matches = Match.query.filter(
        (Match.source_user_id == user_id) | (Match.target_user_id == user_id),
        Match.status == 'matched'
    ).all()
    
    results = []
    for m in matches:
        partner_id = m.target_user_id if m.source_user_id == user_id else m.source_user_id
        partner = User.query.get(partner_id)
        if partner:
            last_msg = Message.query.filter_by(match_id=m.id).order_by(Message.created_at.desc()).first()
            unread_count = Message.query.filter_by(match_id=m.id, sender_id=partner_id, is_read=False).count()
            
            primary_photo = next((p.photo_url for p in partner.photos if p.is_primary), None)
            if not primary_photo and partner.photos:
                primary_photo = partner.photos[0].photo_url
                
            results.append({
                "match_id": m.id,
                "partner_id": partner_id,
                "name": partner.full_name,
                "imageUrl": primary_photo,
                "lastMessage": last_msg.text if last_msg else "Start a conversation",
                "time": last_msg.created_at.isoformat() if last_msg else None,
                "unread": unread_count
            })
            
    # Sort by most recent message
    results.sort(key=lambda x: x['time'] or '', reverse=True)
    return jsonify({"conversations": results}), 200

@chat_bp.route('/<int:match_id>', methods=['GET'])
@jwt_required()
def get_chat(match_id):
    user_id = get_jwt_identity()
    
    # Verify the user is part of this match
    match = Match.query.get(match_id)
    if not match:
        return jsonify({"error": "Match not found"}), 404
        
    if match.source_user_id != user_id and match.target_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
        
    messages = Message.query.filter_by(match_id=match_id).order_by(Message.created_at.asc()).all()
    
    results = []
    for m in messages:
        results.append({
            "id": m.id,
            "sender_id": m.sender_id,
            "text": m.text,
            "is_read": m.is_read,
            "created_at": m.created_at.isoformat()
        })
        # Mark as read if received by current user
        if m.sender_id != user_id and not m.is_read:
            m.is_read = True

    db.session.commit()
    return jsonify({"messages": results}), 200

@chat_bp.route('/<int:match_id>/send', methods=['POST'])
@jwt_required()
def send_message(match_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({"error": "Message text is required"}), 400

    # Verify the user is part of this match
    match = Match.query.get(match_id)
    if not match:
        return jsonify({"error": "Match not found"}), 404
        
    if match.source_user_id != user_id and match.target_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
        
    new_message = Message(match_id=match_id, sender_id=user_id, text=text)
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({
        "message": "Sent",
        "data": {
            "id": new_message.id,
            "sender_id": new_message.sender_id,
            "text": new_message.text,
            "created_at": new_message.created_at.isoformat()
        }
    }), 201
