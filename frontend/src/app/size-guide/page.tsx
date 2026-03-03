import Link from "next/link";

export default function SizeGuide() {
    const SIZE_CHART = [
        { size: "XS", bust: "32\"", waist: "26\"", hips: "36\"", length: "54\"" },
        { size: "S", bust: "34\"", waist: "28\"", hips: "38\"", length: "54\"" },
        { size: "M", bust: "36\"", waist: "30\"", hips: "40\"", length: "55\"" },
        { size: "L", bust: "38\"", waist: "32\"", hips: "42\"", length: "55\"" },
        { size: "XL", bust: "40\"", waist: "34\"", hips: "44\"", length: "56\"" },
        { size: "XXL", bust: "42\"", waist: "36\"", hips: "46\"", length: "56\"" },
    ];

    return (
        <div>
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "48px 5vw 40px" }}>
                <p className="section-label">Shopping Help</p>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1a1412" }}>Size Guide</h1>
            </div>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 5vw 80px" }}>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#7a6e68", lineHeight: 1.8, marginBottom: 40 }}>
                    All measurements are in inches. For the best fit, measure your body and compare with our size chart. If you're between sizes, we recommend sizing up for a comfortable fit.
                </p>

                {/* How to measure */}
                <div style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "28px", marginBottom: 40 }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 400, color: "#1a1412", marginBottom: 16 }}>How to Measure</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="measure-grid">
                        {[
                            { title: "Bust", desc: "Measure around the fullest part of your chest, keeping the tape horizontal." },
                            { title: "Waist", desc: "Measure around your natural waistline, the narrowest part of your torso." },
                            { title: "Hips", desc: "Measure around the fullest part of your hips, about 7-8 inches below your waist." },
                        ].map((m) => (
                            <div key={m.title}>
                                <h3 style={{ fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 600, color: "#c8956c", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{m.title}</h3>
                                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 13, color: "#7a6e68", lineHeight: 1.7 }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 400, color: "#1a1412", marginBottom: 20 }}>Standard Size Chart</h2>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Jost, sans-serif" }}>
                        <thead>
                            <tr style={{ background: "#1a1412" }}>
                                {["Size", "Bust", "Waist", "Hips", "Approx. Length"].map((h) => (
                                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", color: "#fffcf8", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {SIZE_CHART.map((row, i) => (
                                <tr key={row.size} style={{ background: i % 2 === 0 ? "#fff" : "#faf7f4", transition: "background 0.2s" }}>
                                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#c8956c", fontSize: 15 }}>{row.size}</td>
                                    <td style={{ padding: "14px 20px", color: "#1a1412", fontSize: 14 }}>{row.bust}</td>
                                    <td style={{ padding: "14px 20px", color: "#1a1412", fontSize: 14 }}>{row.waist}</td>
                                    <td style={{ padding: "14px 20px", color: "#1a1412", fontSize: 14 }}>{row.hips}</td>
                                    <td style={{ padding: "14px 20px", color: "#1a1412", fontSize: 14 }}>{row.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: 40, padding: "20px", background: "#faf7f4", border: "1px solid #e8ddd6" }}>
                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>
                        💡 <strong style={{ color: "#1a1412" }}>Need help?</strong> Contact us at <strong>support@auraindia.com</strong> or WhatsApp us at <strong>+91 98765 43210</strong> for personalized sizing assistance.
                    </p>
                </div>
            </div>
            <style>{`
        @media (max-width: 600px) {
          .measure-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
