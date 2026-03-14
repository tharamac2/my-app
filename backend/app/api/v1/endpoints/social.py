from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.models.user import User
from app.models.social import Match, Favorite, Report, Block
from app.schemas.social import MatchAction, MatchOut, FavoriteCreate, ReportCreate, BlockCreate

router = APIRouter()

@router.post("/match/action", response_model=MatchOut)
def handle_match_action(
    *,
    db: Session = Depends(deps.get_db),
    action_in: MatchAction,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Handle like/pass action.
    """
    # Check if target user exists
    target = db.query(User).filter(User.id == action_in.target_user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target user not found")
        
    # Check if action already exists
    match = db.query(Match).filter(
        Match.source_user_id == current_user.id,
        Match.target_user_id == action_in.target_user_id
    ).first()
    
    if match:
        match.status = action_in.action
    else:
        match = Match(
            source_user_id=current_user.id,
            target_user_id=action_in.target_user_id,
            status=action_in.action
        )
        db.add(match)
    
    # Check for mutual like
    if action_in.action == 'liked':
        reverse_match = db.query(Match).filter(
            Match.source_user_id == action_in.target_user_id,
            Match.target_user_id == current_user.id,
            Match.status == 'liked'
        ).first()
        if reverse_match:
            match.status = 'matched'
            reverse_match.status = 'matched'
            
    db.commit()
    db.refresh(match)
    return match

@router.post("/favorites", response_model=Any)
def add_to_favorites(
    *,
    db: Session = Depends(deps.get_db),
    fav_in: FavoriteCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    existing = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.target_id == fav_in.target_id
    ).first()
    if existing:
        return {"message": "Already in favorites"}
        
    fav = Favorite(user_id=current_user.id, target_id=fav_in.target_id)
    db.add(fav)
    db.commit()
    return {"message": "Added to favorites"}

@router.post("/reports", response_model=Any)
def report_user(
    *,
    db: Session = Depends(deps.get_db),
    report_in: ReportCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    report = Report(
        reporter_id=current_user.id,
        reported_id=report_in.reported_id,
        reason=report_in.reason
    )
    db.add(report)
    db.commit()
    return {"message": "Report submitted successfully"}

@router.post("/blocks", response_model=Any)
def block_user(
    *,
    db: Session = Depends(deps.get_db),
    block_in: BlockCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    existing = db.query(Block).filter(
        Block.blocker_id == current_user.id,
        Block.blocked_id == block_in.blocked_id
    ).first()
    if existing:
        return {"message": "Already blocked"}
        
    block = Block(blocker_id=current_user.id, blocked_id=block_in.blocked_id)
    db.add(block)
    db.commit()
    return {"message": "User blocked"}
