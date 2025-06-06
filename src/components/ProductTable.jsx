import React from "react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Không có sản phẩm nào
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-2 border text-center">{i + 1}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.price?.toLocaleString()}₫</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    onClick={() => onEdit(p)}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
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

/* component hiển thị bảng danh sách sản phẩm */
