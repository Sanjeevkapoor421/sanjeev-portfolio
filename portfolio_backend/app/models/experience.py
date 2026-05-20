from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from app.database import Base

class Experience(Base):
    __tablename__ = "experience"

    id          = Column(Integer, primary_key=True, index=True)
    type        = Column(String, nullable=False)  # 'work' | 'education'
    role        = Column(String, nullable=False)
    company     = Column(String)
    start_date  = Column(String)
    end_date    = Column(String, nullable=True)   # null = present
    description = Column(String)
    tags        = Column(ARRAY(String), default=[])
    sort_order  = Column(Integer, default=0)
