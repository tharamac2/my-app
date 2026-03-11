from flask import Blueprint, request, jsonify
from models import db, User, UserDetail, UserPreference, UserAstrology, UserPhoto
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/me', methods=['GET'])
@jwt_required()
def get_my_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    # Serialize data
    data = {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "dob": str(user.dob) if user.dob else None,
        "gender": user.gender,
        "phone": user.phone,
        "location": user.location,
        "bio": user.bio,
        "details": {
            "height": user.details.height if user.details else None,
            "religion": user.details.religion if user.details else None,
            "caste": user.details.caste if user.details else None,
            "education": user.details.education if user.details else None,
            "profession": user.details.profession if user.details else None,
        },
        "preferences": {
            "min_age": user.preferences.min_age if user.preferences else None,
            "max_age": user.preferences.max_age if user.preferences else None,
        },
        "astrology": {
            "nakshatra": user.astrology.nakshatra if user.astrology else None,
            "rasi": user.astrology.rasi if user.astrology else None,
        },
        "photos": [{"id": p.id, "url": p.photo_url, "is_primary": p.is_primary} for p in user.photos]
    }
    return jsonify(data), 200

@profile_bp.route('/me/details', methods=['PUT'])
@jwt_required()
def update_details():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    
    import datetime
    
    # Update base fields
    if 'full_name' in data: user.full_name = data['full_name']
    if 'location' in data: user.location = data['location']
    if 'bio' in data: user.bio = data['bio']
    if 'gender' in data: user.gender = data['gender']
    if 'phone' in data: user.phone = data['phone']
    if 'dob' in data and data['dob']: 
        try:
            user.dob = datetime.datetime.fromisoformat(data['dob'].replace('Z', '+00:00')).date()
        except:
            pass
    
    # Update detail fields
    if not user.details:
        user.details = UserDetail(user_id=user.id)
    if 'height' in data: user.details.height = data['height']
    if 'weight' in data: user.details.weight = data.get('weight') # if weight exists
    if 'religion' in data: user.details.religion = data['religion']
    if 'caste' in data: user.details.caste = data['caste']
    if 'education' in data: user.details.education = data.get('education')
    if 'profession' in data: user.details.profession = data['profession']
    if 'yearly_income' in data: user.details.yearly_income = data.get('income')

    # Update astrology fields
    if data.get('nakshatra') or data.get('rasi'):
        if not user.astrology:
            user.astrology = UserAstrology(user_id=user.id)
        if 'nakshatra' in data: user.astrology.nakshatra = data['nakshatra']
        if 'rasi' in data: user.astrology.rasi = data['rasi']
    
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
