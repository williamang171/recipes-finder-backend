from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    url = Column(String(256), index=True, nullable=True)
    image_url = Column(String(256), nullable=True)
    mealdb_id = Column(String(256), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="recipes")
