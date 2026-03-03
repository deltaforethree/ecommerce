from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProductImage(BaseModel):
    url: str
    alt: str


class ProductVariant(BaseModel):
    size: str
    stock: int


class ProductBase(BaseModel):
    name: str
    slug: str
    description: str
    price: float
    compare_price: Optional[float] = None
    category: str
    subcategory: Optional[str] = None
    fabric: Optional[str] = None
    care: Optional[str] = None
    tags: List[str] = []
    images: List[ProductImage] = []
    variants: List[ProductVariant] = []
    is_featured: bool = False
    is_new: bool = False
    is_bestseller: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    compare_price: Optional[float] = None
    category: Optional[str] = None
    is_featured: Optional[bool] = None
    is_new: Optional[bool] = None


class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    rating: float = 0.0
    review_count: int = 0
