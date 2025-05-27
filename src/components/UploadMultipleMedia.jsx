import { useState } from "react";
import API from "@/api/axios";
import axios from "axios";

export default function UploadMultipleMedia({ productId, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!files.length) return alert("Vui lòng chọn ít nhất 1 file");
    setUploading(true);

    for (const file of files) {
      try {
        // 1. Upload lên Cloudinary
        const cloudForm = new FormData();
        cloudForm.append("file", file);
        cloudForm.append("upload_preset", "unsigned_upload");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/di3kcy96q/auto/upload",
          cloudForm,
        );

        const imageUrl = cloudRes.data.secure_url;

        // 2. Gửi URL về backend
        await API.post("/products/upload", {
          product_id: productId,
          url: imageUrl,
          type: file.type.startsWith("image") ? "image" : "video",
        });

        console.log("✅ Upload thành công:", file.name);
        onUploaded?.(); // reload media nếu có
      } catch (err) {
        console.error(`❌ ${file.name}:`, err);
        alert(`❌ Lỗi upload ${file.name}`);
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
