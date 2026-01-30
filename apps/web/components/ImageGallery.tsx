export function ImageGallery({ images = [] }: { images?: string[] }) {
  if (!images.length) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {images.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt={`image ${idx + 1}`}
          className="w-full h-40 object-cover rounded border dark:border-gray-800"
        />
      ))}
    </div>
  );
}