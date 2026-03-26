// Mock product data — all Indian women's fashion
export interface ProductImage {
    url: string;
    alt: string;
}

export interface ProductVariant {
    size: string;
    stock: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    comparePrice?: number;
    category: string;
    subcategory?: string;
    fabric?: string;
    care?: string;
    tags: string[];
    images: ProductImage[];
    variants: ProductVariant[];
    isFeatured: boolean;
    isNew: boolean;
    isBestseller: boolean;
    rating: number;
    reviewCount: number;
}

// Local product photos — each product gets unique images, no duplicates

export const PRODUCTS: Product[] = [
    {
        id: "prod-001",
        name: "Crimson Anarkali Suit",
        slug: "crimson-anarkali-suit",
        description: "A stunning crimson red anarkali suit crafted from premium georgette fabric. Adorned with intricate gold zari embroidery along the hem and sleeves. Perfect for weddings and festive occasions. Comes with matching churidar and dupatta.",
        price: 4999,
        comparePrice: 7499,
        category: "anarkali",
        subcategory: "festive",
        fabric: "Georgette",
        care: "Dry clean only",
        tags: ["anarkali", "festive", "wedding", "embroidered"],
        images: [
            { url: "/photos/THUE2679.JPG", alt: "Crimson Anarkali Front" },
            { url: "/photos/IMG_E9027.JPG", alt: "Crimson Anarkali Back" },
        ],
        variants: [
            { size: "XS", stock: 3 }, { size: "S", stock: 5 },
            { size: "M", stock: 8 }, { size: "L", stock: 6 },
            { size: "XL", stock: 4 }, { size: "XXL", stock: 2 },
        ],
        isFeatured: true, isNew: true, isBestseller: false,
        rating: 4.8, reviewCount: 124,
    },
    {
        id: "prod-002",
        name: "Ivory Silk Kurti Set",
        slug: "ivory-silk-kurti-set",
        description: "Elegant ivory pure silk kurti with delicate hand-block printing. Paired with matching palazzo pants and organza dupatta. The subtle floral motifs add a touch of royalty.",
        price: 3499,
        comparePrice: 5500,
        category: "kurti-set",
        subcategory: "daily-wear",
        fabric: "Pure Silk",
        care: "Hand wash cold",
        tags: ["kurti", "silk", "ethnic", "daily-wear"],
        images: [
            { url: "/photos/FTNX9809.JPG", alt: "Ivory Kurti Set Front" },
            { url: "/photos/CCMU7906.JPG", alt: "Ivory Kurti Set Detail" },
        ],
        variants: [
            { size: "S", stock: 10 }, { size: "M", stock: 12 },
            { size: "L", stock: 9 }, { size: "XL", stock: 5 },
        ],
        isFeatured: true, isNew: false, isBestseller: true,
        rating: 4.6, reviewCount: 89,
    },
    {
        id: "prod-003",
        name: "Saffron Chikankari Anarkali",
        slug: "saffron-chikankari-anarkali",
        description: "Vibrant saffron anarkali with heavy chikankari embroidery on pure mul cotton. The flowing silhouette and intricate needlework make it ideal for festive celebrations and cultural events.",
        price: 5999,
        comparePrice: 8999,
        category: "anarkali",
        subcategory: "festive",
        fabric: "Mul Cotton",
        care: "Gentle machine wash",
        tags: ["anarkali", "chikankari", "festive", "cotton"],
        images: [
            { url: "/photos/IMG_0126.JPG", alt: "Saffron Anarkali Front" },
            { url: "/photos/IMG_E9924_Copy.JPG", alt: "Saffron Anarkali Detail" },
        ],
        variants: [
            { size: "XS", stock: 2 }, { size: "S", stock: 7 },
            { size: "M", stock: 10 }, { size: "L", stock: 8 },
            { size: "XL", stock: 3 },
        ],
        isFeatured: true, isNew: true, isBestseller: true,
        rating: 4.9, reviewCount: 201,
    },
    {
        id: "prod-004",
        name: "Peacock Blue Chanderi Kurti",
        slug: "peacock-blue-chanderi-kurti",
        description: "Mesmerizing peacock blue kurti in premium chanderi silk with gold gota patti border. Comes with matching chiffon dupatta with tassels. A perfect blend of tradition and contemporary.",
        price: 2799,
        comparePrice: 4200,
        category: "kurti-dupatta",
        subcategory: "casual",
        fabric: "Chanderi Silk",
        care: "Dry clean recommended",
        tags: ["kurti", "chanderi", "dupatta", "casual"],
        images: [
            { url: "/photos/8(1).jpg", alt: "Peacock Kurti Front" },
            { url: "/photos/5(1).jpg", alt: "Peacock Kurti Detail" },
        ],
        variants: [
            { size: "S", stock: 8 }, { size: "M", stock: 15 },
            { size: "L", stock: 12 }, { size: "XL", stock: 6 }, { size: "XXL", stock: 3 },
        ],
        isFeatured: false, isNew: true, isBestseller: false,
        rating: 4.5, reviewCount: 67,
    },
    {
        id: "prod-005",
        name: "Forest Green Linen Co-ord",
        slug: "forest-green-linen-coord",
        description: "Chic forest green co-ord set featuring a short kurta and wide-leg palazzo. Made from breathable linen blend fabric with delicate thread embroidery at the neckline. Perfect for brunch or office.",
        price: 3199,
        comparePrice: 4800,
        category: "co-ord-set",
        subcategory: "casual",
        fabric: "Linen Blend",
        care: "Machine wash cold",
        tags: ["coord-set", "linen", "casual", "modern"],
        images: [
            { url: "/photos/6a.jpg", alt: "Forest Green Co-ord" },
            { url: "/photos/IMG_3583.JPG", alt: "Co-ord Detail" },
        ],
        variants: [
            { size: "XS", stock: 5 }, { size: "S", stock: 9 },
            { size: "M", stock: 14 }, { size: "L", stock: 10 }, { size: "XL", stock: 4 },
        ],
        isFeatured: false, isNew: true, isBestseller: false,
        rating: 4.4, reviewCount: 43,
    },
    {
        id: "prod-006",
        name: "Royal Purple Half Saree",
        slug: "royal-purple-half-saree",
        description: "Exquisite royal purple half saree set with kanjeevaram silk skirt, matching blouse and contrast zari border. A stunning choice for ceremonies, cultural programs and festive celebrations.",
        price: 8999,
        comparePrice: 12500,
        category: "half-saree",
        subcategory: "festive",
        fabric: "Kanjeevaram Silk",
        care: "Professional dry clean only",
        tags: ["half-saree", "silk", "south-indian", "festive", "wedding"],
        images: [
            { url: "/photos/IMG_E1175.JPG", alt: "Royal Purple Half Saree" },
            { url: "/photos/IMG_E1177.JPG", alt: "Half Saree Detail" },
        ],
        variants: [
            { size: "S", stock: 4 }, { size: "M", stock: 6 },
            { size: "L", stock: 5 }, { size: "XL", stock: 3 },
        ],
        isFeatured: true, isNew: false, isBestseller: true,
        rating: 4.9, reviewCount: 312,
    },
    {
        id: "prod-007",
        name: "Dusty Rose Ethnic Maxi",
        slug: "dusty-rose-ethnic-maxi",
        description: "Romantic dusty rose ethnic maxi dress with delicate floral print. Features a flattering A-line silhouette, smocked waist and ruffle hem. The lightweight rayon fabric makes it comfortable for all-day wear.",
        price: 2499,
        comparePrice: 3800,
        category: "ethnic-maxi",
        subcategory: "casual",
        fabric: "Rayon",
        care: "Machine wash cold",
        tags: ["maxi", "ethnic", "casual", "floral", "summer"],
        images: [
            { url: "/photos/IMG_1415.JPG", alt: "Dusty Rose Maxi Front" },
            { url: "/photos/OWRI2864.JPG", alt: "Maxi Detail" },
        ],
        variants: [
            { size: "XS", stock: 6 }, { size: "S", stock: 11 },
            { size: "M", stock: 15 }, { size: "L", stock: 9 }, { size: "XL", stock: 5 },
        ],
        isFeatured: false, isNew: false, isBestseller: true,
        rating: 4.7, reviewCount: 178,
    },
    {
        id: "prod-008",
        name: "Midnight Navy Mirror Set",
        slug: "midnight-navy-mirror-set",
        description: "Sophisticated midnight navy skirt and top set, featuring a cropped embroidered top and flared skirt with mirror work. Traditional embroidery meets modern silhouette in this fusion look.",
        price: 3799,
        comparePrice: 5500,
        category: "skirt-set",
        subcategory: "festive",
        fabric: "Crepe",
        care: "Dry clean recommended",
        tags: ["skirt", "top", "mirror-work", "fusion", "festive"],
        images: [
            { url: "/photos/0(1).jpg", alt: "Midnight Navy Skirt Set" },
            { url: "/photos/IMG_1574.JPG", alt: "Navy Set Detail" },
        ],
        variants: [
            { size: "S", stock: 7 }, { size: "M", stock: 10 },
            { size: "L", stock: 8 }, { size: "XL", stock: 4 },
        ],
        isFeatured: false, isNew: true, isBestseller: false,
        rating: 4.3, reviewCount: 56,
    },
    {
        id: "prod-009",
        name: "Terracotta Bandhani Kurti",
        slug: "terracotta-bandhani-kurti",
        description: "Authentic terracotta bandhani kurti in soft cotton fabric. The traditional tie-dye technique creates stunning patterns unique to each piece. Lightweight and comfortable for summer.",
        price: 1899,
        comparePrice: 2800,
        category: "kurti",
        subcategory: "daily-wear",
        fabric: "Cotton",
        care: "Hand wash in cold water",
        tags: ["kurti", "bandhani", "cotton", "daily-wear", "traditional"],
        images: [
            { url: "/photos/IMG_E1153.JPG", alt: "Terracotta Bandhani Kurti" },
            { url: "/photos/CXYQE8503.JPG", alt: "Bandhani Pattern" },
        ],
        variants: [
            { size: "S", stock: 12 }, { size: "M", stock: 18 },
            { size: "L", stock: 15 }, { size: "XL", stock: 8 }, { size: "XXL", stock: 4 },
        ],
        isFeatured: false, isNew: false, isBestseller: true,
        rating: 4.5, reviewCount: 234,
    },
    {
        id: "prod-010",
        name: "Sage Green Lounge Set",
        slug: "sage-green-lounge-set",
        description: "Ultra-comfortable sage green lounge wear set with relaxed fit kurta and wide-leg pants. Premium modal fabric that feels like a second skin. Perfect for work from home or relaxed weekends.",
        price: 2299,
        comparePrice: 3400,
        category: "lounge",
        subcategory: "daily-wear",
        fabric: "Modal",
        care: "Machine wash gentle",
        tags: ["lounge", "comfort", "modal", "daily-wear"],
        images: [
            { url: "/photos/IMG_8926.JPG", alt: "Sage Lounge Set" },
            { url: "/photos/IMG_E8948.JPG", alt: "Lounge Set Detail" },
        ],
        variants: [
            { size: "XS", stock: 8 }, { size: "S", stock: 14 },
            { size: "M", stock: 20 }, { size: "L", stock: 16 }, { size: "XL", stock: 10 },
        ],
        isFeatured: false, isNew: true, isBestseller: false,
        rating: 4.6, reviewCount: 92,
    },
    {
        id: "prod-011",
        name: "Gold Tissue Anarkali",
        slug: "gold-tissue-anarkali",
        description: "Opulent gold tissue anarkali with intricate cutdana and sequin embroidery. Lightweight tissue fabric gives an ethereal luminous look. Paired with churidar and dupatta with tassel edges.",
        price: 7499,
        comparePrice: 10999,
        category: "anarkali",
        subcategory: "bridal",
        fabric: "Tissue Silk",
        care: "Professional dry clean only",
        tags: ["anarkali", "bridal", "gold", "sequin", "wedding"],
        images: [
            { url: "/photos/IMG_E1193.JPG", alt: "Gold Tissue Anarkali" },
            { url: "/photos/IMG_E8538.JPG", alt: "Gold Anarkali Detail" },
        ],
        variants: [
            { size: "XS", stock: 2 }, { size: "S", stock: 4 },
            { size: "M", stock: 5 }, { size: "L", stock: 3 }, { size: "XL", stock: 2 },
        ],
        isFeatured: true, isNew: false, isBestseller: true,
        rating: 4.9, reviewCount: 156,
    },
    {
        id: "prod-012",
        name: "Lavender Lawn Suit",
        slug: "lavender-lawn-suit",
        description: "Breezy lavender lawn suit with a digital floral print. Features a long kurta with pintucks, matching straight pants and chiffon dupatta. Perfect for daytime events and casual gatherings.",
        price: 2999,
        comparePrice: 4500,
        category: "kurti-set",
        subcategory: "casual",
        fabric: "Lawn Cotton",
        care: "Machine wash gentle",
        tags: ["suit", "lawn", "casual", "floral", "pastel"],
        images: [
            { url: "/photos/IMG_E9732.JPG", alt: "Lavender Lawn Suit" },
            { url: "/photos/QLUF1062.JPG", alt: "Lavender Suit Detail" },
        ],
        variants: [
            { size: "S", stock: 9 }, { size: "M", stock: 14 },
            { size: "L", stock: 11 }, { size: "XL", stock: 6 }, { size: "XXL", stock: 3 },
        ],
        isFeatured: false, isNew: true, isBestseller: false,
        rating: 4.4, reviewCount: 73,
    },
];

