"""
Figures Routes.
Retrieve extracted figures from documents.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from db import crud
from api.middleware.auth import get_current_or_guest_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/figures", tags=["figures"])


@router.get("/{doc_id}")
def get_document_figures(
    doc_id: str,
    user=Depends(get_current_or_guest_user),
    db: Session = Depends(get_db),
):
    """Get all extracted figures from a document."""
    doc = crud.get_document(db, doc_id)
    if not doc or doc.user_id != user.id:
        raise HTTPException(status_code=404, detail="Document not found")

    figures = crud.get_document_figures(db, doc_id)

    return {
        "figures": [
            {
                "id": f.id,
                "page": f.page,
                "image_data": f.image_data,  # base64
                "width": f.width,
                "height": f.height,
                "caption": f.caption,
                "ai_description": f.ai_description,
            }
            for f in figures
        ],
        "total": len(figures),
    }


@router.post("/{figure_id}/explain")
def explain_figure(
    figure_id: str,
    user=Depends(get_current_or_guest_user),
    db: Session = Depends(get_db),
):
    """Get AI explanation for a specific figure."""
    from db.models import Figure
    figure = db.query(Figure).filter(Figure.id == figure_id).first()

    if not figure:
        raise HTTPException(status_code=404, detail="Figure not found")

    # Check document ownership
    doc = crud.get_document(db, figure.document_id)
    if not doc or doc.user_id != user.id:
        raise HTTPException(status_code=404, detail="Document not found")

    # If already explained, return cached
    if figure.ai_description:
        return {"description": figure.ai_description, "cached": True}

    # Generate explanation
    from core.llm_engine import get_llm_engine
    from core.vector_store import get_vector_store

    llm = get_llm_engine()
    vs = get_vector_store()

    # Get surrounding text for context
    query = f"figure image chart diagram on page {figure.page}"
    context_results = vs.search_by_doc(query, figure.document_id, top_k=3)
    context = "\n".join([r["text"] for r in context_results]) if context_results else ""

    prompt = f"""Based on the surrounding text context from the document, describe what the figure on page {figure.page} likely shows.

Context from the document:
{context}

Provide:
1. Description of what the figure likely shows
2. Key observations
3. Significance"""

    description = llm.generate(
        prompt=prompt,
        system_prompt="You are an expert at analyzing scientific figures. Provide detailed, accurate descriptions.",
    )

    # Cache the description
    figure.ai_description = description
    db.commit()

    return {"description": description, "cached": False}
