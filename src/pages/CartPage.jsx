// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "@context/CartContext";
import CartItem from "@components/CartItem";
import CartSummary from "@components/CartSummary";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (id, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
    } else {
      updateQuantity(id, size, color, quantity);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Giỏ hàng của bạn đang trống.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <CartSummary total={getCartTotal()} />
        </>
      )}
    </div>
  );
}
