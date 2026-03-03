import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(80px, 12vw, 140px)", fontWeight: 300, color: "#e8ddd6", lineHeight: 1, marginBottom: 0 }}>404</p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#1a1412", marginBottom: 16 }}>Page Not Found</h1>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", marginBottom: 40, maxWidth: 420 }}>
                Looks like this page has wandered off like a beautiful dupatta in the wind. Let's take you back home.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/" className="btn-primary">Back to Home</Link>
                <Link href="/products" className="btn-outline">Browse Products</Link>
            </div>
        </div>
    );
}
