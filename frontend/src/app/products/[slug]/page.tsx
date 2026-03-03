"use client";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Check, Info, Truck, RefreshCw, Shield, Share2 } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import ProductCard from "@/features/products/components/ProductCard";
import toast from "react-hot-toast";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
    const { slug } = use(params);
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) notFound();

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [tab, setTab] = useState<"description" | "details" | "reviews">("description");
    const [pincode, setPincode] = useState("");
    const [pincodeMsg, setPincodeMsg] = useState("");

    const addItem = useCartStore((s) => s.addItem);
    const toggle = useWishlistStore((s) => s.toggle);
    const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

    const availableSizes = product.variants.filter((v) => v.stock > 0).map((v) => v.size);
    const selectedVariant = product.variants.find((v) => v.size === selectedSize);
    const discount = product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
        addItem(product, selectedSize, quantity);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
        addItem(product, selectedSize, quantity);
        window.location.href = "/cart";
    };

    const checkPincode = () => {
        if (pincode.length === 6) {
            setPincodeMsg("✓ Delivery available by 3-5 business days");
        } else {
            setPincodeMsg("Please enter a valid 6-digit pincode");
        }
    };

    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div>
            {/* Breadcrumb */}
            <div style={{ padding: "16px 5vw", borderBottom: "1px solid #e8ddd6", background: "#faf7f4" }}>
                <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}>
                    <Link href="/" style={{ textDecoration: "none", color: "#7a6e68" }}>Home</Link>
                    <span>/</span>
                    <Link href="/products" style={{ textDecoration: "none", color: "#7a6e68" }}>Products</Link>
                    <span>/</span>
                    <Link href={`/products?category=${product.category}`} style={{ textDecoration: "none", color: "#7a6e68", textTransform: "capitalize" }}>{product.category.replace("-", " ")}</Link>
                    <span>/</span>
                    <span style={{ color: "#1a1412" }}>{product.name}</span>
                </div>
            </div>

            {/* Main */}
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="product-detail-grid">
                {/* Gallery */}
                <div>
                    {/* Main Image */}
                    <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb", marginBottom: 12 }}>
                        <Image
                            src={product.images[activeImage]?.url}
                            alt={product.images[activeImage]?.alt || product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                        {/* Arrows */}
                        {product.images.length > 1 && (
                            <>
                                <button onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                                    style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,252,248,0.85)", border: "none", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#c8956c")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,252,248,0.85)")}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,252,248,0.85)", border: "none", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#c8956c")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,252,248,0.85)")}>
                                    <ChevronRight size={18} />
                                </button>
                            </>
                        )}
                    </div>
                    {/* Thumbnails */}
                    <div style={{ display: "flex", gap: 10 }}>
                        {product.images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImage(i)}
                                style={{ width: 72, height: 96, position: "relative", border: `2px solid ${activeImage === i ? "#c8956c" : "transparent"}`, cursor: "pointer", overflow: "hidden", background: "#f5f0eb", padding: 0, flexShrink: 0 }}>
                                <Image src={img.url} alt={img.alt} fill style={{ objectFit: "cover" }} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                        {product.isNew && <span style={{ background: "#1a1412", color: "#fff", padding: "4px 10px", fontSize: 10, fontFamily: "Jost, sans-serif", fontWeight: 600, letterSpacing: 1.5 }}>NEW</span>}
                        {product.isBestseller && <span style={{ background: "#c8956c", color: "#fff", padding: "4px 10px", fontSize: 10, fontFamily: "Jost, sans-serif", fontWeight: 600, letterSpacing: 1.5 }}>BESTSELLER</span>}
                    </div>

                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "#c8956c", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                        {product.category.replace("-", " ")}
                    </p>

                    <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#1a1412", marginBottom: 12, lineHeight: 1.2 }}>
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{ display: "flex", gap: 3 }}>
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={15} fill={s <= Math.round(product.rating) ? "#c8956c" : "none"} color="#c8956c" />)}
                        </div>
                        <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{product.rating} ({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
                        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 500, color: "#1a1412" }}>
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.comparePrice && (
                            <>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 18, color: "#b0a099", textDecoration: "line-through" }}>₹{product.comparePrice.toLocaleString("en-IN")}</span>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#4a8c6f", fontWeight: 600 }}>{discount}% OFF</span>
                            </>
                        )}
                    </div>

                    <div style={{ height: 1, background: "#e8ddd6", marginBottom: 24 }} />

                    {/* Size Selector */}
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                            <h3 style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#1a1412" }}>
                                Size {selectedSize && <span style={{ color: "#c8956c" }}>— {selectedSize}</span>}
                            </h3>
                            <Link href="/size-guide" style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#c8956c", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                                <Info size={12} /> Size Guide
                            </Link>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {product.variants.map((v) => (
                                <button
                                    key={v.size}
                                    onClick={() => v.stock > 0 && setSelectedSize(v.size)}
                                    disabled={v.stock === 0}
                                    style={{
                                        width: 52, height: 48,
                                        border: `1.5px solid ${selectedSize === v.size ? "#1a1412" : v.stock === 0 ? "#e8ddd6" : "#d4c9c0"}`,
                                        background: selectedSize === v.size ? "#1a1412" : v.stock === 0 ? "#f5f0eb" : "#fff",
                                        color: selectedSize === v.size ? "#fff" : v.stock === 0 ? "#c0b8b0" : "#1a1412",
                                        cursor: v.stock === 0 ? "not-allowed" : "pointer",
                                        fontFamily: "Jost, sans-serif",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        position: "relative",
                                        transition: "all 0.2s",
                                        textDecoration: v.stock === 0 ? "line-through" : "none",
                                    }}
                                >
                                    {v.size}
                                    {v.stock > 0 && v.stock <= 3 && (
                                        <span style={{ position: "absolute", top: -6, right: -6, background: "#c0392b", color: "#fff", width: 16, height: 16, borderRadius: "50%", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                                            {v.stock}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {selectedVariant && selectedVariant.stock <= 5 && (
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#c0392b", marginTop: 8 }}>
                                Only {selectedVariant.stock} left in stock!
                            </p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#1a1412", marginBottom: 12 }}>Quantity</h3>
                        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e8ddd6", width: "fit-content" }}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 18, color: "#1a1412", transition: "background 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f0eb")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                                −
                            </button>
                            <span style={{ width: 44, textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: 15, fontWeight: 500, color: "#1a1412" }}>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}
                                style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 18, color: "#1a1412", transition: "background 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f0eb")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                                +
                            </button>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                        <button onClick={handleAddToCart} className="btn-primary" style={{ flex: 1, minWidth: 180, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                            <ShoppingBag size={15} /> Add to Cart
                        </button>
                        <button onClick={() => toggle(product)}
                            style={{ width: 52, height: 52, border: `1.5px solid ${isWishlisted ? "#c8956c" : "#e8ddd6"}`, background: isWishlisted ? "#c8956c" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                            <Heart size={18} fill={isWishlisted ? "#fff" : "none"} color={isWishlisted ? "#fff" : "#1a1412"} />
                        </button>
                        <button onClick={() => { navigator.share?.({ title: product.name, url: window.location.href }) || navigator.clipboard?.writeText(window.location.href).then(() => toast.success("Link copied!")); }}
                            style={{ width: 52, height: 52, border: "1.5px solid #e8ddd6", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                            <Share2 size={18} color="#1a1412" />
                        </button>
                    </div>
                    <button onClick={handleBuyNow} className="btn-outline" style={{ width: "57%", padding: "14px" }}>
                        Buy Now
                    </button>

                    {/* Pincode Check */}
                    <div style={{ marginTop: 24, padding: "20px", background: "#faf7f4", border: "1px solid #e8ddd6" }}>
                        <h4 style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#1a1412", marginBottom: 12 }}>Check Delivery</h4>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input
                                type="text"
                                placeholder="Enter pincode"
                                value={pincode}
                                onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "").slice(0, 6)); setPincodeMsg(""); }}
                                style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e8ddd6", fontFamily: "Jost, sans-serif", fontSize: 14, outline: "none" }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                            />
                            <button onClick={checkPincode} style={{ padding: "10px 16px", background: "#1a1412", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1 }}>
                                Check
                            </button>
                        </div>
                        {pincodeMsg && <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: pincodeMsg.startsWith("✓") ? "#4a8c6f" : "#c0392b", marginTop: 8 }}>{pincodeMsg}</p>}
                    </div>

                    {/* Trust badges */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, marginTop: 20 }}>
                        {[
                            { icon: Truck, label: "Free Ship ₹999+" },
                            { icon: RefreshCw, label: "7-Day Returns" },
                            { icon: Shield, label: "Secure Payment" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                                <Icon size={16} color="#c8956c" />
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "#7a6e68", textAlign: "center", letterSpacing: 0.5 }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 5vw 60px" }}>
                <div style={{ borderBottom: "1px solid #e8ddd6", display: "flex", gap: 0 }}>
                    {(["description", "details", "reviews"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t)}
                            style={{
                                padding: "14px 28px",
                                background: "none",
                                border: "none",
                                borderBottom: tab === t ? "2px solid #1a1412" : "2px solid transparent",
                                cursor: "pointer",
                                fontFamily: "Jost, sans-serif",
                                fontSize: 12,
                                fontWeight: tab === t ? 600 : 400,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                color: tab === t ? "#1a1412" : "#7a6e68",
                                transition: "all 0.2s",
                            }}>
                            {t === "reviews" ? `Reviews (${product.reviewCount})` : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                <div style={{ padding: "32px 0" }}>
                    {tab === "description" && (
                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#4a3f3a", lineHeight: 2, maxWidth: 720 }}>
                            {product.description}
                        </p>
                    )}
                    {tab === "details" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, maxWidth: 480 }}>
                            {[
                                ["Fabric", product.fabric],
                                ["Category", product.category.replace("-", " ")],
                                ["Care Instructions", product.care],
                                ["Sizes Available", availableSizes.join(", ")],
                            ].map(([key, val]) => (
                                <div key={key} style={{ display: "contents" }}>
                                    <div style={{ padding: "14px 16px", background: "#faf7f4", borderBottom: "1px solid #e8ddd6", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#7a6e68" }}>{key}</div>
                                    <div style={{ padding: "14px 16px", background: "#fff", borderBottom: "1px solid #e8ddd6", fontFamily: "Jost, sans-serif", fontSize: 14, color: "#1a1412", textTransform: "capitalize" }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "reviews" && (
                        <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 72, fontWeight: 300, color: "#1a1412", lineHeight: 1 }}>{product.rating}</div>
                                <div style={{ display: "flex", gap: 4, justifyContent: "center", margin: "8px 0" }}>
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill={s <= Math.round(product.rating) ? "#c8956c" : "none"} color="#c8956c" />)}
                                </div>
                                <div style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68" }}>Based on {product.reviewCount} reviews</div>
                            </div>
                            <div>
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                                    return (
                                        <div key={star} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", width: 8 }}>{star}</span>
                                            <Star size={12} fill="#c8956c" color="#c8956c" />
                                            <div style={{ width: 200, height: 6, background: "#f0ebe6", borderRadius: 3 }}>
                                                <div style={{ width: `${pct}%`, height: "100%", background: "#c8956c", borderRadius: 3 }} />
                                            </div>
                                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#b0a099" }}>{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section style={{ background: "#faf7f4", padding: "64px 5vw" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 40 }}>
                            <p className="section-label">You May Also Like</p>
                            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 38, fontWeight: 400, color: "#1a1412" }}>Related Products</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="related-grid">
                            {related.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </section>
            )}

            <style>{`
        @media (max-width: 900px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
        </div>
    );
}
