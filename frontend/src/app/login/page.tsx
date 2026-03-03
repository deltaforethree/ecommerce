"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((s) => s.login);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        login(form.name || form.email.split("@")[0], form.email);
        setLoading(false);
        router.push("/");
    };

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        border: "1.5px solid #e8ddd6",
        fontFamily: "Jost, sans-serif",
        fontSize: 14,
        color: "#1a1412",
        background: "#fff",
        outline: "none",
        transition: "border-color 0.2s",
    } as const;

    return (
        <div style={{ minHeight: "80vh", display: "flex" }}>
            {/* Left Panel */}
            <div style={{ flex: 1, background: "#1a1412", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", position: "relative", overflow: "hidden" }} className="auth-left">
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, #c8956c22 0%, transparent 60%), radial-gradient(circle at 80% 20%, #c8956c11 0%, transparent 50%)" }} />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 600, color: "#fffcf8", letterSpacing: 4, marginBottom: 4 }}>AURA</div>
                    <div style={{ fontFamily: "Jost, sans-serif", fontSize: 10, letterSpacing: 8, color: "#c8956c", fontWeight: 500, textTransform: "uppercase", marginBottom: 40 }}>INDIA</div>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#fffcf8", lineHeight: 1.3, maxWidth: 340, marginBottom: 20 }}>
                        Where Tradition Meets Elegance
                    </h2>
                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#b0a099", lineHeight: 1.8, maxWidth: 300 }}>
                        Join thousands of Indian women who celebrate their heritage through premium fashion.
                    </p>
                    <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
                        {["✦ Exclusive member discounts", "✦ Early access to new collections", "✦ Wishlist & order tracking", "✦ Personalised style recommendations"].map((b) => (
                            <p key={b} style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#c8956c", letterSpacing: 0.5 }}>{b}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 40px", background: "#fffcf8" }} className="auth-right">
                <div style={{ width: "100%", maxWidth: 420 }}>
                    {/* Tabs */}
                    <div style={{ display: "flex", borderBottom: "1px solid #e8ddd6", marginBottom: 36 }}>
                        {(["login", "register"] as const).map((t) => (
                            <button key={t} onClick={() => setTab(t)}
                                style={{
                                    flex: 1, padding: "14px", background: "none", border: "none",
                                    borderBottom: tab === t ? "2px solid #1a1412" : "2px solid transparent",
                                    cursor: "pointer",
                                    fontFamily: "Jost, sans-serif",
                                    fontSize: 12, fontWeight: tab === t ? 600 : 400,
                                    letterSpacing: 2, textTransform: "uppercase",
                                    color: tab === t ? "#1a1412" : "#7a6e68",
                                    transition: "all 0.2s",
                                }}>
                                {t === "login" ? "Sign In" : "Create Account"}
                            </button>
                        ))}
                    </div>

                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 400, color: "#1a1412", marginBottom: 28 }}>
                        {tab === "login" ? "Welcome Back" : "Join Aura India"}
                    </h2>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {tab === "register" && (
                            <div>
                                <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>Full Name *</label>
                                <input type="text" required placeholder="Priya Sharma" value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={inputStyle}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                                />
                            </div>
                        )}

                        <div>
                            <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 8 }}>Email Address *</label>
                            <input type="email" required placeholder="priya@example.com" value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                            />
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68" }}>Password *</label>
                                {tab === "login" && <Link href="#" style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#c8956c", textDecoration: "none" }}>Forgot Password?</Link>}
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder={tab === "register" ? "Min. 8 characters" : "••••••••"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    style={{ ...inputStyle, paddingRight: 48 }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#7a6e68" }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {tab === "register" && (
                            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" required style={{ marginTop: 2, accentColor: "#c8956c" }} />
                                <span style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", lineHeight: 1.5 }}>
                                    I agree to the <Link href="/terms" style={{ color: "#c8956c", textDecoration: "none" }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: "#c8956c", textDecoration: "none" }}>Privacy Policy</Link>
                                </span>
                            </label>
                        )}

                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                            {loading ? "Please wait..." : tab === "login" ? "Sign In" : "Create Account"}
                            {!loading && <ArrowRight size={15} />}
                        </button>

                        <div style={{ position: "relative", textAlign: "center", margin: "8px 0" }}>
                            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#e8ddd6" }} />
                            <span style={{ position: "relative", background: "#fffcf8", padding: "0 16px", fontFamily: "Jost, sans-serif", fontSize: 12, color: "#b0a099", letterSpacing: 1 }}>OR</span>
                        </div>

                        <button type="button"
                            onClick={() => { login("Guest User", "guest@auraindia.com"); router.push("/"); }}
                            style={{ width: "100%", padding: "13px", background: "#faf7f4", color: "#7a6e68", border: "1.5px solid #e8ddd6", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s" }}>
                            Continue as Guest
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: 24, fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}>
                        {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setTab(tab === "login" ? "register" : "login")}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#c8956c", fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, textDecoration: "underline" }}>
                            {tab === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
          .auth-right { padding: 40px 24px !important; }
        }
      `}</style>
        </div>
    );
}
