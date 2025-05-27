import { useState } from "react";

function UploadMedia({ productId }) {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");

  const handleUpload = async () => {
    if (!file || !productId) {
      alert("Vui lòng chọn file và nhập productId");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      const res = await fetch(
        "https://backendbanhang-production.up.railway.app/products/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (res.ok) {
        setUploadResult("✅ Upload thành công: " + data.url);
      } else {
        setUploadResult("❌ Lỗi: " + data.error);
      }
    } catch (err) {
      setUploadResult("❌ Lỗi kết nối server");
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
