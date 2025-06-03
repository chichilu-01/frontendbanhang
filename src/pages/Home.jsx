import React, { useEffect, useState } from "react";
import { getProducts } from "@services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sản phẩm mới nhất</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border rounded p-4 hover:shadow-md transition"
          >
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="font-semibold text-lg truncate">{product.name}</h2>
            <p className="text-blue-600 font-bold">
              {product.price.toLocaleString()}₫
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/*Gọi getProducts() khi load trang.
Hiển thị danh sách sản phẩm: ảnh, tên, giá, link đến chi tiết sản phẩm.*/
