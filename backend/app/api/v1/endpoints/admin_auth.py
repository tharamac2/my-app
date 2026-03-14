from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.admin_model import Admin
from app.schemas.admin_schemas import AdminOut, AdminCreate, Token
from app.core.security import get_password_hash, verify_password

router = APIRouter()

@router.post("/login", response_model=Token)
def login_admin(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, retrieve an access token for future requests
    """
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()
    if not admin or not verify_password(form_data.password, admin.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not admin.is_active:
        raise HTTPException(status_code=400, detail="Inactive admin")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            admin.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/me", response_model=AdminOut)
def read_admin_me(
    current_admin: Admin = Depends(deps.get_current_admin),
) -> Any:
    """
    Get current logged in admin.
    """
    return current_admin