export const CATEGORIES = [
    { id: "all", label: "All", slug: "all" },
    { id: "anarkali", label: "Anarkali", slug: "anarkali" },
    { id: "kurti-set", label: "Kurti Sets", slug: "kurti-set" },
    { id: "kurti", label: "Kurti", slug: "kurti" },
    { id: "kurti-dupatta", label: "Kurti + Dupatta", slug: "kurti-dupatta" },
    { id: "half-saree", label: "Half Saree", slug: "half-saree" },
    { id: "co-ord-set", label: "Co-ord Sets", slug: "co-ord-set" },
    { id: "ethnic-maxi", label: "Ethnic Maxi", slug: "ethnic-maxi" },
    { id: "skirt-set", label: "Skirt Sets", slug: "skirt-set" },
    { id: "lounge", label: "Lounge Wear", slug: "lounge" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Priya Sharma",
        city: "Mumbai",
        rating: 5,
        text: "Absolutely in love with my Saffron Anarkali! The fabric quality is divine and the embroidery is even more beautiful in person.",
        avatar: "/photos/IMG_E9732.JPG",
        product: "Saffron Chikankari Anarkali",
    },
    {
        id: 2,
        name: "Deepa Krishnan",
        city: "Chennai",
        rating: 5,
        text: "Ordered the Royal Purple Half Saree for my daughter's function. Got so many compliments! Will definitely order again.",
        avatar: "/photos/LOXT6771.JPG",
        product: "Royal Purple Half Saree",
    },
    {
        id: 3,
        name: "Ananya Gupta",
        city: "Delhi",
        rating: 5,
        text: "The packaging was so luxurious! The Ivory Silk Kurti Set is stunning. Fits perfectly and looks way more expensive than what I paid.",
        avatar: "/photos/NWKH5511.JPG",
        product: "Ivory Silk Kurti Set",
    },
    {
        id: 4,
        name: "Kavya Nair",
        city: "Bangalore",
        rating: 5,
        text: "Superfast delivery and the quality is exceptional! My Gold Tissue Anarkali was exactly as shown. 10/10 would recommend!",
        avatar: "/photos/OWRI2864.JPG",
        product: "Gold Tissue Anarkali",
    },
];
