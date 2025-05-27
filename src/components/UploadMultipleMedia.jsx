import { useState } from "react";
import axios from "axios";

export default function UploadMultipleMedia({ productId, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!files.length) return alert("Vui lòng chọn ít nhất 1 file");

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("product_id", productId);
      formData.append(
        "type",
        file.type.startsWith("image") ? "image" : "video",
      );

      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "https://backendbanhang-production.up.railway.app/products/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log("✅ Upload thành công:", file.name);
        onUploaded?.(); // reload media
      } catch (err) {
        const msg = err.response?.data?.error || "Lỗi kết nối server";
        alert(`❌ ${file.name}: ${msg}`);
      }
    }

    setUploading(false);
    setFiles([]);
  };

  return (
    <div className="mt-2">
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
      >
        {uploading ? "Đang tải lên..." : "Tải lên tất cả"}
      </button>

      {files.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
          {files.map((file, i) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
