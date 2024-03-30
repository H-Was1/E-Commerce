"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Props {
  disabled?: boolean;
  onchange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({ disabled, onchange, onRemove, value }: Props) => {
  const [IsMounted, setIsMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onchange(result.info.secure_url);
  };

  if (!IsMounted) return null;
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 ring-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url}></Image>
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="wgs1dcxp">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
