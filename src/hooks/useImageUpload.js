//useImageUpload.js
// === File: /src/hooks/useImageUpload.js ===
import { useState } from "react";
import axios from "axios";

export default function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadMultipleImages = async (files) => {
    const uploaded = [];
    setUploading(true);
    try {
      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // 🔁 sửa lại
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          formData,
        );
        uploaded.push(res.data.secure_url);
      }
    } catch (err) {
      alert("Lỗi khi upload ảnh");
    } finally {
      setUploading(false);
    }
    return uploaded;
  };

  return { uploading, uploadMultipleImages };
}
