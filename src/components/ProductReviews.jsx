import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { API } from "@services/api";
import toast from "react-hot-toast";

export default function ProductReviews({ productId }) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/products/${productId}/reviews`);
      const data = Array.isArray(res.data) ? res.data : [];
      setReviews(data);
    } catch (err) {
      console.error("Lỗi khi tải đánh giá:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Vui lòng nhập bình luận.");
      return;
    }

    try {
      await API.post(
        `/products/${productId}/reviews`,
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
      fetchReviews();
    } catch (err) {
      toast.error("Không thể gửi đánh giá.");
      console.error("❌ Lỗi gửi đánh giá:", err);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">
        {averageRating
          ? `Đánh giá sản phẩm (${averageRating} ∕ 5)`
          : "Đánh giá sản phẩm"}
      </h3>

      {reviews.length === 0 && (
        <p className="text-gray-500 mb-4">Chưa có đánh giá nào.</p>
      )}

      {Array.isArray(reviews) &&
        reviews.map((r, i) => (
          <div key={i} className="border-b py-2">
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>{idx < r.rating ? "★" : "☆"}</span>
              ))}
              <span className="text-gray-500 text-xs ml-2">
                {r.userName ?? "Ẩn danh"}
              </span>
            </div>
            <p className="text-gray-700">{r.comment}</p>
            <p className="text-xs text-gray-400">
              {r.created_at
                ? new Date(r.created_at).toLocaleDateString()
                : "Không rõ ngày"}
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
