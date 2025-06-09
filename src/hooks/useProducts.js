import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "@services/productService";
import toast from "react-hot-toast";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);

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
    try {
      if (addingNew) {
        const res = await createProduct(product);
        setProducts((prev) => [...prev, res.data]);
        toast.success("Đã thêm sản phẩm mới");
        setAddingNew(false);
      } else {
        const res = await updateProduct(product.id, product);
        setProducts((prev) =>
          prev.map((p) => (p.id === res.data.id ? res.data : p)),
        );
        toast.success("Đã cập nhật sản phẩm");
      }
      setEditingProduct(null);
    } catch (error) {
      toast.error("Lỗi khi lưu sản phẩm");
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
