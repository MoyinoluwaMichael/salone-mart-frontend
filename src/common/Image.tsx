import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

interface ImageProps {
  className?: string; // For CSS class names
  style?: React.CSSProperties; // For inline styles
  images: string; // Renamed to imageSrc for clarity
}

const Image = ({ className, style, images }: ImageProps) => {
  return (
    <div>
      <LazyLoadImage
        src={images}
        className={className}
        style={style}
        alt="Image Alt"
      />
    </div>
  );
};

export default Image;