import type { GalleryProps } from "./Gallery.props";
import GalleryItem from "./GalleryItem/GalleryItem";
import "./Gallery.css";

export const Gallery = (props: GalleryProps) => {
  const { items } = props;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="gallery">
      {items.map((item) => (
        <GalleryItem key={item.name} imgAlt={item.name} imgUrl={item.imgUrl} name={item.name} />
      ))}
    </div>
  );
};

export default Gallery;