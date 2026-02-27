import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Unique ID for the cart item
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isCustomized: boolean; // Did they use the Customizer?
    modelName: string;
    customImageBase64?: string; // TBD or URL
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                set((state) => {
                    // If not custom and same product/model, just increase quantity
                    if (!item.isCustomized) {
                        const existing = state.items.find(
                            (i) => i.productId === item.productId && i.modelName === item.modelName && !i.isCustomized
                        );
                        if (existing) {
                            return {
                                items: state.items.map((i) =>
                                    i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
                                ),
                            };
                        }
                    }
                    return { items: [...state.items, item] };
                });
            },
            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },
            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
                }));
            },
            clearCart: () => set({ items: [] }),
            total: () => {
                const { items } = get();
                return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'seventech-cart',
        }
    )
);
