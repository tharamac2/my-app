from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core import security
from app.core.config import settings
from app.schemas.user import UserCreate, UserOut, Token, UserRegisterOut
from app.models.user import User
from app.services.activity_service import activity_service
from datetime import datetime

from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

router = APIRouter()

@router.post("/login", response_model=UserRegisterOut)
def login_user_json(
    request: Request,
    login_data: LoginRequest,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Standard JSON login for Mobile App supporting Email or Phone
    """
    user = db.query(User).filter(
        (User.email == login_data.email) | (User.phone == login_data.email)
    ).first()
    
    if not user or not security.verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    user.last_login = datetime.utcnow()
    db.commit()

    try:
        device_ua = request.headers.get("User-Agent", "Unknown")
        ip_addr = request.client.host if request.client else "Unknown"
        activity_service.log(db, user.id, "login", "User logged in via mobile app", device=device_ua, ip_address=ip_addr)
    except Exception:
        pass

    token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    
    return {
        "user": user,
        "token": token
    }

@router.post("/login/access-token", response_model=Token)
def login_access_token(
    request: Request,
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.add(user)
    db.commit()

    # Log activity
    device_ua = request.headers.get("User-Agent", "Unknown")
    ip_addr = request.client.host if request.client else "Unknown"
    activity_service.log(db, user.id, "login", "User logged in via email", device=device_ua, ip_address=ip_addr)

    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/register", response_model=UserRegisterOut)
def register_user(
    *,
    request: Request,
    db: Session = Depends(deps.get_db),
    user_in: UserCreate
) -> Any:
    """
    Create new user.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    db_obj = User(
        email=user_in.email,
        password_hash=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        phone=user_in.phone
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    try:
        # Log activity
        device_ua = request.headers.get("User-Agent", "Unknown")
        ip_addr = request.client.host if request.client else "Unknown"
        activity_service.log(db, db_obj.id, "registration", "User registered a new account", device=device_ua, ip_address=ip_addr)
    except Exception as e:
        # Prevent registration failure if activity logging fails
        pass

    # Generate token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = security.create_access_token(
        db_obj.id, expires_delta=access_token_expires
    )

    return {
        "user": db_obj,
        "token": token
    }

@router.get("/me", response_model=UserOut)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user
