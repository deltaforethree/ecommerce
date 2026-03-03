"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store";

const NAV_LINKS = [
    {
        label: "Collections",
        href: "/products",
        submenu: [
            { label: "Anarkali", href: "/products?category=anarkali" },
            { label: "Kurti Sets", href: "/products?category=kurti-set" },
            { label: "Half Saree", href: "/products?category=half-saree" },
            { label: "Co-ord Sets", href: "/products?category=co-ord-set" },
            { label: "Ethnic Maxi", href: "/products?category=ethnic-maxi" },
            { label: "Lounge Wear", href: "/products?category=lounge" },
        ],
    },
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Bestsellers", href: "/products?filter=bestseller" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const cartCount = useCartStore((s) => s.getTotalItems());
    const wishlistCount = useWishlistStore((s) => s.items.length);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    // Gate all client-store values behind mount to avoid SSR/client mismatch
    const clientCartCount = mounted ? cartCount : 0;
    const clientWishlistCount = mounted ? wishlistCount : 0;
    const clientUser = mounted ? user : null;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <>
            {/* Announcement Bar */}
            <div style={{ background: "#1a1412", color: "#e8bfa3", textAlign: "center", padding: "10px 16px", fontSize: "12px", letterSpacing: "2px", fontFamily: "Jost, sans-serif", fontWeight: 500 }}>
                FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; USE CODE: AURA10 FOR 10% OFF
            </div>

            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    background: scrolled ? "rgba(255,252,248,0.97)" : "#fffcf8",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    boxShadow: scrolled ? "0 2px 30px rgba(26,20,18,0.08)" : "none",
                    borderBottom: "1px solid #e8ddd6",
                    transition: "all 0.3s ease",
                }}
            >
                <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
                    {/* Logo - Fixed Left */}
                    <Link href="/" style={{ textDecoration: "none", flex: "0 0 auto" }}>
                        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 600, color: "#1a1412", letterSpacing: 3 }}>AURA</span>
                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: 9, letterSpacing: 6, color: "#c8956c", fontWeight: 500, textTransform: "uppercase" }}>INDIA</span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Centered */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 4 }} className="hidden-mobile">
                        {NAV_LINKS.map((link) => (
                            <div
                                key={link.label}
                                style={{ position: "relative" }}
                                onMouseEnter={() => setActiveDropdown(link.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        padding: "8px 16px",
                                        textDecoration: "none",
                                        fontFamily: "Jost, sans-serif",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        letterSpacing: 1.5,
                                        textTransform: "uppercase",
                                        color: "#1a1412",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c8956c")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1412")}
                                >
                                    {link.label}
                                    {link.submenu && <ChevronDown size={12} />}
                                </Link>
                                {link.submenu && activeDropdown === link.label && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "#fffcf8",
                                            border: "1px solid #e8ddd6",
                                            boxShadow: "0 20px 60px rgba(26,20,18,0.15)",
                                            padding: "16px 0",
                                            minWidth: 200,
                                            zIndex: 1001,
                                            animation: "fadeIn 0.2s ease",
                                        }}
                                    >
                                        {link.submenu.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                style={{
                                                    display: "block",
                                                    padding: "10px 24px",
                                                    textDecoration: "none",
                                                    fontFamily: "Jost, sans-serif",
                                                    fontSize: 13,
                                                    color: "#1a1412",
                                                    letterSpacing: 0.5,
                                                    transition: "all 0.2s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = "#c8956c";
                                                    e.currentTarget.style.paddingLeft = "30px";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = "#1a1412";
                                                    e.currentTarget.style.paddingLeft = "24px";
                                                }}
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Icons & Mobile Menu Button - Fixed Right */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flex: "0 0 auto", justifyContent: "flex-end" }}>
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 10, color: "#1a1412", transition: "color 0.2s", position: "relative" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8956c")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1412")}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            style={{ position: "relative", padding: 10, color: "#1a1412", transition: "color 0.2s", display: "flex" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8956c")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1412")}
                            aria-label="Wishlist"
                        >
                            <Heart size={20} />
                            {clientWishlistCount > 0 && (
                                <span style={{ position: "absolute", top: 4, right: 4, background: "#c8956c", color: "#fff", width: 17, height: 17, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                                    {clientWishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Account */}
                        <div style={{ position: "relative" }}
                            onMouseEnter={() => setActiveDropdown("account")}
                            onMouseLeave={() => setActiveDropdown(null)}
                            className="hidden-mobile"
                        >
                            <Link
                                href={clientUser ? "/account" : "/login"}
                                style={{ position: "relative", padding: 10, color: clientUser ? "#c8956c" : "#1a1412", transition: "color 0.2s", display: "flex" }}
                                aria-label="Account"
                            >
                                <User size={20} />
                            </Link>
                            {clientUser && activeDropdown === "account" && (
                                <div style={{ position: "absolute", right: 0, top: "100%", background: "#fffcf8", border: "1px solid #e8ddd6", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", padding: "8px 0", minWidth: 160, zIndex: 1001, animation: "fadeIn 0.2s ease" }}>
                                    <div style={{ padding: "10px 16px", borderBottom: "1px solid #e8ddd6", fontSize: 13, color: "#7a6e68", fontFamily: "Jost, sans-serif" }}>
                                        Hi, {clientUser.name.split(" ")[0]}!
                                    </div>
                                    <Link href="/account" style={{ display: "block", padding: "10px 16px", textDecoration: "none", fontSize: 13, color: "#1a1412", fontFamily: "Jost, sans-serif" }}>My Account</Link>
                                    <Link href="/orders" style={{ display: "block", padding: "10px 16px", textDecoration: "none", fontSize: 13, color: "#1a1412", fontFamily: "Jost, sans-serif" }}>My Orders</Link>
                                    <button onClick={logout} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: "#c0392b", background: "none", border: "none", cursor: "pointer", fontFamily: "Jost, sans-serif" }}>Logout</button>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            style={{ position: "relative", padding: 10, color: "#1a1412", transition: "color 0.2s", display: "flex" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#c8956c")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1412")}
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} />
                            {clientCartCount > 0 && (
                                <span style={{ position: "absolute", top: 4, right: 4, background: "#1a1412", color: "#fff", width: 17, height: 17, borderRadius: "50%", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                                    {clientCartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button - RIGHT MOST */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 10, color: "#1a1412" }}
                            className="show-mobile"
                            aria-label="Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div style={{ borderTop: "1px solid #e8ddd6", padding: "16px 24px", background: "#fffcf8", animation: "fadeIn 0.2s ease" }}>
                        <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: "0 auto", display: "flex", gap: 12 }}>
                            <input
                                ref={searchRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for anarkalis, kurtis, half sarees..."
                                style={{
                                    flex: 1,
                                    padding: "12px 16px",
                                    border: "1.5px solid #e8ddd6",
                                    outline: "none",
                                    fontFamily: "Jost, sans-serif",
                                    fontSize: 14,
                                    background: "#fff",
                                    color: "#1a1412",
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#c8956c")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8ddd6")}
                            />
                            <button type="submit" className="btn-primary" style={{ padding: "12px 24px" }}>
                                Search
                            </button>
                        </form>
                    </div>
                )}

                {/* Mobile Side Drawer Overlay */}
                {mobileOpen && (
                    <div
                        onClick={() => setMobileOpen(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(26,20,18,0.4)", backdropFilter: "blur(2px)", zIndex: 1100, animation: "fadeIn 0.3s ease" }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: "absolute", top: 0, right: 0, width: "85%", maxWidth: 360, height: "100vh", background: "#fffcf8", boxShadow: "-10px 0 40px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", animation: "slideInRight 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)" }}
                        >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e8ddd6" }}>
                                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600, color: "#1a1412", letterSpacing: 3 }}>AURA</span>
                                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: 8, letterSpacing: 4, color: "#c8956c", fontWeight: 500, textTransform: "uppercase" }}>INDIA</span>
                                </div>
                                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#1a1412" }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                                {NAV_LINKS.map((link) => (
                                    <div key={link.label} style={{ marginBottom: 8 }}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            style={{ display: "block", padding: "12px 0", textDecoration: "none", fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#1a1412" }}
                                        >
                                            {link.label}
                                        </Link>
                                        {link.submenu && (
                                            <div style={{ paddingLeft: 12, borderLeft: "1px solid #e8ddd6", marginLeft: 2 }}>
                                                {link.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        style={{ display: "block", padding: "8px 0", textDecoration: "none", fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68" }}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: "24px", borderTop: "1px solid #e8ddd6", background: "#fefaf6" }}>
                                {!clientUser ? (
                                    <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ width: "100%", padding: "14px" }}>
                                        Login / Register
                                    </Link>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        <div style={{ fontSize: 14, color: "#7a6e68", fontFamily: "Jost, sans-serif" }}>
                                            Logged in as <span style={{ color: "#1a1412", fontWeight: 600 }}>{clientUser.name}</span>
                                        </div>
                                        <Link href="/account" onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: "#1a1412", textDecoration: "none", fontWeight: 500 }}>My Account</Link>
                                        <button onClick={() => { logout(); setMobileOpen(false); }}
                                            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "8px 0", fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, color: "#c0392b" }}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </>
    );
}
