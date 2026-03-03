"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);

    const subtotal = getTotalPrice();
    const shipping = subtotal >= 999 ? 0 : 99;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount + shipping;

    const applyCoupon = () => {
        if (couponApplied) { toast.error("Coupon already applied"); return; }
        if (coupon.toUpperCase() === "AURA10") {
            setDiscount(10);
            setCouponApplied(true);
            toast.success("Coupon AURA10 applied — 10% off!");
        } else if (coupon.toUpperCase() === "AURA20") {
            setDiscount(20);
            setCouponApplied(true);
            toast.success("Coupon AURA20 applied — 20% off!");
        } else {
            toast.error("Invalid coupon code");
        }
    };

    if (items.length === 0) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
                <ShoppingBag size={64} color="#e8ddd6" style={{ marginBottom: 24 }} />
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 400, color: "#1a1412", marginBottom: 12 }}>Your Cart is Empty</h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", marginBottom: 36, maxWidth: 400 }}>
                    Looks like you haven't added any items yet. Discover our beautiful collection!
                </p>
                <Link href="/products" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Start Shopping <ArrowRight size={15} />
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "48px 5vw 40px" }}>
                <p className="section-label">Checkout</p>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1a1412" }}>Shopping Cart</h1>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{items.length} {items.length === 1 ? "item" : "items"}</p>
            </div>

            <div style={{ maxWidth: 1300, margin: "0 auto", padding: "48px 5vw", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }} className="cart-grid">
                {/* Items */}
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #e8ddd6" }}>
                        <span style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68" }}>
                            {items.length} Items
                        </span>
                        <button onClick={() => { clearCart(); toast.success("Cart cleared"); }}
                            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, color: "#c0392b", letterSpacing: 1 }}>
                            Clear All
                        </button>
                    </div>

                    {items.map((item) => (
                        <div key={item.id} style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 20, padding: "24px 0", borderBottom: "1px solid #e8ddd6" }}>
                            {/* Image */}
                            <Link href={`/products/${item.product.slug}`}>
                                <div style={{ position: "relative", width: 96, aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb" }}>
                                    <Image src={item.product.images[0]?.url} alt={item.product.name} fill style={{ objectFit: "cover" }} />
                                </div>
                            </Link>

                            {/* Info */}
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "#c8956c", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                                        {item.product.category.replace("-", " ")}
                                    </p>
                                    <Link href={`/products/${item.product.slug}`} style={{ textDecoration: "none" }}>
                                        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 500, color: "#1a1412", marginBottom: 6 }}>{item.product.name}</h3>
                                    </Link>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}>Size: <strong>{item.size}</strong></p>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
                                    {/* Quantity */}
                                    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e8ddd6" }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 16 }}>−</button>
                                        <span style={{ width: 36, textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 500 }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 16 }}>+</button>
                                    </div>

                                    <div style={{ textAlign: "right" }}>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 17, fontWeight: 600, color: "#1a1412" }}>
                                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#b0a099" }}>₹{item.product.price.toLocaleString("en-IN")} each</p>
                                    </div>

                                    <button onClick={() => removeItem(item.id)}
                                        style={{ background: "none", border: "none", cursor: "pointer", color: "#b0a099", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#c0392b")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "#b0a099")}
                                        aria-label="Remove">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "32px", position: "sticky", top: 100 }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 400, color: "#1a1412", marginBottom: 24 }}>Order Summary</h2>

                    {/* Coupon */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", marginBottom: 8, display: "block" }}>
                            <Tag size={12} style={{ display: "inline", marginRight: 6 }} />Coupon Code
                        </label>
                        <div style={{ display: "flex", gap: 0 }}>
                            <input
                                type="text"
                                placeholder="AURA10"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                disabled={couponApplied}
                                style={{ flex: 1, padding: "11px 14px", border: "1.5px solid #e8ddd6", borderRight: "none", fontFamily: "Jost, sans-serif", fontSize: 14, outline: "none", background: couponApplied ? "#f0ebe6" : "#fff", color: "#1a1412" }}
                            />
                            <button onClick={applyCoupon} disabled={couponApplied}
                                style={{ padding: "11px 16px", background: couponApplied ? "#4a8c6f" : "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1, transition: "background 0.2s" }}>
                                {couponApplied ? "✓" : "Apply"}
                            </button>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                        {[
                            ["Subtotal", `₹${subtotal.toLocaleString("en-IN")}`],
                            ...(discount > 0 ? [[`Discount (${discount}%)`, `−₹${Math.round(discountAmount).toLocaleString("en-IN")}`]] : []),
                            ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`],
                        ].map(([label, value]) => (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{label}</span>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: value === "FREE" || value?.startsWith("−") ? "#4a8c6f" : "#1a1412", fontWeight: value?.startsWith("−") ? 600 : 400 }}>{value}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: "1px solid #e8ddd6", paddingTop: 16, marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: "#1a1412" }}>Total</span>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 600, color: "#1a1412" }}>₹{Math.round(total).toLocaleString("en-IN")}</span>
                    </div>

                    <Link href="/checkout" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", marginBottom: 12 }}>
                        Proceed to Checkout <ArrowRight size={15} />
                    </Link>
                    <Link href="/products" style={{ textDecoration: "none", fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px" }}>
                        ← Continue Shopping
                    </Link>

                    {shipping > 0 && (
                        <div style={{ marginTop: 16, padding: "12px", background: "#fff", border: "1px solid #e8ddd6", display: "flex", gap: 8, alignItems: "center" }}>
                            <Truck size={14} color="#c8956c" />
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68" }}>
                                Add <strong style={{ color: "#1a1412" }}>₹{(999 - subtotal).toLocaleString()}</strong> more for free shipping!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
