
"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const currentImage = images[activeImage] || images[0];

  return (
    <div className="w-full min-w-0">

      {/* Main Image */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-white">
        <Image
          key={currentImage}
          src={currentImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setActiveImage(index)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeImage === index}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-white transition ${
                activeImage === index
                  ? "border-purple-600"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <Image
                src={image}
                alt={`${name} view ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
