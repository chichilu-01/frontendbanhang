// 📁 src/pages/AdminPage.jsx
import React from "react";
import useProducts from "@hooks/useProducts";
import EditProductModal from "@components/EditProductModal";
import ProductTable from "@components/ProductTable";

export default function AdminPage() {
  const {
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
    refetch,
  } = useProducts();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        🧰 Quản lý kho hàng
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="text"
          placeholder="🔍 Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-full sm:w-1/3 focus:ring focus:ring-blue-200"
        />

        <button
          onClick={() => {
            setEditingProduct({
              name: "",
              price: "",
              description: "",
              image_url: "",
              sizes: [],
              colors: [],
              stock: 0,
            });
            setAddingNew(true);
          }}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md flex items-center gap-2"
        >
          ➕ Thêm mới
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 italic text-sm flex items-center gap-1">
          ⏳ Đang tải danh sách sản phẩm...
        </p>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct(p);
            setAddingNew(false);
          }}
          onDelete={handleDelete}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => {
            setEditingProduct(null);
            setAddingNew(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

console.log("✅ AdminPage mounted");
