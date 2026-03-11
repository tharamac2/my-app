from flask import Blueprint, request, jsonify
from models import db, Match, User
from flask_jwt_extended import jwt_required, get_jwt_identity

matches_bp = Blueprint('matches', __name__)

@matches_bp.route('/action', methods=['POST'])
@jwt_required()
def match_action():
    user_id = get_jwt_identity()
    data = request.get_json()
    target_id = data.get('target_id')
    action = data.get('action') # 'like' or 'pass'
    
    if not target_id or action not in ['like', 'pass']:
        return jsonify({"error": "Invalid request"}), 400

    if target_id == user_id:
        return jsonify({"error": "Cannot interact with yourself"}), 400
        
    # Check if interaction already exists
    existing = Match.query.filter_by(source_user_id=user_id, target_user_id=target_id).first()
    if existing:
        return jsonify({"message": "Interaction already recorded"}), 200

    # Record new interaction
    new_match = Match(source_user_id=user_id, target_user_id=target_id, status=action)
    db.session.add(new_match)
    
    response_msg = "Disliked profile"
    is_match = False
    
    if action == 'like':
        response_msg = "Liked profile"
        # Check for mutual match
        mutual = Match.query.filter_by(source_user_id=target_id, target_user_id=user_id, status='like').first()
        if mutual:
            # Upgrade both to 'matched'
            new_match.status = 'matched'
            mutual.status = 'matched'
            is_match = True
            response_msg = "It's a Match!"

    db.session.commit()
    return jsonify({"message": response_msg, "is_match": is_match}), 200

@matches_bp.route('/', methods=['GET'])
@jwt_required()
def get_matches():
    user_id = get_jwt_identity()

    mutual_matches = Match.query.filter(
        (Match.source_user_id == user_id) | (Match.target_user_id == user_id),
        Match.status == 'matched'
    ).all()

    liked_you_matches = Match.query.filter_by(target_user_id=user_id, status='like').all()
    your_likes_matches = Match.query.filter_by(source_user_id=user_id, status='like').all()
    
    def serialize_match(match_obj, partner_id):
        partner = User.query.get(partner_id)
        if not partner: return None
        primary_photo = next((p.photo_url for p in partner.photos if p.is_primary), None)
        if not primary_photo and partner.photos:
            primary_photo = partner.photos[0].photo_url
        return {
            "match_id": match_obj.id,
            "partner_id": partner_id,
            "full_name": partner.full_name,
            "photo_url": primary_photo,
            "location": partner.location,
            "profession": partner.details.profession if partner.details else None
        }

    results = {
        "mutual": [],
        "liked_you": [],
        "your_likes": []
    }

    for m in mutual_matches:
        partner_id = m.target_user_id if m.source_user_id == user_id else m.source_user_id
        data = serialize_match(m, partner_id)
        if data: results["mutual"].append(data)
        
    for m in liked_you_matches:
        data = serialize_match(m, m.source_user_id)
        if data: results["liked_you"].append(data)
        
    for m in your_likes_matches:
        data = serialize_match(m, m.target_user_id)
        if data: results["your_likes"].append(data)
            
    return jsonify(results), 200
