import { useState } from "react";
import API from "@/api/axios";

function UploadMedia({ productId }) {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file || !productId) {
      alert("Vui lòng chọn file và nhập productId");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);
    formData.append("type", file.type.startsWith("image") ? "image" : "video");

    try {
      const res = await API.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadResult("✅ Upload thành công: " + res.data.url);
      setShowSuccess(true);

      // Tự động ẩn sau 3 giây
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      const msg = err.response?.data?.error || "❌ Lỗi kết nối server";
      setUploadResult(msg);
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto relative">
      <h2 className="text-lg font-semibold mb-2">Upload ảnh hoặc video</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tải lên
      </button>

      {uploadResult && <p className="mt-2 text-sm">{uploadResult}</p>}

      {/* ✅ Modal nổi khi thành công */}
      {showSuccess && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out z-10">
          ✅ Đã upload thành công
        </div>
      )}
    </div>
  );
}

export default UploadMedia;
