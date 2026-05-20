from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects.postgresql import ARRAY
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, nullable=False)
    description = Column(String)
    tags        = Column(ARRAY(String), default=[])
    icon        = Column(String)
    github_url  = Column(String)
    demo_url    = Column(String)
    stars       = Column(Integer, default=0)
    forks       = Column(Integer, default=0)
    language    = Column(String)
    featured    = Column(Boolean, default=False)
    sort_order  = Column(Integer, default=0)
