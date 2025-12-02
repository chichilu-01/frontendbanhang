import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { API } from "@services/api";
import toast from "react-hot-toast";

// ⭐ Component render sao (có half-star)
function StarRating({ value, size = 18 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array(full)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`} style={{ fontSize: size }}>
            ★
          </span>
        ))}

      {half === 1 && (
        <span style={{ fontSize: size, color: "#fbbf24" }}>⯨</span> // half star icon
      )}

      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <span
            key={`empty-${i}`}
            style={{ fontSize: size }}
            className="text-gray-300"
          >
            ☆
          </span>
        ))}
    </div>
  );
}

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
        { headers: { Authorization: `Bearer ${token}` } },
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

  // ⭐ Tính trung bình rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, cur) => acc + Number(cur.rating), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-10 p-4 bg-white rounded-xl shadow">
      {/* =================== HEADER =================== */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          Đánh giá sản phẩm
          {averageRating && (
            <span className="text-yellow-500 text-lg font-bold">
              {averageRating}/5
            </span>
          )}
        </h3>

        {averageRating && (
          <StarRating value={Number(averageRating)} size={20} />
        )}
      </div>

      {/* =================== LIST REVIEWS =================== */}
      {reviews.length === 0 && (
        <p className="text-gray-500 mb-4">Chưa có đánh giá nào.</p>
      )}

      {reviews.map((r, i) => (
        <div
          key={i}
          className="border-b py-4 flex flex-col gap-1 bg-gray-50 rounded-lg px-3 mb-3"
        >
          {/* ⭐ Rating */}
          <div className="flex items-center gap-2">
            <StarRating value={r.rating} />
            <span className="text-gray-500 text-xs ml-1">
              {r.userName ?? "Ẩn danh"}
            </span>
          </div>

          {/* 💬 Comment */}
          <p className="text-gray-700">{r.comment}</p>

          {/* 🕒 Date */}
          <p className="text-xs text-gray-400">
            {r.created_at
              ? new Date(r.created_at).toLocaleDateString()
              : "Không rõ ngày"}
          </p>
        </div>
      ))}

      {/* =================== FORM USER =================== */}
      {user ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Đánh giá của bạn
            </label>
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

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Gửi đánh giá
          </button>
        </form>
      ) : (
        <p className="text-gray-500 mt-4 italic">
          * Bạn cần đăng nhập để gửi đánh giá.
        </p>
      )}
    </div>
  );
}
