from fastapi import APIRouter
from app.api.v1.endpoints import auth, profile, social, chat, discovery, notification, billing, admin, admin_auth, admin_notifications

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(social.router, prefix="/social", tags=["social"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(discovery.router, prefix="/discovery", tags=["discovery"])
api_router.include_router(notification.router, prefix="/notification", tags=["notification"])
api_router.include_router(billing.router, prefix="/billing", tags=["billing"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(admin_auth.router, prefix="/admin/auth", tags=["admin_auth"])
api_router.include_router(admin_notifications.router, prefix="/admin/notifications", tags=["admin_notifications"])
