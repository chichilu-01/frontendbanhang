import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductReviews({ productId }) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Lỗi khi tải đánh giá:", err);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/products/${productId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Gửi đánh giá thành công!");
      setComment("");
      setRating(5);
      const res = await axios.get(`/api/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Không thể gửi đánh giá.");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>

      {reviews.length === 0 && (
        <p className="text-gray-500 mb-4">Chưa có đánh giá nào.</p>
      )}
      {reviews.map((r, i) => (
        <div key={i} className="border-b py-2">
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx}>{idx < r.rating ? "★" : "☆"}</span>
            ))}
            <span className="text-gray-500 text-xs ml-2">{r.userName}</span>
          </div>
          <p className="text-gray-700">{r.comment}</p>
          <p className="text-xs text-gray-400">
            {new Date(r.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Đánh giá</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} sao
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bình luận</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Gửi đánh giá
          </button>
        </form>
      )}
    </div>
  );
}
