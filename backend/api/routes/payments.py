from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

try:
    client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
except Exception as e:
    client = None
    print("Warning: Razorpay client could not be initialized. Invalid keys.")

class OrderRequest(BaseModel):
    amount: int # in INR, will be multiplied by 100 for paise
    plan_name: str

@router.post("/create-order")
async def create_order(order_req: OrderRequest):
    if not client:
        # Fallback for dummy mode when no real keys are provided
        return {
            "id": "order_dummy_12345",
            "amount": order_req.amount * 100,
            "currency": "INR",
            "notes": {"plan": order_req.plan_name}
        }
        
    try:
        data = {
            "amount": order_req.amount * 100, # Razorpay expects amount in subunits (paise)
            "currency": "INR",
            "receipt": f"receipt_{order_req.plan_name.replace(' ', '_').lower()}",
            "notes": {
                "plan": order_req.plan_name
            }
        }
        order = client.order.create(data=data)
        return order
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify")
async def verify_payment(request: Request):
    """
    Webhook or direct verification endpoint.
    In a real app, you would verify the signature using razorpay.utility.verify_payment_signature()
    and then update the user's tier in the database to 'PRO'.
    """
    data = await request.json()
    return {"status": "success", "message": "Payment verified locally (mock)"}
