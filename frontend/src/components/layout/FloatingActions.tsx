"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 12, zIndex: 999 }}>
            {/* WhatsApp Chat Icon */}
            <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                style={{
                    width: 50,
                    height: 50,
                    background: "#25d366",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)",
                    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    textDecoration: "none",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.transform = "scale(1.1) rotate(5deg)")}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.transform = "scale(1) rotate(0)")}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    style={{ width: 28, height: 28 }}
                />
            </a>

            {/* Scroll to Top Icon */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    style={{
                        width: 50,
                        height: 50,
                        background: "#1a1412",
                        color: "#fffcf8",
                        border: "1px solid #e8ddd6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        animation: "fadeInUp 0.4s forwards",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.background = "#c8956c";
                        e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.background = "#1a1412";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <ArrowUp size={24} />
                </button>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
