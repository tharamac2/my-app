from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
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
    CompleteProfileSetup,
    ProfileEditAll,
    UserPreferenceCreate
)
from app.services import cloudinary as cloudinary_service

from pydantic import BaseModel

class ProfileUpdateAll(BaseModel):
    full_name: str | None = None
    gender: str | None = None
    dob: str | None = None
    location: str | None = None
    height: str | None = None
    weight: str | None = None
    religion: str | None = None
    caste: str | None = None
    education: str | None = None
    profession: str | None = None
    income: str | None = None
    nakshatra: str | None = None
    rasi: str | None = None
    profile_photos: list[str] | None = None

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

@router.put("/me/all", response_model=ProfileCompleteOut)
def update_profile_all(
    *,
    db: Session = Depends(deps.get_db),
    data: ProfileUpdateAll,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update everything from a single large JSON payload.
    """
    if data.full_name:
        current_user.full_name = data.full_name

    # Profile
    profile = current_user.profile
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
    
    if data.gender: profile.gender = data.gender
    if data.dob:
        from datetime import datetime
        try:
            profile.dob = datetime.fromisoformat(data.dob.replace('Z', '+00:00')).date()
        except Exception:
            pass
    if data.religion: profile.religion = data.religion
    if data.caste: profile.caste = data.caste

    # Details
    details = current_user.details
    if not details:
        details = UserDetail(user_id=current_user.id)
        db.add(details)

    if data.height: details.height = data.height
    if data.weight: details.weight = data.weight
    if data.education: details.education = data.education
    if data.profession: details.occupation = data.profession
    if data.income: details.annual_income = data.income

    # Location
    if data.location:
        loc = current_user.location
        if not loc:
            loc = LocationDetail(user_id=current_user.id)
            db.add(loc)
        
        parts = [p.strip() for p in data.location.split(',')]
        if len(parts) >= 1: loc.city = parts[0]
        if len(parts) >= 2: loc.state = parts[1]
        if len(parts) >= 3: loc.country = parts[2]

    # Handle photos if provided (as URLs)
    if data.profile_photos:
        db.query(UserPhoto).filter(UserPhoto.user_id == current_user.id).delete()
        for idx, url in enumerate(data.profile_photos):
            photo = UserPhoto(
                user_id=current_user.id,
                photo_url=url,
                is_primary=(idx == 0)
            )
            db.add(photo)

    db.add(current_user)
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

@router.put("/me/edit-all", response_model=ProfileCompleteOut)
def update_profile_edit_all(
    *,
    db: Session = Depends(deps.get_db),
    data_in: ProfileEditAll,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update all editable profile fields natively from the mobile React Native screen.
    Translates flat JSON map natively into the four relational SQL User tables.
    """
    # 1. Update User basic info
    if data_in.full_name is not None:
        current_user.full_name = data_in.full_name
    if data_in.phone is not None:
        current_user.phone = data_in.phone

    # 2. Update UserProfile
    profile = current_user.profile
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
    if data_in.bio is not None:
        profile.bio = data_in.bio

    # 3. Update LocationDetail
    loc = current_user.location
    if not loc:
        loc = LocationDetail(user_id=current_user.id)
        db.add(loc)
    if data_in.location is not None:
        parts = [p.strip() for p in data_in.location.split(',')]
        if len(parts) >= 2:
            loc.city = parts[0]
            loc.state = parts[-1]
        else:
            loc.city = data_in.location

    # 4. Update UserDetail (education, profession/occupation)
    details = current_user.details
    if not details:
        details = UserDetail(user_id=current_user.id)
        db.add(details)
    if data_in.profession is not None:
        details.occupation = data_in.profession
    if data_in.education is not None:
        details.education = data_in.education

    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/me/photos")
async def upload_profile_photo(
    *,
    request: Request,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    try:
        form = await request.form()
        file = form.get("file")
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
            
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
    except Exception as e:
        import traceback
        err_str = traceback.format_exc()
        raise HTTPException(status_code=500, detail=err_str)

@router.delete("/me/photos/{photo_id}")
def delete_profile_photo(
    photo_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    photo = db.query(UserPhoto).filter(UserPhoto.id == photo_id, UserPhoto.user_id == current_user.id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    db.delete(photo)
    db.commit()
    return {"message": "Photo deleted"}

@router.put("/me/photos/{photo_id}/primary")
def set_primary_photo(
    photo_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    photo = db.query(UserPhoto).filter(UserPhoto.id == photo_id, UserPhoto.user_id == current_user.id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    
    db.query(UserPhoto).filter(UserPhoto.user_id == current_user.id).update({"is_primary": False})
    
    photo.is_primary = True
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
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/preferences", response_model=ProfileCompleteOut)
def update_profile_preferences(
    *,
    db: Session = Depends(deps.get_db),
    preferences_in: UserPreferenceCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    from app.models.user import UserPreference
    prefs = current_user.preferences
    if not prefs:
        prefs = UserPreference(user_id=current_user.id)
        db.add(prefs)
    
    update_data = preferences_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(prefs, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user
