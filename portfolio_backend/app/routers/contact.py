import os
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactRequest

router = APIRouter()

@router.post("/contact", status_code=201)
def submit_contact(payload: ContactRequest, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(msg)
    db.commit()

    api_key = os.getenv("RESEND_API_KEY")
    if api_key:
        try:
            import resend
            resend.api_key = api_key
            resend.Emails.send({
                "from": "portfolio@yourdomain.com",
                "to": os.getenv("CONTACT_EMAIL", "sanjeevkapoor421@gmail.com"),
                "subject": f"Portfolio contact: {payload.subject or 'No subject'}",
                "html": (
                    f"<p><strong>From:</strong> {payload.name} ({payload.email})</p>"
                    f"<p>{payload.message}</p>"
                ),
            })
        except Exception:
            pass  # email failure never fails the request

    return {"status": "received"}
