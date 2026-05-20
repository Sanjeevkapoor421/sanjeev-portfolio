from sqlalchemy import Column, Integer, String
from app.database import Base

class SiteConfig(Base):
    __tablename__ = "site_config"

    id    = Column(Integer, primary_key=True, index=True)
    key   = Column(String, unique=True, nullable=False)
    value = Column(String)
