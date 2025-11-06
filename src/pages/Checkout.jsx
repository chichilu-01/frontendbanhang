// 📄 src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "@context/CartContext";
import { CreditCard, Truck, MapPin, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

// ✅ Hàm format tiền kiểu Việt Nam
const formatVND = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(num)
    .replace("₫", "₫");
};

export default function Checkout() {
  const { cartItems, getCartTotal } = useCart();
  const total = getCartTotal();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.email)
      return toast.error("Vui lòng nhập đầy đủ thông tin giao hàng!");

    if (cartItems.length === 0)
      return toast.error("Giỏ hàng của bạn đang trống!");

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        payment: form.payment,
        items: cartItems.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          selectedSize: it.selectedSize,
          selectedColor: it.selectedColor,
        })),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        payload,
      );

      if (res.data.success) {
        toast.success("🎉 Đặt hàng thành công! Email xác nhận đã gửi tới bạn.");
        setOrderPlaced(true);
        localStorage.removeItem("cartItems");
      } else {
        toast.error("Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Không thể gửi đơn hàng, thử lại sau.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Sau khi đặt hàng
  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <CheckCircle2
          size={64}
          className="text-green-500 mx-auto mb-4 animate-bounce"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cảm ơn bạn đã mua hàng 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Đơn hàng của bạn đã được ghi nhận. Chúng tôi đã gửi email xác nhận!
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🏠 Về trang chủ
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* Cột trái */}
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 bg-white rounded-2xl shadow-md border p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          <MapPin className="inline-block mr-2 text-blue-600" />
          Thông tin giao hàng
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="0901 234 567"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
              rows={3}
              required
            />
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phương thức thanh toán
            </label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:ring-2 hover:ring-blue-400 transition">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />
                <Truck size={18} className="text-blue-600" />
                <span>Thanh toán khi nhận hàng</span>
              </label>
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:ring-2 hover:ring-blue-400 transition">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                />
                <CreditCard size={18} className="text-blue-600" />
                <span>Thẻ / Ví điện tử</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-6 w-full bg-blue-600 text-white text-lg py-3 rounded-xl font-semibold hover:bg-blue-700 transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Đang xử lý..." : "🛒 Xác nhận đặt hàng"}
        </button>
      </form>

      {/* ✅ Cột phải: tóm tắt đơn hàng */}
      <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tóm tắt đơn hàng
        </h2>

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-gray-700 mb-2"
          >
            <span>
              {item.name}{" "}
              <span className="text-gray-500 text-sm">
                ({item.selectedSize}/{item.selectedColor})
              </span>
            </span>
            <span>{formatVND(item.price * item.quantity)}</span>
          </div>
        ))}

        <hr className="my-3 border-gray-200" />

        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
          <span>Tổng cộng</span>
          <span className="text-blue-600 text-2xl">{formatVND(total)}</span>
        </div>

        <p className="text-sm text-gray-500 text-center">
          * Đơn hàng sẽ được xử lý và xác nhận qua email trong 24h
        </p>
      </div>
    </div>
  );
}
