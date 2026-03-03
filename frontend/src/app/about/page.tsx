"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TEAM = [
    { name: "Hemanth", role: "Frontend Developer" },
    { name: "Navaneeth", role: "UI/UX Designer" },
    { name: "Praveen", role: "Backend Developer" },
];

const VALUES = [
    { title: "Heritage First", desc: "Every stitch is a tribute to India's rich textile traditions spanning centuries." },
    { title: "Sustainable Fashion", desc: "We source fabrics responsibly and work with artisan communities across India." },
    { title: "Women Empowered", desc: "Our team is 87% women, from designers to artisans celebrating their craft." },
    { title: "Premium Quality", desc: "Every piece undergoes 34 quality checks before it reaches your doorstep." },
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section style={{ position: "relative", height: "55vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=85" alt="About Aura India" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(26,20,18,0.6)" }} />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 5vw" }}>
                    <p className="section-label" style={{ color: "#e8bfa3" }}>Our Story</p>
                    <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#fffcf8", lineHeight: 1.1, letterSpacing: 1 }}>
                        The Spirit of<br />Aura India
                    </h1>
                </div>
            </section>

            {/* Story */}
            <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw", textAlign: "center" }}>
                <p className="section-label">Who We Are</p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "#1a1412", marginBottom: 24, lineHeight: 1.3 }}>
                    Celebrating the Modern Indian Woman
                </h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 16, color: "#4a3f3a", lineHeight: 2, marginBottom: 20 }}>
                    Aura India was founded in 2020 with a simple belief — that Indian women deserve fashion that celebrates their heritage without compromising on style or comfort. We began as a small studio in Mumbai, hand-making anarkali suits for weddings and festivals.
                </p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 16, color: "#4a3f3a", lineHeight: 2 }}>
                    Today, we are a team of passionate designers, artisans, and storytellers who believe that every garment should tell a story. From the chikankari of Lucknow to the silk weaves of Kanjivaram — we bring the best of India's textile heritage to your doorstep.
                </p>
            </section>

            {/* Stats */}
            <section style={{ background: "#1a1412", padding: "64px 5vw" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="stats-grid">
                    {[
                        { number: "50,000+", label: "Happy Customers" },
                        { number: "1,200+", label: "Styles Created" },
                        { number: "28", label: "Artisan Communities" },
                        { number: "4.8★", label: "Average Rating" },
                    ].map(({ number, label }) => (
                        <div key={label} style={{ textAlign: "center", padding: "24px" }}>
                            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#c8956c", marginBottom: 8 }}>{number}</p>
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#b0a099", letterSpacing: 2, textTransform: "uppercase" }}>{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: "80px 5vw" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <p className="section-label">What We Stand For</p>
                        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#1a1412" }}>Our Values</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="values-about-grid">
                        {VALUES.map((v, i) => (
                            <div key={v.title} style={{ position: "relative", padding: "32px 28px", border: "1px solid #e8ddd6" }}>
                                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 56, fontWeight: 300, color: "#f0ebe6", position: "absolute", top: 16, right: 20, lineHeight: 1 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: "#1a1412", marginBottom: 12 }}>{v.title}</h3>
                                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68", lineHeight: 1.7 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section style={{ background: "#faf7f4", padding: "80px 5vw" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <p className="section-label">The People Behind Aura</p>
                        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#1a1412" }}>Meet Our Team Delta Force</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="team-grid">
                        {TEAM.map((member) => (
                            <div key={member.name} style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 20px", borderRadius: "50%", overflow: "hidden", border: "4px solid #e8ddd6" }}>

                                </div>
                                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 500, color: "#1a1412", marginBottom: 4 }}>{member.name}</h3>
                                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#c8956c", letterSpacing: 1 }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "80px 5vw", textAlign: "center", background: "#fffcf8" }}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 400, color: "#1a1412", marginBottom: 20 }}>
                    Ready to Wear Our Story?
                </h2>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 16, color: "#7a6e68", marginBottom: 36 }}>Explore our latest collection and find your perfect ethnic ensemble.</p>
                <Link href="/products" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    Shop Collection <ArrowRight size={15} />
                </Link>
            </section>

            <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-about-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-about-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
