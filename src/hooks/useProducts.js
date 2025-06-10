import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
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
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock || 0),
      sizes:
        typeof product.sizes === "string"
          ? product.sizes.split(",").map((s) => s.trim())
          : product.sizes,
      colors:
        typeof product.colors === "string"
          ? product.colors.split(",").map((c) => c.trim())
          : product.colors,
      image: product.image || product.imageUrl || "",
    };

    try {
      if (addingNew) {
        const res = await createProduct(payload, token);
        setProducts((prev) => [...prev, res.data]);
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
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
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
