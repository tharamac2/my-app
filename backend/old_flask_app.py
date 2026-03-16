import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret')
    
    # Construct DB URI: fallback to sqlite if mysql is not available for testing
    db_uri = os.getenv('DATABASE_URI', 'sqlite:///matrimony.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize Extensions
    db.init_app(app)
    JWTManager(app)

    # Register Blueprints
    from routes.auth import auth_bp
    from routes.profile import profile_bp
    from routes.discovery import discovery_bp
    from routes.matches import matches_bp
    from routes.chat import chat_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(profile_bp, url_prefix='/api/profile')
    app.register_blueprint(discovery_bp, url_prefix='/api/discovery')
    app.register_blueprint(matches_bp, url_prefix='/api/matches')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')

    with app.app_context():
        db.create_all()

    @app.route('/', methods=['GET'])
    def index():
        return {"status": "ok", "message": "Matrimony API is running!"}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
