import { useState } from "react";
import API from "@/api/axios";
import axios from "axios";

function UploadMedia({ productId }) {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");

  const handleUpload = async () => {
    if (!file || !productId) {
      alert("Vui lòng chọn file và nhập productId");
      return;
    }

    try {
      // 1. Upload lên Cloudinary
      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("upload_preset", "unsigned_upload"); // ✅ đúng preset

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/di3kcy96q/auto/upload",
        cloudForm,
      );

      const imageUrl = cloudRes.data.secure_url;

      // 2. Gửi URL về backend
      const res = await API.post("/products/upload", {
        product_id: productId,
        url: imageUrl,
        type: file.type.startsWith("image") ? "image" : "video",
      });

      setUploadResult("✅ Upload thành công: " + imageUrl);
    } catch (err) {
      const msg = err.response?.data?.error || "❌ Lỗi kết nối hoặc Cloudinary";
      setUploadResult(msg);
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto">
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
      {uploadResult && <p className="mt-2">{uploadResult}</p>}
    </div>
  );
}

export default UploadMedia;
