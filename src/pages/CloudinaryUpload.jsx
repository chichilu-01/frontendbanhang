import { useState } from "react";
import API from "@/api/axios";

export default function CloudinaryUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn file trước");
    setUploading(true);
    setResult("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.secure_url) {
        setResult(`✅ Upload thành công: ${data.secure_url}`);
      } else {
        setResult("❌ Upload thất bại");
      }
    } catch (err) {
      setResult("❌ Lỗi kết nối đến Cloudinary");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4">☁️ Upload ảnh lên Cloudinary</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {preview && <img src={preview} alt="preview" className="mb-4 rounded" />}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="btn-primary w-full"
      >
        {uploading ? "Đang tải lên..." : "Tải lên"}
      </button>
      {result && <p className="mt-4 text-sm text-center">{result}</p>}
    </div>
  );
}
