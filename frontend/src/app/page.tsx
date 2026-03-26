"use client";
import Link from "next/link";
import { ArrowRight, Star, Package, RefreshCw, Shield, Truck } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import { PRODUCTS, TESTIMONIALS } from "@/lib/data";

// Hero image — striking red ethnic outfit, perfect for hero
const HERO_IMAGE = "/photos/THUE2679.JPG";


const HERO_SLIDES = [
  {
    image: "/photos/THUE2679.JPG",
    label: "New Collection 2024",
    title: "Elegance\nRooted in\nTradition",
    subtitle: "Discover handcrafted anarkalis and kurti sets that celebrate the beauty of Indian women.",
    cta: "Shop Anarkalis",
    href: "/products?category=anarkali",
    accent: "#c8956c",
  },
  {
    image: "/photos/IMG_E1175.JPG",
    label: "Bestsellers",
    title: "Timeless\nIndian\nGrace",
    subtitle: "Premium silk kurti sets and half sarees crafted for the modern woman who cherishes heritage.",
    cta: "Explore Kurti Sets",
    href: "/products?category=kurti-set",
    accent: "#a0714a",
  },
  {
    image: "/photos/0(1).jpg",
    label: "Festive Edit",
    title: "Shine\nThis\nSeason",
    subtitle: "Opulent festive wear with intricate embroidery — from weddings to celebrations.",
    cta: "Shop Festive",
    href: "/products?subcategory=festive",
    accent: "#8b5e3c",
  },
];


const COLLECTIONS = [
  { title: "Anarkali", image: "/photos/IMG_0126.JPG", href: "/products?category=anarkali", count: "12 styles" },
  { title: "Half Saree", image: "/photos/6a.jpg", href: "/products?category=half-saree", count: "8 styles" },
  { title: "Kurti Sets", image: "/photos/FTNX9809.JPG", href: "/products?category=kurti-set", count: "20 styles" },
  { title: "Co-ord Sets", image: "/photos/IMG_E1634.JPG", href: "/products?category=co-ord-set", count: "18 styles" },
];

