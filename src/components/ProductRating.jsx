
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function ProductRating({ productId }) {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [productId]);

  const fetchRatings = async () => {
    try {
      // Thử nhiều endpoint để tải đánh giá
      let response;
      try {
        response = await API.get(`/products/${productId}/ratings`);
      } catch (firstError) {
        // Thử endpoint khác
        response = await API.get(`/ratings/product/${productId}`);
      }
      
      const ratingsData = response.data || [];
      setRatings(ratingsData);
      
      // Tính điểm trung bình
      if (ratingsData.length > 0) {
        const avg = ratingsData.reduce((sum, rating) => sum + rating.rating, 0) / ratingsData.length;
        setAverageRating(Math.round(avg * 10) / 10);
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
      setRatings([]);
      setAverageRating(0);
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá");
      return;
    }
    
    if (userRating === 0) {
      alert("Vui lòng chọn số sao");
      return;
    }

    if (comment.trim().length < 5) {
      alert("Vui lòng viết nhận xét ít nhất 5 ký tự");
      return;
    }

    setLoading(true);
    try {
      // Thử gửi đánh giá với nhiều endpoint khác nhau
      let response;
      try {
        response = await API.post(`/products/${productId}/ratings`, {
          rating: userRating,
          comment: comment.trim()
        });
      } catch (firstError) {
        // Thử endpoint khác nếu lỗi
        response = await API.post(`/ratings`, {
          product_id: productId,
          rating: userRating,
          comment: comment.trim()
        });
      }
      
      // Hiệu ứng thông báo đẹp hơn
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce";
      notification.textContent = "✅ Đánh giá thành công!";
      document.body.appendChild(notification);

      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
      
      setUserRating(0);
      setComment("");
      setHoverRating(0);
      fetchRatings();
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      
      // Hiển thị lỗi chi tiết hơn
      const errorMsg = error.response?.data?.message || error.response?.data?.error || "Lỗi kết nối server";
      alert(`❌ ${errorMsg}. Vui lòng thử lại!`);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null, hoverRating = 0) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = interactive ? (hoverRating >= star || (!hoverRating && rating >= star)) : (rating >= star);
          
          return (
            <button
              key={star}
              type="button"
              onClick={() => interactive && onStarClick && onStarClick(star)}
              className={`text-2xl transition-all duration-200 ${
                isActive ? "text-yellow-400 scale-110" : "text-gray-300"
              } ${interactive ? "hover:text-yellow-400 hover:scale-110 cursor-pointer" : ""}`}
              disabled={!interactive}
            >
              ⭐
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          ⭐ Đánh giá sản phẩm
        </h2>
        {ratings.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-semibold text-gray-700">
                {averageRating}/5
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({ratings.length} đánh giá)
            </span>
          </div>
        )}
      </div>

      {/* Form đánh giá cho user đã đăng nhập */}
      {user && (
        <form onSubmit={handleSubmitRating} className="mb-8 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold mb-4 text-blue-800">Viết đánh giá của bạn</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Số sao:</label>
            <div 
              onMouseLeave={() => setHoverRating(0)}
              className="inline-block"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = hoverRating >= star || (!hoverRating && userRating >= star);
                  
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className={`text-3xl transition-all duration-200 transform ${
                        isActive ? "text-yellow-400 scale-110" : "text-gray-300"
                      } hover:text-yellow-400 hover:scale-110 cursor-pointer`}
                    >
                      ⭐
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {hoverRating > 0 ? `${hoverRating} sao` : (userRating > 0 ? `Đã chọn ${userRating} sao` : "Chọn số sao")}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nhận xét:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading || userRating === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
          >
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      )}

      {/* Hiển thị danh sách đánh giá */}
      <div className="space-y-4">
        {ratings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Chưa có đánh giá nào. {user ? "Hãy là người đầu tiên đánh giá!" : "Đăng nhập để đánh giá sản phẩm."}
          </p>
        ) : (
          ratings.map((rating) => (
            <div key={rating.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {rating.user_name ? rating.user_name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {rating.user_name || "Người dùng"}
                    </p>
                    <div className="flex items-center gap-2">
                      {renderStars(rating.rating)}
                      <span className="text-sm text-gray-500">
                        {new Date(rating.created_at).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {rating.comment && (
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {rating.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
