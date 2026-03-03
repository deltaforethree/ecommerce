"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

function ProductsContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [gridCols, setGridCols] = useState(4);

    useEffect(() => {
        const cat = searchParams.get("category");
        const filter = searchParams.get("filter");
        const search = searchParams.get("search");
        if (cat) setSelectedCategory(cat);
        if (filter) {
            setSelectedCategory("all");
        }
    }, [searchParams]);

    const filtered = useMemo(() => {
        let prods = [...PRODUCTS];

        const filter = searchParams.get("filter");
        const search = searchParams.get("search");

        if (filter === "new") prods = prods.filter((p) => p.isNew);
        if (filter === "bestseller") prods = prods.filter((p) => p.isBestseller);
        if (filter === "featured") prods = prods.filter((p) => p.isFeatured);

        if (selectedCategory !== "all") prods = prods.filter((p) => p.category === selectedCategory);
        if (search) {
            const s = search.toLowerCase();
            prods = prods.filter((p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s) || p.tags.some((t) => t.includes(s)));
        }

        prods = prods.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (sortBy === "price_asc") prods.sort((a, b) => a.price - b.price);
        if (sortBy === "price_desc") prods.sort((a, b) => b.price - a.price);
        if (sortBy === "rating") prods.sort((a, b) => b.rating - a.rating);
        if (sortBy === "newest") prods.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

        return prods;
    }, [selectedCategory, sortBy, priceRange, searchParams]);

    const searchQuery = searchParams.get("search");
    const filterLabel = searchParams.get("filter");
    const pageTitle = searchQuery
        ? `Search: "${searchQuery}"`
        : filterLabel === "new"
            ? "New Arrivals"
            : filterLabel === "bestseller"
                ? "Bestsellers"
                : selectedCategory !== "all"
                    ? CATEGORIES.find((c) => c.id === selectedCategory)?.label || "Products"
                    : "All Products";

    return (
        <div>
            {/* Page Header */}
            <div style={{ background: "#faf7f4", borderBottom: "1px solid #e8ddd6", padding: "48px 5vw 40px" }}>
                <p className="section-label">Shop</p>
                <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, color: "#1a1412", marginBottom: 8 }}>
                    {pageTitle}
                </h1>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#7a6e68" }}>
                    {filtered.length} {filtered.length === 1 ? "product" : "products"} found
                </p>
            </div>

            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 5vw" }}>
                {/* Category Tabs */}
                <div style={{ overflowX: "auto", padding: "24px 0", borderBottom: "1px solid #e8ddd6", display: "flex", gap: 8 }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: "8px 20px",
                                background: selectedCategory === cat.id ? "#1a1412" : "transparent",
                                color: selectedCategory === cat.id ? "#fff" : "#7a6e68",
                                border: `1.5px solid ${selectedCategory === cat.id ? "#1a1412" : "#e8ddd6"}`,
                                cursor: "pointer",
                                fontFamily: "Jost, sans-serif",
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                                transition: "all 0.2s",
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", flexWrap: "wrap", gap: 12 }}>
                    {/* Filter Toggle */}
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", border: "1.5px solid #e8ddd6", background: filterOpen ? "#1a1412" : "transparent", color: filterOpen ? "#fff" : "#1a1412", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1.5, transition: "all 0.2s" }}
                    >
                        <SlidersHorizontal size={14} /> Filters
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {/* Grid Toggle */}
                        <div style={{ display: "flex", gap: 4 }}>
                            {[3, 4].map((n) => (
                                <button key={n} onClick={() => setGridCols(n)}
                                    style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${gridCols === n ? "#1a1412" : "#e8ddd6"}`, background: gridCols === n ? "#1a1412" : "transparent", color: gridCols === n ? "#fff" : "#7a6e68", cursor: "pointer", transition: "all 0.2s" }}>
                                    {n === 3 ? <Grid3X3 size={14} /> : <LayoutGrid size={14} />}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div style={{ position: "relative" }}>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ appearance: "none", padding: "10px 36px 10px 16px", border: "1.5px solid #e8ddd6", background: "#fff", fontFamily: "Jost, sans-serif", fontSize: 13, color: "#1a1412", cursor: "pointer", outline: "none" }}
                            >
                                <option value="default">Sort By</option>
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="rating">Best Rated</option>
                            </select>
                            <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#7a6e68" }} />
                        </div>
                    </div>
                </div>

                {/* Filter Panel */}
                {filterOpen && (
                    <div style={{ background: "#faf7f4", border: "1px solid #e8ddd6", padding: "28px", marginBottom: 24, animation: "fadeInUp 0.3s ease" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
                            <div>
                                <h4 style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#1a1412", marginBottom: 16 }}>Price Range</h4>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <input type="range" min={0} max={15000} step={100} value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        style={{ flex: 1, accentColor: "#c8956c" }} />
                                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: 14, color: "#1a1412", whiteSpace: "nowrap" }}>
                                        ₹{priceRange[0].toLocaleString()} — ₹{priceRange[1].toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "Jost, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#1a1412", marginBottom: 16 }}>Quick Filters</h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[
                                        { label: "New Arrivals", filter: "new" },
                                        { label: "Bestsellers", filter: "bestseller" },
                                        { label: "Featured", filter: "featured" },
                                    ].map((f) => (
                                        <label key={f.filter} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 14, color: "#1a1412" }}>
                                            <input type="checkbox" style={{ accentColor: "#c8956c" }} onChange={() => {
                                                window.location.href = `/products?filter=${f.filter}`;
                                            }} />
                                            {f.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                                <button onClick={() => { setPriceRange([0, 15000]); setSelectedCategory("all"); setSortBy("default"); }}
                                    style={{ padding: "10px 20px", background: "transparent", border: "1.5px solid #e8ddd6", cursor: "pointer", fontFamily: "Jost, sans-serif", fontSize: 12, color: "#7a6e68", letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 6 }}>
                                    <X size={12} /> Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "100px 0" }}>
                        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, color: "#7a6e68", marginBottom: 16 }}>No products found</p>
                        <p style={{ fontFamily: "Jost, sans-serif", fontSize: 15, color: "#b0a099", marginBottom: 32 }}>Try adjusting your filters or search terms</p>
                        <button onClick={() => { setSelectedCategory("all"); setSortBy("default"); setPriceRange([0, 15000]); }} className="btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: 24, paddingBottom: 80 }} className="products-grid-responsive">
                        {filtered.map((p, i) => (
                            <div key={p.id} style={{ animation: `fadeInUp 0.5s ${i * 0.06}s ease both` }}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .products-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .products-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
        }
        @media (max-width: 400px) {
          .products-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: "center", padding: 80, fontFamily: "Jost, sans-serif", color: "#7a6e68" }}>Loading products...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
