import React, { useState } from "react";
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
  } = useProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={() => {
            setEditingProduct({ name: '', price: '', description: '' });
            setAddingNew(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Thêm sản phẩm
        </button>
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={(p) => {
          setEditingProduct(p);
          setAddingNew(false);
        }}
        onDelete={handleDelete}
      />

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
