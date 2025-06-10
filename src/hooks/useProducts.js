import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  createMedia,
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      toast.error("Lỗi tải danh sách sản phẩm");
      console.error("❌ Lỗi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product) => {
    if (!product || (!addingNew && !product.id)) {
      toast.error("Thiếu thông tin sản phẩm (id không hợp lệ)");
      return;
    }

    console.log("💾 Đang lưu sản phẩm:", product);

    const payload = {
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      stock: parseInt(product.stock || 0),
      image_url: product.image_url || product.imageUrl || "",
      sizes:
        typeof product.sizes === "string"
          ? product.sizes.split(",").map((s) => s.trim())
          : product.sizes || [],
      colors:
        typeof product.colors === "string"
          ? product.colors.split(",").map((c) => c.trim())
          : product.colors || [],
    };

    try {
      if (addingNew) {
        const res = await createProduct(payload, token);
        const newProduct = res.data;
        if (!newProduct?.id)
          throw new Error("API không trả về sản phẩm hợp lệ");

        // Gửi ảnh gallery nếu có
        if (product.gallery && Array.isArray(product.gallery)) {
          await Promise.all(
            product.gallery.map((url) =>
              createMedia({ product_id: newProduct.id, url }, token),
            ),
          );
        }

        setProducts((prev) => [...prev, newProduct]);
        toast.success("Đã thêm sản phẩm mới");
        setAddingNew(false);
      } else {
        const res = await updateProduct(product.id, payload, token);
        setProducts((prev) =>
          prev.map((p) => (p.id === res.data.id ? res.data : p)),
        );
        toast.success("Đã cập nhật sản phẩm");
      }
      setEditingProduct(null);
    } catch (error) {
      toast.error("Lỗi khi lưu sản phẩm");
      console.error("❌ Lỗi lưu:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Đã xoá sản phẩm");
    } catch (err) {
      toast.error("Lỗi xoá sản phẩm");
      console.error("❌ Lỗi xoá:", err);
    }
  };

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
