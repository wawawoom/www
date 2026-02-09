import "./Gallery.css";
import type { GalleryProps } from "./Gallery.props";
import GalleryItem from "./GalleryItem/GalleryItem";

export const Gallery = (props: GalleryProps) => {
  const { items } = props;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="gallery">
      {items.map((item, i) => (
        <GalleryItem key={`galleryItem_${i}`} {...item} />
      ))}
    </div>
  );
};

export default Gallery;
