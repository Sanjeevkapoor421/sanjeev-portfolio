from pydantic import BaseModel
from typing import Optional

class ContactRequest(BaseModel):
    name:    str
    email:   str
    subject: Optional[str] = None
    message: str
