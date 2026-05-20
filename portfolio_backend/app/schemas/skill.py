from pydantic import BaseModel
from typing import Optional

class SkillResponse(BaseModel):
    id:         int
    name:       str
    category:   Optional[str] = None
    percentage: Optional[int] = None

    model_config = {"from_attributes": True}
