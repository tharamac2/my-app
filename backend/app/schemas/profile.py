from typing import Optional, List
from pydantic import BaseModel
from datetime import date

# UserProfile schemas
class UserProfileBase(BaseModel):
    gender: Optional[str] = None
    dob: Optional[date] = None
    religion: Optional[str] = None
    caste: Optional[str] = None
    sub_caste: Optional[str] = None
    marital_status: Optional[str] = None
    bio: Optional[str] = None

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileOut(UserProfileBase):
    id: int
    user_id: str
    class Config:
        from_attributes = True

# UserDetail schemas
class UserDetailBase(BaseModel):
    height: Optional[str] = None
    weight: Optional[str] = None
    education: Optional[str] = None
    occupation: Optional[str] = None
    annual_income: Optional[str] = None

class UserDetailCreate(UserDetailBase):
    pass

class UserDetailOut(UserDetailBase):
    id: int
    user_id: str
    class Config:
        from_attributes = True

# FamilyDetail schemas
class FamilyDetailBase(BaseModel):
    father_name: Optional[str] = None
    mother_name: Optional[str] = None
    family_type: Optional[str] = None
    family_status: Optional[str] = None
    siblings: Optional[str] = None

class FamilyDetailCreate(FamilyDetailBase):
    pass

class FamilyDetailOut(FamilyDetailBase):
    id: int
    user_id: str
    class Config:
        from_attributes = True

# UserPreference schemas
class UserPreferenceBase(BaseModel):
    age_range: Optional[str] = None
    height_range: Optional[str] = None
    marital_status: Optional[str] = None
    religion: Optional[str] = None
    caste: Optional[str] = None
    education: Optional[str] = None
    profession: Optional[str] = None
    location: Optional[str] = None

class UserPreferenceCreate(UserPreferenceBase):
    pass

class UserPreferenceOut(UserPreferenceBase):
    id: int
    user_id: str
    class Config:
        from_attributes = True

# LocationDetail schemas
class LocationDetailBase(BaseModel):
    country: Optional[str] = "India"
    state: Optional[str] = None
    city: Optional[str] = None

class LocationDetailCreate(LocationDetailBase):
    pass

class LocationDetailOut(LocationDetailBase):
    id: int
    user_id: str
    class Config:
        from_attributes = True

# Aggregated Profile View
class ProfileCompleteOut(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    is_verified: bool
    profile: Optional[UserProfileOut] = None
    details: Optional[UserDetailOut] = None
    family: Optional[FamilyDetailOut] = None
    location: Optional[LocationDetailOut] = None
    preferences: Optional[UserPreferenceOut] = None
    class Config:
        from_attributes = True

class CompleteProfileSetup(BaseModel):
    full_name: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[date] = None
    location: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    religion: Optional[str] = None
    caste: Optional[str] = None
    education: Optional[str] = None
    profession: Optional[str] = None

class ProfileEditAll(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    profession: Optional[str] = None
    education: Optional[str] = None
    income: Optional[str] = None
    nakshatra: Optional[str] = None
    rasi: Optional[str] = None
    profile_photos: Optional[List[str]] = None

