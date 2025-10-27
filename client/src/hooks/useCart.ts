import { useState, useEffect } from "react";
import { CartItem, MenuItem } from "@shared/schema";

const CART_STORAGE_KEY = "meddys-cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (menuItem: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menuItemId === menuItem.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (menuItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItemId !== menuItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartItemCount,
    cartTotal,
  };
}
