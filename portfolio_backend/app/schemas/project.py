from pydantic import BaseModel
from typing import List, Optional

class ProjectResponse(BaseModel):
    id:          int
    title:       str
    description: Optional[str] = None
    tags:        Optional[List[str]] = []
    icon:        Optional[str] = None
    github_url:  Optional[str] = None
    demo_url:    Optional[str] = None
    stars:       int = 0
    forks:       int = 0
    language:    Optional[str] = None
    featured:    bool = False

    model_config = {"from_attributes": True}
