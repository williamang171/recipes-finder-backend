from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.recipe import Recipe
from app.schemas.recipe import RecipeCreate


def wake_up(db: Session):
    return db.query(Recipe).filter_by(user_id=1).limit(1)


def get_recipes(db: Session, user_id: int):
    return db.query(Recipe).filter_by(user_id=user_id).all()


def create_recipe(db: Session, obj_in: RecipeCreate, user_id: int):
    db_item = Recipe(**obj_in.dict(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def remove_recipe(db: Session, id: int, user_id: int):
    obj = db.query(Recipe).get(id)
    if obj == None or obj.user_id != user_id:
        raise HTTPException(
            status_code=404, detail=f"recipe with id {id} not found")
    db.delete(obj)
    db.commit()
    return obj
