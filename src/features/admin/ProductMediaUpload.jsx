// 📁 frontend/features/admin/ProductMediaManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@context/AuthContext";

export default function ProductMediaManager() {
  const { id } = useParams(); // 🆔 product_id
  const { token, user } = useAuth();
  const [mediaList, setMediaList] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await axios.get(`/api/media/product/${id}`);
      setMediaList(res.data);
    } catch (err) {
      toast.error("Không thể tải media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [id]);

  const uploadByUrl = async () => {
    if (!newUrl) return;
    setLoading(true);
    try {
      await axios.post(
        "/api/media/upload",
        { product_id: id, url: newUrl, is_main: false },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("✅ Upload ảnh từ URL thành công");
      setNewUrl("");
      fetchMedia();
    } catch (err) {
      toast.error("❌ Upload thất bại");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", id);

    setLoading(true);
    try {
      await axios.post("/api/media/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("✅ Upload file thành công");
      setFile(null);
      fetchMedia();
    } catch (err) {
      toast.error("❌ Upload file lỗi");
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (mediaId) => {
    if (!confirm("Bạn có chắc muốn xoá ảnh này?")) return;
    try {
      await axios.delete(`/api/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Đã xoá ảnh");
      fetchMedia();
    } catch (err) {
      toast.error("❌ Xoá ảnh lỗi");
    }
  };

  const setMain = async (mediaId) => {
    try {
      await axios.patch(
        `/api/media/${mediaId}/set-main`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("✅ Đã đặt ảnh chính");
      fetchMedia();
    } catch (err) {
      toast.error("❌ Không thể đặt ảnh chính");
    }
  };

  if (!user?.is_admin)
    return <div className="p-4">⛔ Không có quyền truy cập</div>;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">🖼️ Quản lý ảnh sản phẩm #{id}</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Dán URL ảnh..."
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={uploadByUrl}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tải từ URL
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={uploadFile}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Tải file
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediaList.map((img) => (
          <div
            key={img.id}
            className="relative group border rounded overflow-hidden"
          >
            <img
              src={img.url}
              alt="media"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2 space-y-1">
              <button
                onClick={() => deleteMedia(img.id)}
                className="text-white text-sm bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Xoá
              </button>
              {!img.is_main && (
                <button
                  onClick={() => setMain(img.id)}
                  className="text-white text-sm bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Đặt làm chính
                </button>
              )}
              {img.is_main && (
                <span className="text-xs text-green-300">Ảnh chính</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
