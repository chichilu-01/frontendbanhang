import { useState } from "react";
import API from "@/api/axios";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadMultipleMedia({ productId, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(-1);

  const handleUpload = async () => {
    if (!files.length) return toast.error("Vui lòng chọn ít nhất 1 file");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadingIndex(i);

      try {
        // 1. Upload lên Cloudinary
        const cloudForm = new FormData();
        cloudForm.append("file", file);
        cloudForm.append("upload_preset", "unsigned_upload"); // tên preset

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/di3kcy96q/auto/upload",
          cloudForm,
        );

        const imageUrl = cloudRes.data.secure_url;

        // 2. Gửi URL về backend
        await API.post("/api/upload", {
          product_id: productId,
          url: imageUrl,
          type: file.type.startsWith("image") ? "image" : "video",
        });

        toast.success(`✅ ${file.name} đã upload`);
      } catch (err) {
        console.error(`❌ ${file.name}:`, err);
        toast.error(`❌ Upload thất bại: ${file.name}`);
      }
    }

    setUploadingIndex(-1);
    setFiles([]);
    onUploaded?.(); // Reload media
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        className="block border border-gray-300 rounded p-2"
      />

      {files.length > 0 && (
        <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
          {files.map((file, i) => (
            <li key={i} className="flex items-center justify-between">
              <span>{file.name}</span>
              {uploadingIndex === i && (
                <span className="text-blue-600 animate-pulse">Đang tải...</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleUpload}
        disabled={uploadingIndex !== -1}
        className={`mt-3 px-4 py-2 rounded text-white ${
          uploadingIndex !== -1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploadingIndex !== -1 ? "Đang tải..." : "Tải lên tất cả"}
      </button>
    </div>
  );
}
