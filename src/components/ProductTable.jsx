import React from "react";

export default function ProductTable({ products, onEdit, onDelete }) {
  const safeProducts = Array.isArray(products) ? products : [];
  const formatVND = (value) => {
    const num = Number(value) || 0;
    return num.toLocaleString("vi-VN") + "₫";
  };


  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border border-gray-300">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-2 border text-center">#</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border text-right">Giá</th>
            <th className="p-2 border text-center">Tồn kho</th> {/* ⭐ NEW */}
            <th className="p-2 border text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {safeProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Không có sản phẩm nào
              </td>
            </tr>
          ) : (
            safeProducts.map((p, i) => (
              <tr
                key={p.id || i}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-2 border text-center">{i + 1}</td>

                <td className="p-2 border flex items-center gap-2">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      className="w-10 h-10 rounded object-cover border"
                    />
                  )}
                  {p.name}
                </td>

                <td className="p-2 border text-right">
                  {formatVND(p.price)}
                </td>

                {/* ⭐ HIỂN THỊ TỒN KHO */}
                <td className="p-2 border text-center font-semibold">
                  {p.stock ?? 0}
                </td>

                {/* Actions */}
                <td className="p-2 border text-center space-x-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => onEdit(p)}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => onDelete(p.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
