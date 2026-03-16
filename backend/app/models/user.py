import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Date, DateTime, Text, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base_class import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role = Column(Enum("user", "admin", name="user_role_enum"), default="user")
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Relationships
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    details = relationship("UserDetail", back_populates="user", uselist=False, cascade="all, delete-orphan")
    family = relationship("FamilyDetail", back_populates="user", uselist=False, cascade="all, delete-orphan")
    location = relationship("LocationDetail", back_populates="user", uselist=False, cascade="all, delete-orphan")
    photos = relationship("UserPhoto", back_populates="user", cascade="all, delete-orphan")
    # preferences = relationship("UserPreference", back_populates="user", uselist=False, cascade="all, delete-orphan")
    # astrology = relationship("UserAstrology", back_populates="user", uselist=False, cascade="all, delete-orphan")
    subscription = relationship("Subscription", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    gender = Column(String(20))
    dob = Column(Date)
    religion = Column(String(50))
    caste = Column(String(50))
    sub_caste = Column(String(50))
    marital_status = Column(String(50))
    bio = Column(Text)
    
    user = relationship("User", back_populates="profile")

class UserDetail(Base):
    __tablename__ = "user_details"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    height = Column(String(20))
    weight = Column(String(20))
    education = Column(String(100))
    occupation = Column(String(100))
    annual_income = Column(String(50))
    
    user = relationship("User", back_populates="details")

class FamilyDetail(Base):
    __tablename__ = "family_details"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    father_name = Column(String(100))
    mother_name = Column(String(100))
    family_type = Column(String(50)) # Joint, Nuclear
    family_status = Column(String(50)) # Rich, Middle, etc.
    siblings = Column(String(100))
    
    user = relationship("User", back_populates="family")

class LocationDetail(Base):
    __tablename__ = "location_details"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    country = Column(String(100), default="India")
    state = Column(String(100))
    city = Column(String(100))
    
    user = relationship("User", back_populates="location")

class UserPhoto(Base):
    __tablename__ = "user_photos"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    photo_url = Column(String(255), nullable=False)
    public_id = Column(String(255)) # For Cloudinary management
    is_primary = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="photos")
