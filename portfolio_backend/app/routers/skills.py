from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillResponse

router = APIRouter()

@router.get("/skills")
def get_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).order_by(Skill.sort_order).all()
    grouped: dict = {}
    for skill in skills:
        cat = skill.category or "Other"
        if cat not in grouped:
            grouped[cat] = []
        grouped[cat].append(SkillResponse.model_validate(skill))
    return grouped
