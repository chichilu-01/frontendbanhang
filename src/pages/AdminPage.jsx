// 📁 src/pages/AdminPage.jsx
import React, { useState } from "react";
import useProducts from "@hooks/useProducts";
import EditProductModal from "@components/EditProductModal";
import ProductTable from "@components/ProductTable";
import ProductGrid from "@components/ProductGrid"; // ⭐ THÊM FILE NÀY

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
  } = useProducts();

  const [viewMode, setViewMode] = useState("grid"); // ⭐ mặc định dạng LƯỚI

  const handleAddNew = () => {
    setEditingProduct({
      id: null,
      name: "",
      price: "",
      stock: 0,
      description: "",
      image_url: "",
      gallery: [],
      media: [],
      sizes: [],
      colors: [],
    });

    setAddingNew(true);
  };

  return (
    <div className="p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        🧰 Quản lý kho hàng
      </h1>

      {/* TOP BAR */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-full sm:w-1/3 focus:ring focus:ring-blue-200"
        />

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Toggle View */}
          <button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow"
          >
            {viewMode === "table" ? "📦 Chế độ lưới" : "📋 Chế độ bảng"}
          </button>

          {/* Add New */}
          <button
            onClick={handleAddNew}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md flex items-center gap-2"
          >
            ➕ Thêm mới
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500 italic text-sm flex items-center gap-1">
          ⏳ Đang tải danh sách sản phẩm...
        </p>
      ) : viewMode === "table" ? (
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct({
              ...p,
              stock: p.stock ?? 0,
              gallery: Array.isArray(p.media) ? p.media.map((m) => m.url) : [],
            });
            setAddingNew(false);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <ProductGrid
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct({
              ...p,
              stock: p.stock ?? 0,
              gallery: Array.isArray(p.media) ? p.media.map((m) => m.url) : [],
            });
            setAddingNew(false);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* MODAL EDIT */}
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
