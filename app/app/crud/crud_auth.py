from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.models.auth import User
from app.schemas.auth import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# def get_user_by_email(db: Session, email: str):
    # return db.query(User).filter(User.email == email).first()


def get_user_by_email_normalized(db: Session, email: str):
    email_to_use = email.upper()
    return db.query(User).filter(User.email_normalized == email_to_use).first()


def create_user(db: Session, user: UserCreate):
    # fake_hashed_password = user.password + "notreallyhashed"
    hashed_password = get_password_hash(user.password)
    email_normalized = user.email.upper()

    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        email_normalized=email_normalized
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
