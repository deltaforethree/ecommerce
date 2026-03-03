"use client";
import Link from "next/link";
import { Package, ArrowRight, ChevronRight } from "lucide-react";

// Mock order data for demo
const MOCK_ORDERS = [
    {
        id: "AIR-A3K9Z2",
        date: "28 Feb 2024",
        items: [
            { name: "Crimson Anarkali Suit", size: "M", qty: 1, price: 4999, image: "https://images.unsplash.com/photo-1614886137799-8f3dc0a498bd?w=200&q=80" },
        ],
        status: "Delivered",
        statusColor: "#4a8c6f",
        total: 4999,
        tracking: "DTDC123456789IN",
    },
    {
        id: "AIR-B7Q1R8",
        date: "15 Feb 2024",
        items: [
            { name: "Terracotta Bandhani Kurti", size: "S", qty: 2, price: 1899, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80" },
        ],
        status: "Shipped",
        statusColor: "#c8956c",
        total: 12797,
        tracking: "DTDC987654321IN",
    },
    {
        id: "AIR-C2M5P6",
        date: "3 Feb 2024",
        items: [
            { name: "Ivory Silk Kurti Set", size: "M", qty: 1, price: 3499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80" },
        ],
        status: "Processing",
        statusColor: "#7a6e68",
        total: 3499,
        tracking: null,
    },
];

const STATUS_STEPS: Record<string, number> = {
    Processing: 1,
    Confirmed: 2,
    Shipped: 3,
    "Out for Delivery": 4,
    Delivered: 5,
};

export default function OrdersPage() {
    if (MOCK_ORDERS.length === 0) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
                <Package size={64} color="#e8ddd6" style={{ marginBottom: 24 }} />
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 400, color: "#1a1412", marginBottom: 12 }}>No Orders Yet</h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", marginBottom: 36 }}>Start shopping to see your orders here!</p>
                <Link href="/products" className="btn-primary">Shop Now</Link>
            </div>
        );
    }

    return (
        <div>
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "48px 5vw 40px" }}>
                <p className="section-label">Account</p>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1a1412" }}>My Orders</h1>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{MOCK_ORDERS.length} orders placed</p>
            </div>

            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 5vw 80px" }}>
                {MOCK_ORDERS.map((order) => {
                    const stepIdx = STATUS_STEPS[order.status] || 1;
                    const allSteps = ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];
                    return (
                        <div key={order.id} style={{ border: "1px solid #e8ddd6", marginBottom: 24, overflow: "hidden" }}>
                            {/* Order Header */}
                            <div style={{ background: "#faf7f4", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderBottom: "1px solid #e8ddd6" }}>
                                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                    <div>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", marginBottom: 4 }}>Order ID</p>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1412" }}>#{order.id}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", marginBottom: 4 }}>Placed On</p>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#1a1412" }}>{order.date}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", marginBottom: 4 }}>Total</p>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1412" }}>₹{order.total.toLocaleString("en-IN")}</p>
                                    </div>
                                </div>
                                <span style={{ padding: "6px 14px", background: order.statusColor + "1a", border: `1px solid ${order.statusColor}40`, color: order.statusColor, fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8ddd6", overflowX: "auto" }}>
                                <div style={{ display: "flex", alignItems: "center", minWidth: 500 }}>
                                    {allSteps.map((s, i) => (
                                        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < allSteps.length - 1 ? 1 : "none" }}>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                                                <div style={{
                                                    width: 24, height: 24, borderRadius: "50%",
                                                    background: i < stepIdx ? "#4a8c6f" : i === stepIdx - 1 ? order.statusColor : "#e8ddd6",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    flexShrink: 0,
                                                }}>
                                                    {i < stepIdx && <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>✓</span>}
                                                </div>
                                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: i < stepIdx ? "#4a8c6f" : i === stepIdx - 1 ? order.statusColor : "#b0a099", whiteSpace: "nowrap", textAlign: "center", maxWidth: 70, lineHeight: 1.2 }}>
                                                    {s}
                                                </span>
                                            </div>
                                            {i < allSteps.length - 1 && (
                                                <div style={{ flex: 1, height: 2, background: i < stepIdx - 1 ? "#4a8c6f" : "#e8ddd6", margin: "0 4px", marginBottom: 24, transition: "background 0.3s" }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Items */}
                            {order.items.map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 16, padding: "20px 24px", borderBottom: i < order.items.length - 1 ? "1px solid #f0ebe6" : "none", alignItems: "center" }}>
                                    <div style={{ width: 64, aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb", flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 500, color: "#1a1412", marginBottom: 4 }}>{item.name}</h3>
                                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}>Size: {item.size} · Qty: {item.qty}</p>
                                    </div>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, fontWeight: 600, color: "#1a1412" }}>₹{item.price.toLocaleString("en-IN")}</p>
                                </div>
                            ))}

                            {/* Actions */}
                            <div style={{ padding: "16px 24px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", background: "#faf7f4" }}>
                                {order.tracking && (
                                    <button style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#c8956c", background: "none", border: "none", cursor: "pointer", fontWeight: 500, letterSpacing: 1 }}
                                        onClick={() => alert(`Tracking: ${order.tracking}`)}>
                                        Track Package →
                                    </button>
                                )}
                                {order.status === "Delivered" && (
                                    <button style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68", background: "none", border: "1px solid #e8ddd6", cursor: "pointer", padding: "8px 16px", letterSpacing: 1 }}>
                                        Return / Exchange
                                    </button>
                                )}
                                <Link href="/products" style={{ textDecoration: "none", fontFamily: "Jost, sans-serif", fontSize: 12, color: "#1a1412", display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                                    Buy Again <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
