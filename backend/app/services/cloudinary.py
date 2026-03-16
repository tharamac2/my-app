import cloudinary
import cloudinary.uploader
from app.core.config import settings

if settings.CLOUDINARY_CLOUD_NAME:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

def upload_image(file_obj, folder="ratan_matrimony"):
    result = cloudinary.uploader.upload(file_obj, folder=folder)
    return result.get("secure_url"), result.get("public_id")

def delete_image(public_id):
    cloudinary.uploader.destroy(public_id)
