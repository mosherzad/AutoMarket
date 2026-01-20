"use client";
import Image from "next/image";
import { useState } from "react";

interface CarGalleryProps {
  images: string[];
}

export default function CarGallery({ images }: CarGalleryProps) {
  const [active, setActive] = useState(images[0] || "/images/placeholder.jpg");

  if (!images || images.length === 0) {
    return (
      <div className="w-full md:w-1/2 space-y-4 bg-white p-3 rounded-xl">
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
          <Image
            src="/images/placeholder.jpg"
            alt="No image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 space-y-4 bg-white p-3 rounded-xl max-h-131">
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl">
        <Image
          src={active}
          alt="Car image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActive(img)}
            className={`relative min-w-24 h-20 rounded-md overflow-hidden border 
                ${active === img ? "border-primary" : "border-transparent"}
              `}
          >
            <Image src={img} alt="Thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
