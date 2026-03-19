from typing import Any, List
from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.api import deps
from app.models.user import User, UserPhoto, UserProfile, LocationDetail
from app.schemas.discovery import FeedOut, DiscoveryProfileOut
from app.services.astrology import calculate_compatibility

router = APIRouter()

def calculate_age(born: date) -> int:
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def format_profile(user: User, current_user_astrology=None) -> DiscoveryProfileOut:
    primary_photo = next((p.photo_url for p in user.photos if p.is_primary), None)
    if not primary_photo and user.photos:
        primary_photo = user.photos[0].photo_url
        
    age = calculate_age(user.profile.dob) if (user.profile and user.profile.dob) else 0
    
    score = None
    if current_user_astrology and getattr(user, 'astrology', None):
        try:
            res = calculate_compatibility(
                current_user_astrology.nakshatra, current_user_astrology.rasi,
                user.astrology.nakshatra, user.astrology.rasi
            )
            score = int(res["percentage"])
        except:
            pass
            
    return DiscoveryProfileOut(
        id=user.id,
        full_name=user.full_name,
        age=age,
        height=user.details.height if user.details else None,
        location=f"{user.location.city}, {user.location.state}" if user.location else None,
        religion=user.profile.religion if user.profile else None,
        caste=user.profile.caste if user.profile else None,
        profession=user.details.occupation if user.details else None,
        photo_url=primary_photo,
        compatibility_score=score,
        is_premium=user.subscription.tier != 'free' if user.subscription else False,
        bioSnippet=user.profile.bio[:100] + "..." if (user.profile and user.profile.bio) else ""
    )

@router.get("/feed", response_model=FeedOut)
def get_discovery_feed(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Generate discovery feed segments.
    """
    # Exclude current user and blocked users (logic to be added if needed)
    base_query = db.query(User).filter(User.id != current_user.id)
    
    all_users = base_query.limit(50).all()
    
    # Simple segmentation for MVP
    recommended = []
    nearby = []
    recently_joined = sorted(all_users, key=lambda x: x.created_at, reverse=True)[:10]
    premium = [u for u in all_users if (u.subscription and u.subscription.tier != 'free')][:10]
    
    my_astro = getattr(current_user, 'astrology', None)
    
    feed_users = all_users[:20] # For recommended and nearby logic
    for u in feed_users:
        formatted = format_profile(u, my_astro)
        recommended.append(formatted)
        
        # Nearby logic (simple city match for now)
        if current_user.location and u.location and current_user.location.city == u.location.city:
            nearby.append(formatted)
            
    return FeedOut(
        recommended=recommended,
        nearby=nearby,
        recently_joined=[format_profile(u, my_astro) for u in recently_joined],
        premium=[format_profile(u, my_astro) for u in premium]
    )
