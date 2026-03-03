"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Lock, CreditCard, Truck } from "lucide-react";
import { useCartStore, useAuthStore } from "@/lib/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = ["Cart", "Delivery", "Payment", "Confirm"];

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [form, setForm] = useState({
        fullName: "", email: "", phone: "",
        address: "", city: "", state: "Maharashtra", pincode: "",
    });

    const { items, getTotalPrice, clearCart } = useCartStore();
    const user = useAuthStore((s) => s.user);
    const router = useRouter();

    const subtotal = getTotalPrice();
    const shipping = subtotal >= 999 ? 0 : 99;
    const total = subtotal + shipping;

    const STATES = ["Maharashtra", "Delhi", "Tamil Nadu", "Karnataka", "Gujarat", "Rajasthan", "West Bengal", "Uttar Pradesh", "Telangana", "Kerala"];

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "13px 16px",
        border: "1.5px solid #e8ddd6",
        fontFamily: "Jost, sans-serif",
        fontSize: 14,
        color: "#1a1412",
        outline: "none",
        background: "#fff",
        transition: "border-color 0.2s",
    };

    const handlePlaceOrder = async () => {
        setStep(2);
        await new Promise((r) => setTimeout(r, 1200));
        const id = `AIR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setOrderId(id);
        clearCart();
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#4a8c6f", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, animation: "fadeIn 0.5s ease" }}>
                    <Check size={36} color="#fff" />
                </div>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "#1a1412", marginBottom: 12 }}>Order Placed!</h1>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 16, color: "#7a6e68", marginBottom: 8 }}>Your order <strong style={{ color: "#1a1412" }}>{orderId}</strong> has been confirmed.</p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#b0a099", marginBottom: 40, maxWidth: 440 }}>
                    We'll send you a confirmation email shortly. Your beautiful outfit is being prepared with love!
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                    <Link href="/orders" className="btn-primary">Track Your Order</Link>
                    <Link href="/products" className="btn-outline">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "#1a1412", marginBottom: 20 }}>Your cart is empty</h2>
                <Link href="/products" className="btn-primary">Shop Now</Link>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "32px 5vw" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Link href="/cart" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", marginBottom: 20 }}>
                        <ArrowLeft size={14} /> Back to Cart
                    </Link>
                    {/* Progress */}
                    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                        {STEPS.map((s, i) => (
                            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: i < step ? "#4a8c6f" : i === step ? "#1a1412" : "#e8ddd6",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, transition: "all 0.3s",
                                    }}>
                                        {i < step ? <Check size={12} color="#fff" /> : <span style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, color: i === step ? "#fff" : "#b0a099" }}>{i + 1}</span>}
                                    </div>
                                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: i <= step ? "#1a1412" : "#b0a099", whiteSpace: "nowrap" }} className="step-label">
                                        {s}
                                    </span>
                                </div>
                                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: i < step ? "#4a8c6f" : "#e8ddd6", margin: "0 12px", transition: "background 0.3s" }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 5vw", display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }} className="checkout-grid">
                {/* Form */}
                <div>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 400, color: "#1a1412", marginBottom: 28 }}>Delivery Information</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        {[
                            { label: "Full Name", key: "fullName", placeholder: "Priya Sharma", type: "text", required: true },
                            { label: "Mobile Number", key: "phone", placeholder: "+91 98765 43210", type: "tel", required: true },
                        ].map(({ label, key, placeholder, type, required }) => (
                            <div key={key}>
                                <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>{label} {required && "*"}</label>
                                <input type={type} required={required} placeholder={placeholder}
                                    value={form[key as keyof typeof form]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    style={inputStyle}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                                />
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>Email Address *</label>
                        <input type="email" required placeholder="priya@example.com"
                            value={form.email || user?.email || ""}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            style={inputStyle}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                        />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>Address *</label>
                        <textarea required placeholder="House No., Street, Area, Landmark..."
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            rows={3}
                            style={{ ...inputStyle, resize: "none" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
                        <div>
                            <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>City *</label>
                            <input type="text" required placeholder="Mumbai"
                                value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                            />
                        </div>
                        <div>
                            <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>State</label>
                            <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
                                style={{ ...inputStyle, cursor: "pointer" }}>
                                {STATES.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>Pincode *</label>
                            <input type="text" required placeholder="400001" maxLength={6}
                                value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                            />
                        </div>
                    </div>

                    {/* Payment */}
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 400, color: "#1a1412", marginBottom: 20 }}>Payment Method</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                        {[
                            { id: "cod", label: "Cash on Delivery", icon: Truck, desc: "Pay when you receive your order" },
                            { id: "upi", label: "UPI Payment", icon: CreditCard, desc: "GPay, PhonePe, Paytm, etc." },
                            { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
                        ].map(({ id, label, icon: Icon, desc }) => (
                            <label key={id} style={{ display: "flex", gap: 16, padding: "20px", border: `2px solid ${paymentMethod === id ? "#1a1412" : "#e8ddd6"}`, cursor: "pointer", transition: "border-color 0.2s", background: paymentMethod === id ? "#faf7f4" : "#fff" }}>
                                <input type="radio" name="payment" value={id} checked={paymentMethod === id} onChange={() => setPaymentMethod(id)} style={{ accentColor: "#c8956c", marginTop: 3 }} />
                                <Icon size={20} color={paymentMethod === id ? "#1a1412" : "#b0a099"} />
                                <div>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1412", marginBottom: 2 }}>{label}</p>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68" }}>{desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    <button onClick={handlePlaceOrder} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 40px" }}>
                        <Lock size={14} /> Place Order — ₹{total.toLocaleString("en-IN")}
                    </button>
                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#b0a099", marginTop: 12 }}>
                        🔒 Your payment information is encrypted and secure
                    </p>
                </div>

                {/* Order Summary */}
                <div style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "28px", height: "fit-content", position: "sticky", top: 100 }}>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 400, color: "#1a1412", marginBottom: 20 }}>Order Summary</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20, maxHeight: 300, overflowY: "auto" }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <div style={{ position: "relative", width: 60, flexShrink: 0, aspectRatio: "3/4", overflow: "hidden", background: "#f0ebe6" }}>
                                    <img src={item.product.images[0]?.url} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    <span style={{ position: "absolute", top: -6, right: -6, background: "#1a1412", color: "#fff", width: 18, height: 18, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                                        {item.quantity}
                                    </span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, color: "#1a1412", marginBottom: 2 }}>{item.product.name}</p>
                                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "#7a6e68" }}>Size: {item.size}</p>
                                </div>
                                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1412" }}>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: "1px solid #e8ddd6", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            ["Subtotal", `₹${subtotal.toLocaleString("en-IN")}`],
                            ["Shipping", shipping === 0 ? "FREE" : `₹${shipping}`],
                        ].map(([l, v]) => (
                            <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>{l}</span>
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: v === "FREE" ? "#4a8c6f" : "#1a1412" }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: "1px solid #e8ddd6", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20 }}>Total</span>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600 }}>₹{total.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .step-label { display: none !important; }
        }
      `}</style>
        </div>
    );
}