const VALUES = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
  { icon: RefreshCw, title: "Easy Returns", desc: "7-day hassle-free return policy" },
  { icon: Shield, title: "Secure Payment", desc: "100% safe & encrypted payments" },
  { icon: Package, title: "Premium Packaging", desc: "Luxurious gift packaging" },
];

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div>
      {/* ─────────────────────────────────────────
           HERO — Static, full-viewport, dark theme
      ───────────────────────────────────────── */}
      <section style={{
        position: "relative",
        height: "100svh",
        minHeight: 560,
        maxHeight: 960,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Aura India — Premium Indian Women's Fashion"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 20%",
            display: "block",
          }}
        />

        {/* Multi-layer dark overlay for depth and legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.45) 55%, rgba(10,8,6,0.60) 100%)",
        }} />
        {/* Bottom vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.55) 0%, transparent 50%)",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 5vw",
          maxWidth: 820,
          width: "100%",
        }}>

          {/* Eyebrow label */}
          <p style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#c8956c",
            marginBottom: 24,
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both",
          }}>
            New Collection 2024
          </p>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 300,
            color: "#fffcf8",
            lineHeight: 1.05,
            letterSpacing: -1,
            marginBottom: 28,
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both",
          }}>
            Elegance Rooted<br />
            <em style={{ fontStyle: "italic", color: "#e8bfa3" }}>in Tradition</em>
          </h1>

          {/* Thin rose-gold rule */}
          <div style={{
            width: 48, height: 1,
            background: "#c8956c",
            margin: "0 auto 28px",
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "Jost, sans-serif",
            fontSize: "clamp(14px, 1.5vw, 17px)",
            color: "rgba(255,252,248,0.70)",
            lineHeight: 1.85,
            maxWidth: 520,
            margin: "0 auto 44px",
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both",
          }}>
            Discover handcrafted anarkalis, silk kurti sets & half sarees
            — where every thread tells a story of India&apos;s timeless artistry.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both",
          }}>
            <Link
              href="/products"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#c8956c",
                color: "#fff",
                padding: "16px 36px",
                fontFamily: "Jost, sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: 2.5,
                textTransform: "uppercase", textDecoration: "none",
                border: "1.5px solid #c8956c",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#c8956c"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#c8956c"; el.style.color = "#fff"; }}
            >
              Shop Collection <ArrowRight size={14} />
            </Link>
            <Link
              href="/products?subcategory=festive"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent",
                color: "rgba(255,252,248,0.88)",
                padding: "16px 32px",
                fontFamily: "Jost, sans-serif",
                fontSize: 12, fontWeight: 600, letterSpacing: 2.5,
                textTransform: "uppercase", textDecoration: "none",
                border: "1.5px solid rgba(255,252,248,0.30)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,252,248,0.75)"; el.style.color = "#fff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,252,248,0.30)"; el.style.color = "rgba(255,252,248,0.88)"; }}
            >
              Festive Edit
            </Link>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: "clamp(24px, 5vw, 64px)",
            animation: "heroFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s both",
          }}>
            {[
              { value: "500+", label: "Designs" },
              { value: "10K+", label: "Happy Customers" },
              { value: "100%", label: "Handcrafted" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, color: "#fffcf8", lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "rgba(255,252,248,0.50)", letterSpacing: 2, textTransform: "uppercase", marginTop: 5 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "heroFadeUp 1s ease 1.1s both",
        }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "rgba(255,252,248,0.45)", letterSpacing: 3, textTransform: "uppercase" }}>Scroll</p>
          <div style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, rgba(200,149,108,0.7), transparent)",
            animation: "scrollPulse 1.8s ease-in-out infinite",
          }} />
        </div>

        {/* CSS */}
        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.5; transform: scaleY(1); }
            50%       { opacity: 1;   transform: scaleY(1.15); }
          }
          /* Mobile adjustments */
          @media (max-width: 640px) {
            section[style*="100svh"] { min-height: 100svh !important; max-height: none !important; }
          }
        `}</style>
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{ background: "#1a1412", padding: "11px 0", overflow: "hidden", borderTop: "1px solid #2d2420" }}>
        <div className="animate-marquee" style={{ display: "flex", gap: 56, whiteSpace: "nowrap" }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 700, color: "#c8956c", letterSpacing: 4, flexShrink: 0, textTransform: "uppercase" }}>
              ✦ Handcrafted &nbsp;&nbsp; ✦ Premium Fabrics &nbsp;&nbsp; ✦ Made in India &nbsp;&nbsp; ✦ Women Empowered &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── COLLECTIONS ─── */}
      <section style={{ padding: "var(--section-pad-y, 80px) var(--section-pad-x, 5vw)" }} className="section-mobile-pad">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p className="section-label">Shop by Category</p>
          <h2 className="section-heading">Our Collections</h2>
        </div>
        <div className="collections-grid">
          {COLLECTIONS.map((col) => (
            <Link key={col.title} href={col.href} style={{ textDecoration: "none", position: "relative", display: "block", aspectRatio: "3/4", overflow: "hidden", background: "#f5f0eb" }}
              className="img-zoom"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={col.image} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,20,18,0.75) 0%, rgba(26,20,18,0.1) 50%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: "#fffcf8", marginBottom: 3 }}>{col.title}</p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 11, color: "rgba(255,252,248,0.65)", letterSpacing: 2, textTransform: "uppercase" }}>{col.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section style={{ background: "#faf7f4", padding: "var(--section-pad-y, 80px) var(--section-pad-x, 5vw)" }} className="section-mobile-pad">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label">Handpicked For You</p>
          <h2 className="section-heading">Featured Collection</h2>
        </div>
        <div className="products-grid">
          {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link href="/products" className="btn-primary">View All Products <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section style={{ padding: "var(--section-pad-y, 80px) var(--section-pad-x, 5vw)" }} className="section-mobile-pad">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p className="section-label">Just Dropped</p>
            <h2 className="section-heading">New Arrivals</h2>
          </div>
          <Link href="/products?filter=new" style={{ textDecoration: "none", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 600, color: "#c8956c", letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="products-grid">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ background: "#faf7f4", borderTop: "1px solid #f0ebe6", borderBottom: "1px solid #f0ebe6" }}>
        <div className="values-grid">
          {VALUES.map(({ icon: Icon, title, desc }, idx) => (
            <div key={title} style={{ textAlign: "center", padding: "40px 24px", borderRight: idx < 3 ? "1px solid #f0ebe6" : "none" }}>
              <div style={{ width: 48, height: 48, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Icon size={20} color="#c8956c" />
              </div>
              <h4 style={{ fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#1a1412", marginBottom: 6 }}>
                {title}
              </h4>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BESTSELLERS ─── */}
      <section style={{ padding: "var(--section-pad-y, 80px) var(--section-pad-x, 5vw)" }} className="section-mobile-pad">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p className="section-label">Most Loved</p>
          <h2 className="section-heading">Bestsellers</h2>
        </div>
        <div className="products-grid">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ background: "#1a1412", padding: "var(--section-pad-y, 80px) var(--section-pad-x, 5vw)" }} className="section-mobile-pad">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label" style={{ color: "#c8956c" }}>What Our Customers Say</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 400, color: "#fffcf8" }}>
            Stories of Love &amp; Trust
          </h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div key={t.id} style={{ background: "rgba(255,252,248,0.04)", border: "1px solid rgba(232,221,214,0.10)", padding: "32px 26px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} fill="#c8956c" color="#c8956c" />)}
              </div>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#b0a099", lineHeight: 1.85, marginBottom: 24, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(232,221,214,0.08)", paddingTop: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 600, color: "#fffcf8" }}>{t.name}</p>
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68" }}>{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ position: "relative", padding: "100px 5vw", overflow: "hidden", textAlign: "center" }} className="section-mobile-pad">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/5(1).jpg"
          alt="Shop CTA"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,8,6,0.80) 0%, rgba(10,8,6,0.60) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <p className="section-label" style={{ color: "#e8bfa3" }}>Limited Time Offer</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 300, color: "#fffcf8", marginBottom: 16, letterSpacing: 0.5, lineHeight: 1.1 }}>
            Get 10% Off<br />Your First Order
          </h2>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "rgba(255,252,248,0.75)", marginBottom: 36, lineHeight: 1.7 }}>
            Use code <strong style={{ color: "#c8956c", fontWeight: 700 }}>AURA10</strong> at checkout
          </p>
          <Link href="/products" className="btn-rose" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
