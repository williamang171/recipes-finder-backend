from email.policy import default
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="")
    email = Column(String, unique=True, index=True)
    email_normalized = Column(String, unique=True, index=True, default="")
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    recipes = relationship("Recipe", back_populates="user")
