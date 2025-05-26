import { useState } from "react";

export default function UploadMediaInline({ productId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      setLoading(true);
      const res = await fetch(
        "https://backendbanhang-production.up.railway.app/api/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Upload thành công");
        onUploaded?.(); // gọi lại load media
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("❌ Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
      >
        {loading ? "Đang tải..." : "Tải lên"}
      </button>
    </div>
  );
}
