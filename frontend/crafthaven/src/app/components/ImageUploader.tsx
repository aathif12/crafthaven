"use client";

import { useState } from "react";

export default function ImageUploader({ productId }: { productId: number }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `http://localhost:8080/api/products/${productId}/upload-image`,
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await res.text();
    alert(text);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>
    </div>
  );
}
