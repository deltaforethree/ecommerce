"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useWishlistStore, useCartStore } from "@/lib/store";
import toast from "react-hot-toast";
import { useState } from "react";

export default function WishlistPage() {
    const { items, toggle } = useWishlistStore();
    const addItem = useCartStore((s) => s.addItem);
    const [movingId, setMovingId] = useState<string | null>(null);

    const moveToCart = (product: typeof items[0]) => {
        if (product.variants.length === 1) {
            addItem(product, product.variants[0].size);
            toggle(product);
        } else {
            setMovingId(product.id);
        }
    };

    if (items.length === 0) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
                <Heart size={64} color="#e8ddd6" style={{ marginBottom: 24 }} />
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 400, color: "#1a1412", marginBottom: 12 }}>Your Wishlist is Empty</h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", marginBottom: 36, maxWidth: 400 }}>
                    Save your favourite pieces and come back to them anytime.
                </p>
                <Link href="/products" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Explore Products <ArrowRight size={15} />
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "48px 5vw 40px" }}>
                <p className="section-label">My Wishlist</p>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1a1412" }}>
                    Saved Pieces ♡
                </h1>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{items.length} {items.length === 1 ? "item" : "items"}</p>
            </div>

            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 5vw 80px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="wishlist-grid">
                    {items.map((product) => (
                        <div key={product.id} style={{ position: "relative", background: "#fff", boxShadow: "0 2px 12px rgba(26,20,18,0.05)" }}>
                            {/* Remove */}
                            <button onClick={() => toggle(product)}
                                style={{ position: "absolute", top: 10, right: 10, zIndex: 3, background: "rgba(255,252,248,0.9)", border: "none", cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                                <X size={14} color="#7a6e68" />
                            </button>

                            <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
                                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb" }}>
                                    <Image src={product.images[0]?.url} alt={product.name} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
                                </div>
                                <div style={{ padding: "16px 16px 8px" }}>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "#c8956c", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                                        {product.category.replace("-", " ")}
                                    </p>
                                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, color: "#1a1412", marginBottom: 8 }}>{product.name}</h3>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <span style={{ fontFamily: "Jost, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1412" }}>₹{product.price.toLocaleString("en-IN")}</span>
                                        {product.comparePrice && (
                                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#b0a099", textDecoration: "line-through" }}>₹{product.comparePrice.toLocaleString("en-IN")}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>

                            <div style={{ padding: "8px 16px 16px" }}>
                                {movingId === product.id ? (
                                    <div style={{ animation: "fadeIn 0.2s ease" }}>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "#7a6e68", marginBottom: 6, letterSpacing: 1 }}>SELECT SIZE</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {product.variants.filter((v) => v.stock > 0).map((v) => (
                                                <button key={v.size} onClick={() => { addItem(product, v.size); toggle(product); setMovingId(null); }}
                                                    style={{ width: 40, height: 34, border: "1.5px solid #1a1412", background: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, transition: "all 0.2s" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1412"; e.currentTarget.style.color = "#fff"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a1412"; }}>
                                                    {v.size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => moveToCart(product)}
                                        style={{ width: "100%", padding: "11px", background: "transparent", color: "#1a1412", border: "1.5px solid #1a1412", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1412"; e.currentTarget.style.color = "#fff"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1412"; }}>
                                        <ShoppingBag size={13} /> Move to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .wishlist-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
        </div>
    );
}
