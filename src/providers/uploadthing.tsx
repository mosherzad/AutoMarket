"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-toastify";

interface UploadThingButtonProps {
  currentImages: string[]; // already uploaded URLs
  onUploaded: (urls: string[]) => void;
  maxImages: number;
}

export function UploadThingButton({
  currentImages,
  onUploaded,
  maxImages,
}: UploadThingButtonProps) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const newUrls = res.map((file) => file.url);
        const total = currentImages.length + newUrls.length;

        if (total > maxImages) {
          toast.error(`You can only upload ${maxImages} images in total`);
          return;
        }

        onUploaded([...currentImages, ...newUrls]);
      }}
      onUploadError={(err) => {
        toast.error(`Upload Failed: ${err.message}`);
      }}
      disabled={currentImages.length >= maxImages}
    />
  );
}
