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
          {products.map((p, i) => (
            <tr key={p.id} className="border-t">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price.toLocaleString()}₫</td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-white rounded"
                  onClick={() => onEdit(p)}
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => onDelete(p.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*component hiển thị bảng danh sách sản phẩm*/
