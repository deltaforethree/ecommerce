from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class OrderAddress(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: str


class OrderItemResponse(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    size: str
    quantity: int
    price: float
    total: float


class OrderCreate(BaseModel):
    address: OrderAddress
    payment_method: str = "cod"


class OrderResponse(BaseModel):
    id: str
    user_id: str
    items: List[OrderItemResponse]
    address: OrderAddress
    subtotal: float
    shipping: float
    total: float
    status: str
    payment_method: str
    payment_status: str
    created_at: datetime
