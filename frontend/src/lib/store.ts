import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/data";
import toast from "react-hot-toast";

export interface CartItem {
    id: string;
    product: Product;
    size: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, size: string, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, size, quantity = 1) => {
                const items = get().items;
                const existingId = `${product.id}-${size}`;
                const existing = items.find((i) => i.id === existingId);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.id === existingId
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        ),
                    });
                    toast.success("Quantity updated in cart!");
                } else {
                    set({
                        items: [...items, { id: existingId, product, size, quantity }],
                    });
                    toast.success("Added to cart!");
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
                toast.success("Removed from cart");
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotalPrice: () =>
                get().items.reduce(
                    (sum, i) => sum + i.product.price * i.quantity,
                    0
                ),
            getTotalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),
        }),
        { name: "aura-india-cart" }
    )
);

interface WishlistStore {
    items: Product[];
    toggle: (product: Product) => void;
    isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            toggle: (product) => {
                const exists = get().items.find((i) => i.id === product.id);
                if (exists) {
                    set({ items: get().items.filter((i) => i.id !== product.id) });
                    toast.success("Removed from wishlist");
                } else {
                    set({ items: [...get().items, product] });
                    toast.success("Added to wishlist ♡");
                }
            },
            isWishlisted: (id) => !!get().items.find((i) => i.id === id),
        }),
        { name: "aura-india-wishlist" }
    )
);

interface AuthStore {
    user: { name: string; email: string } | null;
    login: (name: string, email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            login: (name, email) => {
                set({ user: { name, email } });
                toast.success(`Welcome back, ${name}!`);
            },
            logout: () => {
                set({ user: null });
                toast.success("Logged out successfully");
            },
        }),
        { name: "aura-india-auth" }
    )
);
