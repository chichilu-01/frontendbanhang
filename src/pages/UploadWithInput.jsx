import { useState } from "react";
import UploadMedia from "./UploadMedia.jsx";

function UploadWithInput() {
  const [productId, setProductId] = useState("");

  return (
    <div className="p-4">
      <input
        type="number"
        value={productId}
        placeholder="Nhập productId"
        onChange={(e) => setProductId(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {productId && <UploadMedia productId={productId} />}
    </div>
  );
}

export default UploadWithInput;
