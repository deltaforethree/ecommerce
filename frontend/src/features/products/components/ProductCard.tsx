"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";

interface ProductCardProps {
    product: Product;
    style?: React.CSSProperties;
}

export default function ProductCard({ product, style }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [sizePickerOpen, setSizePickerOpen] = useState(false);

    const toggle = useWishlistStore((s) => s.toggle);
    const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
    const addItem = useCartStore((s) => s.addItem);

    const discount = product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;

    const availableSizes = product.variants.filter((v) => v.stock > 0).map((v) => v.size);

    // The image to show: switch on hover if second image available
    const imgSrc = !imgError
        ? (hovered && product.images[1] ? product.images[1].url : product.images[0].url)
        : `https://picsum.photos/seed/${product.id}/600/800`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (availableSizes.length === 1) {
            addItem(product, availableSizes[0]);
        } else {
            setSizePickerOpen((o) => !o);
        }
    };

    const handleSizeSelect = (e: React.MouseEvent, size: string) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, size);
        setSizePickerOpen(false);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
    };

    return (
        <div
            style={{
                position: "relative",
                background: "#fff",
                border: "1px solid #f0ebe6",
                transition: "box-shadow 0.25s ease",
                boxShadow: hovered ? "0 8px 32px rgba(26,20,18,0.10)" : "none",
                borderRadius: 2,
                ...style,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setSizePickerOpen(false); }}
        >
            {/* ── Badges ── */}
            <div style={{ position: "absolute", top: 10, left: 10, zIndex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
                {product.isNew && (
                    <span style={{ background: "#1a1412", color: "#fff", padding: "3px 8px", fontSize: 9, fontFamily: "Jost, sans-serif", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>NEW</span>
                )}
                {product.isBestseller && (
                    <span style={{ background: "#c8956c", color: "#fff", padding: "3px 8px", fontSize: 9, fontFamily: "Jost, sans-serif", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>BESTSELLER</span>
                )}
                {discount > 0 && (
                    <span style={{ background: "#2d6a4f", color: "#fff", padding: "3px 8px", fontSize: 9, fontFamily: "Jost, sans-serif", fontWeight: 700, letterSpacing: 1 }}>{discount}% OFF</span>
                )}
            </div>

            {/* ── Wishlist ── */}
            <button
                onClick={handleWishlist}
                style={{
                    position: "absolute", top: 10, right: 10, zIndex: 3,
                    background: isWishlisted ? "#c8956c" : "rgba(255,252,248,0.95)",
                    border: "none", cursor: "pointer",
                    width: 34, height: 34, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart size={15} fill={isWishlisted ? "#fff" : "none"} color={isWishlisted ? "#fff" : "#1a1412"} />
            </button>

            {/* ── Image ── */}
            <Link href={`/products/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imgSrc}
                        alt={product.name}
                        onError={() => setImgError(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                            transform: hovered ? "scale(1.05)" : "scale(1)",
                            display: "block",
                        }}
                    />
                    {/* Hover overlay — desktop only */}
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        background: "linear-gradient(to top, rgba(26,20,18,0.55), transparent)",
                        height: hovered ? "50%" : "30%",
                        transition: "height 0.3s ease",
                        pointerEvents: "none",
                    }} />
                </div>

                {/* ── Product Info ── */}
                <div style={{ padding: "14px 14px 8px" }}>
                    <p style={{
                        fontFamily: "Jost, sans-serif",
                        fontSize: 10,
                        color: "#c8956c",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 4,
                        fontWeight: 600,
                    }}>
                        {product.category.replace(/-/g, " ")}
                    </p>
                    <h3 style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(15px, 2vw, 18px)",
                        fontWeight: 500,
                        color: "#1a1412",
                        marginBottom: 8,
                        lineHeight: 1.25,
                    }}>
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                        <div style={{ display: "flex", gap: 2 }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={10} fill={s <= Math.round(product.rating) ? "#c8956c" : "none"} color="#c8956c" />
                            ))}
                        </div>
                        <span style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "#b0a099" }}>
                            {product.rating} ({product.reviewCount})
                        </span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "Jost, sans-serif", fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 700, color: "#1a1412" }}>
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.comparePrice && (
                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#b0a099", textDecoration: "line-through" }}>
                                ₹{product.comparePrice.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* ── Add to Cart / Size picker ── */}
            <div style={{ padding: "6px 14px 14px" }}>
                {sizePickerOpen ? (
                    <div>
                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "#7a6e68", letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Select Size</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={(e) => handleSizeSelect(e, size)}
                                    style={{
                                        minWidth: 38, height: 34,
                                        padding: "0 8px",
                                        border: "1.5px solid #1a1412",
                                        background: "none",
                                        cursor: "pointer",
                                        fontFamily: "Jost, sans-serif",
                                        fontSize: 11, fontWeight: 600,
                                        color: "#1a1412",
                                        transition: "all 0.15s",
                                        borderRadius: 1,
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1412"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a1412"; }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        style={{
                            width: "100%",
                            padding: "11px",
                            background: "#1a1412",
                            color: "#fff",
                            border: "1.5px solid #1a1412",
                            cursor: "pointer",
                            fontFamily: "Jost, sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 7,
                            transition: "background 0.2s, color 0.2s",
                            borderRadius: 1,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#c8956c"; e.currentTarget.style.borderColor = "#c8956c"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1412"; e.currentTarget.style.borderColor = "#1a1412"; }}
                    >
                        <ShoppingBag size={12} /> Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
