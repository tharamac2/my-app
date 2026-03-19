import cloudinary
import cloudinary.uploader
from app.core.config import settings
import uuid

if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY != '123456789':
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

def upload_image(file_obj, folder="ratan_matrimony"):
    if not settings.CLOUDINARY_API_KEY or settings.CLOUDINARY_API_KEY == '123456789':
        # Developer mock bypass to prevent 500 Server Errors
        dummy_id = str(uuid.uuid4())
        return f"https://ui-avatars.com/api/?name=User+Photo&background=random&size=200&id={dummy_id}", dummy_id
        
    result = cloudinary.uploader.upload(file_obj, folder=folder)
    return result.get("secure_url"), result.get("public_id")

def delete_image(public_id):
    if not settings.CLOUDINARY_API_KEY or settings.CLOUDINARY_API_KEY == '123456789':
        return True
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception:
        pass
