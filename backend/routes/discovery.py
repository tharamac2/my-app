from flask import Blueprint, request, jsonify
from models import db, User, Match
from astrology_matcher import calculate_compatibility
from flask_jwt_extended import jwt_required, get_jwt_identity

discovery_bp = Blueprint('discovery', __name__)

@discovery_bp.route('/feed', methods=['GET'])
@jwt_required()
def get_feed():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Get users we have already interacted with
    interacted = Match.query.filter_by(source_user_id=user_id).all()
    interacted_ids = [m.target_user_id for m in interacted]
    
    # Add ourselves to the ignore list
    interacted_ids.append(user_id)

    # Basic query to find users of opposite gender (simplified logic)
    target_gender = 'girl' if user.gender == 'boy' else 'boy'
    
    candidates = User.query.filter(
        User.gender == target_gender,
        ~User.id.in_(interacted_ids)
    ).limit(20).all()

    results = []
    
    for c in candidates:
        # Calculate compatibility if both have astrology data
        compat = None
        if user.astrology and c.astrology:
            boy_ast = user.astrology if user.gender == 'boy' else c.astrology
            girl_ast = c.astrology if c.gender == 'girl' else user.astrology
            
            if boy_ast.nakshatra and boy_ast.rasi and girl_ast.nakshatra and girl_ast.rasi:
                try:
                    compat_res = calculate_compatibility(boy_ast.nakshatra, boy_ast.rasi, girl_ast.nakshatra, girl_ast.rasi)
                    compat = compat_res.get("overall_percentage", 0)
                except Exception:
                    pass

        # Primary photo
        primary_photo = next((p.photo_url for p in c.photos if p.is_primary), None)
        if not primary_photo and c.photos:
            primary_photo = c.photos[0].photo_url

        from datetime import date
        age = None
        if c.dob:
            today = date.today()
            age = today.year - c.dob.year - ((today.month, today.day) < (c.dob.month, c.dob.day))

        results.append({
            "id": c.id,
            "full_name": c.full_name,
            "age": age,
            "location": c.location,
            "profession": c.details.profession if c.details else None,
            "education": c.details.education if c.details else None,
            "compatibility_score": compat,
            "photo_url": primary_photo
        })

    return jsonify({"feed": results}), 200
