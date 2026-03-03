"use client";
import Link from "next/link";
import { useAuthStore, useCartStore, useWishlistStore } from "@/lib/store";
import { User, ShoppingBag, Heart, Settings, LogOut, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const cartCount = useCartStore((s) => s.getTotalItems());
    const wishlistCount = useWishlistStore((s) => s.items.length);
    const router = useRouter();

    if (!user) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px" }}>
                <User size={64} color="#e8ddd6" style={{ marginBottom: 24 }} />
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 400, color: "#1a1412", marginBottom: 12 }}>Sign In to Your Account</h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", marginBottom: 32 }}>Access your orders, wishlist and account settings.</p>
                <Link href="/login" className="btn-primary">Sign In / Register</Link>
            </div>
        );
    }

    const QUICK_LINKS = [
        { icon: ShoppingBag, label: "My Orders", desc: "Track and manage your orders", href: "/orders", count: null },
        { icon: Heart, label: "My Wishlist", desc: "Items you've saved for later", href: "/wishlist", count: wishlistCount },
        { icon: ShoppingBag, label: "My Cart", desc: "Review your current cart", href: "/cart", count: cartCount },
        { icon: Settings, label: "Account Settings", desc: "Update your profile and preferences", href: "#", count: null },
    ];

    return (
        <div>
            <div style={{ background: "#1a1412", padding: "56px 5vw" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#c8956c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 500, color: "#fff" }}>
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="section-label" style={{ color: "#c8956c" }}>My Account</p>
                            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#fffcf8", marginBottom: 4 }}>
                                Welcome back, {user.name}!
                            </h1>
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#b0a099" }}>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 5vw" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }} className="account-grid">
                    {QUICK_LINKS.map(({ icon: Icon, label, desc, href, count }) => (
                        <Link key={label} href={href} style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #e8ddd6", padding: "28px 24px", position: "relative", transition: "all 0.2s", boxShadow: "0 1px 8px rgba(26,20,18,0.04)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#c8956c"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(26,20,18,0.09)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e8ddd6"; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(26,20,18,0.04)"; }}
                        >
                            {count !== null && count > 0 && (
                                <span style={{ position: "absolute", top: 16, right: 16, background: "#c8956c", color: "#fff", minWidth: 22, height: 22, borderRadius: "50%", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                                    {count}
                                </span>
                            )}
                            <Icon size={28} color="#c8956c" style={{ marginBottom: 16 }} />
                            <h3 style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1412", marginBottom: 6 }}>{label}</h3>
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}>{desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Profile Section */}
                <div style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "32px" }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 400, color: "#1a1412", marginBottom: 24 }}>Profile Information</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 640 }}>
                        {[
                            { label: "Full Name", value: user.name },
                            { label: "Email Address", value: user.email },
                            { label: "Mobile", value: "+91 •••• ••• 210" },
                            { label: "Member Since", value: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }) },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <label style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#7a6e68", display: "block", marginBottom: 6 }}>{label}</label>
                                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#1a1412" }}>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout */}
                <div style={{ marginTop: 32 }}>
                    <button
                        onClick={() => { logout(); router.push("/"); }}
                        style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "1.5px solid #e8ddd6", padding: "12px 24px", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, color: "#c0392b", letterSpacing: 1, transition: "all 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#c0392b"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#c0392b"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#c0392b"; e.currentTarget.style.borderColor = "#e8ddd6"; }}
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .account-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .account-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
