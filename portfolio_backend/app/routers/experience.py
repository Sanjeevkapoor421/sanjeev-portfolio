from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.experience import Experience
from app.schemas.experience import ExperienceResponse

router = APIRouter()

@router.get("/experience", response_model=List[ExperienceResponse])
def get_experience(db: Session = Depends(get_db)):
    return db.query(Experience).order_by(Experience.sort_order).all()
