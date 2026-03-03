from typing import Dict, List, Optional
from app.repositories.data_store import ORDERS, CARTS
from app.repositories import cart_repository
import uuid
from datetime import datetime


def create_order(user_id: str, address: Dict, payment_method: str) -> Optional[Dict]:
    cart = cart_repository.get_cart(user_id)
    if not cart["items"]:
        return None

    subtotal = cart["subtotal"]
    shipping = 0 if subtotal >= 999 else 99
    total = subtotal + shipping

    order = {
        "id": f"ORD-{str(uuid.uuid4())[:8].upper()}",
        "user_id": user_id,
        "items": cart["items"].copy(),
        "address": address,
        "subtotal": subtotal,
        "shipping": shipping,
        "total": total,
        "status": "confirmed",
        "payment_method": payment_method,
        "payment_status": "pending" if payment_method == "cod" else "paid",
        "created_at": datetime.now().isoformat(),
    }
    ORDERS[order["id"]] = order
    cart_repository.clear_cart(user_id)
    return order


def get_user_orders(user_id: str) -> List[Dict]:
    return [o for o in ORDERS.values() if o["user_id"] == user_id]


def get_order(order_id: str) -> Optional[Dict]:
    return ORDERS.get(order_id)


def get_all_orders() -> List[Dict]:
    return list(ORDERS.values())
