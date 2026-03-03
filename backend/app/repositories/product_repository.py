from typing import List, Optional, Dict
from app.repositories.data_store import PRODUCTS


def get_all_products(
    category: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_new: Optional[bool] = None,
    is_bestseller: Optional[bool] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: str = "created_at",
    page: int = 1,
    limit: int = 12,
) -> Dict:
    products = PRODUCTS.copy()

    if category:
        products = [p for p in products if p["category"] == category]
    if is_featured is not None:
        products = [p for p in products if p["is_featured"] == is_featured]
    if is_new is not None:
        products = [p for p in products if p["is_new"] == is_new]
    if is_bestseller is not None:
        products = [p for p in products if p["is_bestseller"] == is_bestseller]
    if search:
        s = search.lower()
        products = [p for p in products if s in p["name"].lower() or s in p["description"].lower() or any(s in t for t in p["tags"])]
    if min_price is not None:
        products = [p for p in products if p["price"] >= min_price]
    if max_price is not None:
        products = [p for p in products if p["price"] <= max_price]

    if sort_by == "price_asc":
        products.sort(key=lambda x: x["price"])
    elif sort_by == "price_desc":
        products.sort(key=lambda x: x["price"], reverse=True)
    elif sort_by == "rating":
        products.sort(key=lambda x: x["rating"], reverse=True)

    total = len(products)
    start = (page - 1) * limit
    end = start + limit
    return {
        "products": products[start:end],
        "total": total,
        "page": page,
        "total_pages": (total + limit - 1) // limit,
    }


def get_product_by_slug(slug: str) -> Optional[Dict]:
    return next((p for p in PRODUCTS if p["slug"] == slug), None)


def get_product_by_id(product_id: str) -> Optional[Dict]:
    return next((p for p in PRODUCTS if p["id"] == product_id), None)


def get_categories() -> List[str]:
    return list(set(p["category"] for p in PRODUCTS))
