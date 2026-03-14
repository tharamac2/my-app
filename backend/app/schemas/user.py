from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import date

# Base User Properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str
    full_name: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: Optional[str] = None
    is_active: bool = True
    is_verified: bool = False
    role: str = "user"

    class Config:
        from_attributes = True

# Additional properties to return via API
class UserOut(UserInDBBase):
    pass

class UserRegisterOut(BaseModel):
    user: UserOut
    token: str

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
