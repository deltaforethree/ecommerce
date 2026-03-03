from typing import Dict, Optional, List
from app.repositories.data_store import CARTS
import uuid


def get_cart(user_id: str) -> Dict:
    if user_id not in CARTS:
        CARTS[user_id] = {"id": str(uuid.uuid4()), "user_id": user_id, "items": []}
    return CARTS[user_id]


def add_to_cart(user_id: str, product_id: str, size: str, quantity: int, product_data: Dict) -> Dict:
    cart = get_cart(user_id)
    existing = next((i for i in cart["items"] if i["product_id"] == product_id and i["size"] == size), None)
    if existing:
        existing["quantity"] += quantity
        existing["total"] = existing["quantity"] * existing["price"]
    else:
        cart["items"].append({
            "id": str(uuid.uuid4()),
            "product_id": product_id,
            "product_name": product_data["name"],
            "product_image": product_data["images"][0]["url"] if product_data["images"] else "",
            "size": size,
            "quantity": quantity,
            "price": product_data["price"],
            "total": product_data["price"] * quantity,
        })
    return _compute_cart_totals(cart)


def update_cart_item(user_id: str, item_id: str, quantity: int) -> Optional[Dict]:
    cart = get_cart(user_id)
    item = next((i for i in cart["items"] if i["id"] == item_id), None)
    if not item:
        return None
    if quantity <= 0:
        cart["items"] = [i for i in cart["items"] if i["id"] != item_id]
    else:
        item["quantity"] = quantity
        item["total"] = item["price"] * quantity
    return _compute_cart_totals(cart)


def remove_from_cart(user_id: str, item_id: str) -> Dict:
    cart = get_cart(user_id)
    cart["items"] = [i for i in cart["items"] if i["id"] != item_id]
    return _compute_cart_totals(cart)


def clear_cart(user_id: str) -> Dict:
    cart = get_cart(user_id)
    cart["items"] = []
    return _compute_cart_totals(cart)


def _compute_cart_totals(cart: Dict) -> Dict:
    cart["subtotal"] = sum(i["total"] for i in cart["items"])
    cart["item_count"] = sum(i["quantity"] for i in cart["items"])
    return cart
