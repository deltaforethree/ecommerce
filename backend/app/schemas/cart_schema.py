from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CartItemBase(BaseModel):
    product_id: str
    quantity: int
    size: str


class CartItemAdd(CartItemBase):
    pass


class CartItemResponse(CartItemBase):
    id: str
    product_name: str
    product_image: str
    price: float
    total: float


class CartResponse(BaseModel):
    id: str
    user_id: str
    items: List[CartItemResponse] = []
    subtotal: float
    item_count: int
