from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import projects, skills, experience, contact, config

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router, prefix="/api")
app.include_router(skills.router, prefix="/api")
app.include_router(experience.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(config.router, prefix="/api")
