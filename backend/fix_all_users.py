from app.db.session import SessionLocal
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail
from app.models.billing import Subscription
import datetime

def main():
    db = SessionLocal()
    users = db.query(User).all()
    
    for user in users:
        print(f"Processing user: {user.full_name}")
        
        # Profile
        if not user.profile:
            user.profile = UserProfile(user_id=user.id, gender='male', dob=datetime.date(1995, 5, 20), religion='Hindu', caste='Mudhaliyar')
            db.add(user.profile)
            
        # Details
        if not user.details:
            user.details = UserDetail(user_id=user.id, height='5''8\"', weight='70 kg', education='B.Tech', occupation='Software Engineer', annual_income='10 - 20 LPA')
            db.add(user.details)
            
        # Family
        if not user.family:
            user.family = FamilyDetail(user_id=user.id, father_name='Ramesh', mother_name='Sujatha', family_type='Nuclear', siblings='1 Brother')
            db.add(user.family)
            
        # Location
        if not user.location:
            user.location = LocationDetail(user_id=user.id, country='India', state='Tamil Nadu', city='Chennai')
            db.add(user.location)
            
    db.commit()
    print('All users backfilled successfully.')

if __name__ == '__main__':
    main()
