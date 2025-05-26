import { useState } from "react";

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

      try {
        const res = await fetch(
          "https://backendbanhang-production.up.railway.app/api/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();

        if (res.ok) {
          console.log("✅ Upload thành công:", file.name);
          onUploaded?.(); // reload media sau mỗi file
        } else {
          alert(`❌ ${file.name}: ${data.error}`);
        }
      } catch (err) {
        alert(`❌ ${file.name}: Lỗi kết nối server`);
      }
    }

    setUploading(false);
    setFiles([]); // reset sau khi upload xong
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
