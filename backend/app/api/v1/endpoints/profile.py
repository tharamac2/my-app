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
    LocationDetailCreate,
    CompleteProfileSetup
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

@router.put("/me/setup", response_model=ProfileCompleteOut)
def complete_profile_setup(
    *,
    db: Session = Depends(deps.get_db),
    setup_in: CompleteProfileSetup,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    # 1. Update User
    if setup_in.full_name:
        current_user.full_name = setup_in.full_name
        
    # 2. Update Profile
    profile = current_user.profile
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
    if setup_in.gender is not None: profile.gender = setup_in.gender
    if setup_in.dob is not None: profile.dob = setup_in.dob
    if setup_in.religion is not None: profile.religion = setup_in.religion
    if setup_in.caste is not None: profile.caste = setup_in.caste
    
    # 3. Update Details
    details = current_user.details
    if not details:
        details = UserDetail(user_id=current_user.id)
        db.add(details)
    if setup_in.height is not None: details.height = setup_in.height
    if setup_in.weight is not None: details.weight = setup_in.weight
    if setup_in.education is not None: details.education = setup_in.education
    if setup_in.profession is not None: details.occupation = setup_in.profession
    if setup_in.income is not None: details.annual_income = setup_in.income
    
    # 4. Update Location
    location = current_user.location
    if not location:
        location = LocationDetail(user_id=current_user.id)
        db.add(location)
    if setup_in.location:
        parts = [p.strip() for p in setup_in.location.split(',')]
        if len(parts) >= 1: location.city = parts[0]
        if len(parts) >= 2: location.state = parts[1]
        if len(parts) >= 3: location.country = parts[2]
        else: location.country = "India"
        
    db.commit()
    db.refresh(current_user)
    return current_user
