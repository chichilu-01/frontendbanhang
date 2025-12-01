import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  createMedia,
  API,
} from "@services/api";
import { useAuth } from "@context/AuthContext";
import toast from "react-hot-toast";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  // 📌 Load danh sách sản phẩm + media thật từ Cloudinary
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      const data = res.data;

      const withMedia = await Promise.all(
        data.map(async (p) => {
          try {
            const mediaRes = await API.get(`/media/product/${p.id}`);
            const media = mediaRes.data || [];

            return {
              ...p,
              media,
              image_url: p.image_url || media[0]?.url || "",
            };
          } catch {
            return { ...p, media: [] };
          }
        }),
      );

      setProducts(withMedia);
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err);
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📌 Lưu hoặc thêm sản phẩm
  const handleSave = async (product) => {
    try {
      const payload = {
        name: product.name,
        price: parseFloat(product.price),
        description: product.description || "",
        stock: parseInt(product.stock || 0),
        image_url: product.image_url || "",
        sizes: Array.isArray(product.sizes)
          ? product.sizes
          : (product.sizes || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),

        colors: Array.isArray(product.colors)
          ? product.colors
          : (product.colors || "")
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean),
      };

      // /////////////////////////////////////////////////////
      // 1️⃣ THÊM MỚI
      // /////////////////////////////////////////////////////
      if (addingNew) {
        const res = await createProduct(payload, token);
        const newProduct = res.data;

        if (!newProduct?.id) {
          toast.error("Không tạo được sản phẩm mới");
          return;
        }

        // Thêm ảnh gallery
        if (product.gallery && product.gallery.length > 0) {
          await Promise.all(
            product.gallery.map((url) =>
              createMedia(
                {
                  product_id: newProduct.id,
                  url,
                  is_main: url === product.image_url ? 1 : 0,
                },
                token,
              ),
            ),
          );
        }

        toast.success("🎉 Đã thêm sản phẩm mới");
        fetchProducts();
        setEditingProduct(null);
        setAddingNew(false);
        return;
      }

      // /////////////////////////////////////////////////////
      // 2️⃣ UPDATE SẢN PHẨM
      // /////////////////////////////////////////////////////
      if (!product.id) {
        toast.error("Thiếu ID sản phẩm, không thể cập nhật");
        return;
      }

      const res = await updateProduct(product.id, payload, token);

      // update state nhanh mà không cần gọi API
      setProducts((prev) =>
        prev.map((p) => (p.id === res.data.id ? res.data : p)),
      );

      toast.success("💾 Đã cập nhật sản phẩm");
      setEditingProduct(null);
    } catch (err) {
      console.error("❌ Lỗi lưu sản phẩm:", err);
      toast.error("Không thể lưu sản phẩm");
    }
  };

  // 📌 Xoá sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc muốn xoá?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("🗑️ Đã xoá sản phẩm");
    } catch (err) {
      toast.error("Xoá thất bại");
    }
  };

  // 📌 Tìm kiếm
  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  return {
    products,
    search,
    setSearch,
    filteredProducts,
    editingProduct,
    setEditingProduct,
    addingNew,
    setAddingNew,
    handleSave,
    handleDelete,
    loading,
    refetch: fetchProducts,
  };
}
