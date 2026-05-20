from pydantic import BaseModel
from typing import List, Optional

class ExperienceResponse(BaseModel):
    id:          int
    type:        str
    role:        str
    company:     Optional[str] = None
    start_date:  Optional[str] = None
    end_date:    Optional[str] = None
    description: Optional[str] = None
    tags:        Optional[List[str]] = []

    model_config = {"from_attributes": True}
