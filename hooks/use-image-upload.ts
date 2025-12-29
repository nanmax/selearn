"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
}

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (fileOrEvent: File | React.ChangeEvent<HTMLInputElement>) => {
      let file: File | undefined;

      if (fileOrEvent instanceof File) {
        file = fileOrEvent;
      } else {
        file = fileOrEvent.target.files?.[0];
      }

      if (!file) return;

      setFileName(file.name);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      previewRef.current = preview;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/upload-ktp", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onUpload?.(data.url);
      } else {
        console.error("Upload failed:", data.message);
        alert("Upload gagal, coba lagi.");
      }
    },
    [onUpload]
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
}
