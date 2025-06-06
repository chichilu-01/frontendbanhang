export default function ProductGallery({
  images = [],
  mainImage,
  setMainImage,
  showLightbox,
  setShowLightbox,
  name,
  onDeleteImage, // optional
  editable = false, // nếu true thì cho phép xoá ảnh
}) {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <div className="group relative">
      <img
        src={mainImage}
        alt={name}
        onClick={() => setShowLightbox(true)}
        className="w-full h-[400px] object-cover rounded border cursor-zoom-in transition-transform duration-200 group-hover:scale-105"
      />

      {safeImages.length > 1 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {safeImages.map((img, index) => {
            const url = typeof img === "string" ? img : img.url;
            return (
              <div key={url || index} className="relative">
                <img
                  src={url}
                  alt={`thumb-${index}`}
                  onClick={() => setMainImage(url)}
                  className={`h-20 w-20 object-cover border rounded cursor-pointer transition-all duration-200 ${
                    mainImage === url ? "ring-4 ring-blue-500 scale-105" : ""
                  }`}
                />
                {editable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeleteImage) onDeleteImage(img);
                    }}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
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
