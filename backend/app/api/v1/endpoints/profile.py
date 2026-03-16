from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.api import deps
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.schemas.profile import (
    UserProfileUpdate, # I'll need to define generic update schemas or use the base ones
    ProfileCompleteOut,
    UserProfileCreate,
    UserDetailCreate,
    FamilyDetailCreate,
    LocationDetailCreate
)
from app.services import cloudinary as cloudinary_service

router = APIRouter()

@router.get("/me", response_model=ProfileCompleteOut)
def read_profile_me(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user's complete profile.
    """
    return current_user

@router.put("/me/basic", response_model=ProfileCompleteOut)
def update_profile_basic(
    *,
    db: Session = Depends(deps.get_db),
    profile_in: UserProfileCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update basic profile info.
    """
    profile = current_user.profile
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/details", response_model=ProfileCompleteOut)
def update_profile_details(
    *,
    db: Session = Depends(deps.get_db),
    details_in: UserDetailCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    details = current_user.details
    if not details:
        details = UserDetail(user_id=current_user.id)
        db.add(details)
    
    update_data = details_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(details, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/family", response_model=ProfileCompleteOut)
def update_profile_family(
    *,
    db: Session = Depends(deps.get_db),
    family_in: FamilyDetailCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    family = current_user.family
    if not family:
        family = FamilyDetail(user_id=current_user.id)
        db.add(family)
    
    update_data = family_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(family, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/location", response_model=ProfileCompleteOut)
def update_profile_location(
    *,
    db: Session = Depends(deps.get_db),
    location_in: LocationDetailCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    location = current_user.location
    if not location:
        location = LocationDetail(user_id=current_user.id)
        db.add(location)
    
    update_data = location_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(location, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/me/photos")
async def upload_profile_photo(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    url, public_id = cloudinary_service.upload_image(file.file)
    # Check if user already has primary photo
    has_primary = db.query(UserPhoto).filter(UserPhoto.user_id == current_user.id, UserPhoto.is_primary == True).first()
    
    photo = UserPhoto(
        user_id=current_user.id,
        photo_url=url,
        public_id=public_id,
        is_primary=not bool(has_primary)
    )
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo
