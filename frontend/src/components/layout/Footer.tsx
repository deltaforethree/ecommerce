"use client";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const LINKS = {
    Shop: [
        { label: "New Arrivals", href: "/products?filter=new" },
        { label: "Bestsellers", href: "/products?filter=bestseller" },
        { label: "Anarkali", href: "/products?category=anarkali" },
        { label: "Kurti Sets", href: "/products?category=kurti-set" },
        { label: "Half Saree", href: "/products?category=half-saree" },
        { label: "Co-ord Sets", href: "/products?category=co-ord-set" },
    ],
    Help: [
        { label: "Size Guide", href: "/size-guide" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns & Exchange", href: "/returns" },
        { label: "Track Order", href: "/orders" },
        { label: "FAQ", href: "/faq" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer style={{ background: "#1a1412", color: "#e8ddd6" }}>
            {/* Newsletter */}
            <div style={{ borderBottom: "1px solid rgba(232,221,214,0.15)", padding: "56px 24px" }}>
                <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
                    <p className="section-label" style={{ color: "#c8956c" }}>Stay Connected</p>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: "#fffcf8", marginBottom: 12, letterSpacing: 1 }}>
                        Join the Aura India Family
                    </h3>
                    <p style={{ fontSize: 14, color: "#b0a099", marginBottom: 28, fontFamily: "Jost, sans-serif" }}>
                        Get exclusive offers, style inspiration, and early access to new collections.
                    </p>
                    <form style={{ display: "flex", gap: 0, maxWidth: 440, margin: "0 auto" }}
                        onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}>
                        <input
                            type="email"
                            required
                            placeholder="Your email address"
                            style={{
                                flex: 1,
                                padding: "14px 20px",
                                background: "rgba(255,252,248,0.07)",
                                border: "1px solid rgba(232,221,214,0.25)",
                                borderRight: "none",
                                color: "#fffcf8",
                                fontFamily: "Jost, sans-serif",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "14px 24px",
                                background: "#c8956c",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "Jost, sans-serif",
                                fontSize: 12,
                                fontWeight: 600,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#a0714a")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#c8956c")}
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 24px 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }} className="footer-grid">
                {/* Brand */}
                <div>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 600, color: "#fffcf8", letterSpacing: 4 }}>AURA</div>
                        <div style={{ fontFamily: "Jost, sans-serif", fontSize: 9, letterSpacing: 6, color: "#c8956c", fontWeight: 500, textTransform: "uppercase" }}>INDIA</div>
                    </div>
                    <p style={{ fontSize: 14, color: "#b0a099", lineHeight: 1.8, marginBottom: 24, fontFamily: "Jost, sans-serif", maxWidth: 260 }}>
                        Celebrating the grace and elegance of Indian women through premium handcrafted fashion since 2020.
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" style={{ width: 38, height: 38, border: "1px solid rgba(232,221,214,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b0a099", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8956c"; e.currentTarget.style.color = "#c8956c"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,221,214,0.25)"; e.currentTarget.style.color = "#b0a099"; }}>
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>

                    <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#b0a099", fontFamily: "Jost, sans-serif" }}>
                            <Mail size={14} color="#c8956c" /> support@auraindia.com
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#b0a099", fontFamily: "Jost, sans-serif" }}>
                            <Phone size={14} color="#c8956c" /> +91 98765 43210
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#b0a099", fontFamily: "Jost, sans-serif" }}>
                            <MapPin size={14} color="#c8956c" /> Mumbai, Maharashtra, India
                        </div>
                    </div>
                </div>

                {/* Links */}
                {Object.entries(LINKS).map(([section, links]) => (
                    <div key={section}>
                        <h4 style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#c8956c", marginBottom: 20 }}>
                            {section}
                        </h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} style={{ textDecoration: "none", fontSize: 14, color: "#b0a099", fontFamily: "Jost, sans-serif", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fffcf8")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "#b0a099")}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom */}
            <div style={{ borderTop: "1px solid rgba(232,221,214,0.12)", padding: "20px 24px", maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <p style={{ fontSize: 12, color: "#7a6e68", fontFamily: "Jost, sans-serif" }}>
                    © 2024 Aura India. All rights reserved. Made with ♡ in India.
                </p>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    {["Visa", "Mastercard", "UPI", "RazorPay", "COD"].map((m) => (
                        <span key={m} style={{ fontSize: 11, color: "#7a6e68", fontFamily: "Jost, sans-serif", padding: "4px 8px", border: "1px solid rgba(232,221,214,0.15)", letterSpacing: 0.5 }}>
                            {m}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
