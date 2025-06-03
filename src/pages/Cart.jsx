import React from "react";
import { useCart } from "@context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  Giá: {item.price.toLocaleString()}₫ × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                Xoá
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Tổng cộng: {total.toLocaleString()}₫
          </div>
        </div>
      )}
    </div>
  );
}

/*Hiển thị danh sách sản phẩm đã thêm.
Tính tổng tiền, cho phép xoá từng món.*/
