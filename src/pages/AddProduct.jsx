import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(-1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      showToast("⚠️ Bạn không có quyền truy cập", "error");
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/products", form);
      const newId = res.data.id;
      setNewProductId(newId);
      showToast("✅ Đã thêm sản phẩm mới! Bây giờ hãy upload media");
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err.response?.data || err);
      showToast(
        err.response?.data?.error ||
          "❌ Không đủ quyền hoặc lỗi dữ liệu. Xem console để biết thêm.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSetMainImage = async (url) => {
    try {
      await API.put(`/api/products/${newProductId}/main-image`, { url });
      setMainImage(url);
      showToast("✅ Đã đặt ảnh đại diện cho sản phẩm");
    } catch (err) {
      showToast("❌ Lỗi khi đặt ảnh đại diện", "error");
      console.error(err);
    }
  };

  const handleDeleteMedia = async (url) => {
    try {
      await API.delete(`/api/products/${newProductId}/media`, {
        data: { url },
      });
      setMediaList((prev) => prev.filter((item) => item.url !== url));
      showToast("🗑️ Đã xoá media");
    } catch (err) {
      showToast("❌ Lỗi xoá media", "error");
    }
  };

  const handleReorderMedia = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === mediaList.length - 1)
    )
      return;
    const newList = [...mediaList];
    const [moved] = newList.splice(index, 1);
    newList.splice(direction === "up" ? index - 1 : index + 1, 0, moved);
    setMediaList(newList);
  };

  const handleUpload = async () => {
    if (!files.length)
      return showToast("Vui lòng chọn ít nhất 1 file", "error");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadingIndex(i);

      try {
        const cloudForm = new FormData();
        cloudForm.append("file", file);
        cloudForm.append("upload_preset", "unsigned_upload");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/di3kcy96q/auto/upload",
          cloudForm,
        );

        const imageUrl = cloudRes.data.secure_url;

        await API.post("/api/upload", {
          product_id: newProductId,
          url: imageUrl,
          type: file.type.startsWith("image") ? "image" : "video",
        });

        setMediaList((prev) => [...prev, { url: imageUrl, type: file.type }]);

        showToast(`✅ ${file.name} đã upload`);
        if (!mainImage && file.type.startsWith("image")) {
          handleSetMainImage(imageUrl);
        }
      } catch (err) {
        console.error(`❌ ${file.name}:`, err);
        showToast(`❌ Upload thất bại: ${file.name}`, "error");
      }
    }

    setUploadingIndex(-1);
    setFiles([]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl animate-fade-in">
      <h1 className="text-xl font-bold mb-4">➕ Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
      </form>

      {newProductId && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            📁 Tải lên ảnh hoặc video cho sản phẩm
          </h2>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="block border border-gray-300 rounded p-2"
          />
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

          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
              {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  {uploadingIndex === i && (
                    <span className="text-blue-600 animate-pulse">
                      Đang tải...
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {mediaList.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">📷 Media đã upload:</h3>
              <ul className="grid grid-cols-2 gap-4">
                {mediaList.map((item, index) => (
                  <li
                    key={index}
                    className="relative border rounded overflow-hidden"
                  >
                    {item.type.startsWith("image") ? (
                      <img
                        src={item.url}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-32 object-cover"
                        controls
                      />
                    )}
                    <div className="absolute top-1 right-1 flex gap-1">
                      <button
                        onClick={() => handleDeleteMedia(item.url)}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Xoá
                      </button>
                      <button
                        onClick={() => handleReorderMedia(index, "up")}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleReorderMedia(index, "down")}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleSetMainImage(item.url)}
                        className={`text-xs px-2 py-1 rounded ${
                          mainImage === item.url
                            ? "bg-green-500 text-white"
                            : "bg-blue-100"
                        }`}
                      >
                        {mainImage === item.url ? "✓ Chính" : "Đặt làm chính"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
