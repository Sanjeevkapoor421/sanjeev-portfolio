from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    subject    = Column(String)
    message    = Column(String, nullable=False)
    read       = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
