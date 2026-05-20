from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.config import SiteConfig

router = APIRouter()

@router.get("/config")
def get_config(db: Session = Depends(get_db)):
    rows = db.query(SiteConfig).all()
    return {row.key: row.value for row in rows}
