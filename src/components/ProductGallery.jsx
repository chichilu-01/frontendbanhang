//Hiển thị ảnh chính, thumbnails, fullscreen
import React from "react";

export default function ProductGallery({
  images = [],
  mainImage,
  setMainImage,
  showLightbox,
  setShowLightbox,
  name,
}) {
  return (
    <div className="group relative">
      <img
        src={mainImage}
        alt={name}
        onClick={() => setShowLightbox(true)}
        className="w-full h-[400px] object-cover rounded border cursor-zoom-in transition-transform duration-200 group-hover:scale-105"
      />

      {images?.length > 1 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              onClick={() => setMainImage(img)}
              className={`h-20 w-20 object-cover border rounded cursor-pointer transition-all duration-200 ${
                mainImage === img ? "ring-4 ring-blue-500 scale-105" : ""
              }`}
            />
          ))}
        </div>
      )}

      {showLightbox && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center cursor-zoom-out"
          onClick={() => setShowLightbox(false)}
        >
          <img
            src={mainImage}
            alt="Ảnh full"
            className="max-w-full max-h-full rounded"
          />
        </div>
      )}
    </div>
  );
}
