import type { GalleryItemProps } from "./GalleryItem.props";
import "./GalleryItem.css";
import { WuiText, WuiTextSize, WuiTextAs } from "@wawawoom/wui";

export const GalleryItem = (props: GalleryItemProps) => {
  const { imgUrl, imgAlt, name } = props;

  const componentName = "gallery-item";

  return (
    <div className={componentName}>
      <img
        src={imgUrl}
        alt={imgAlt}
        className={`${componentName}-image`}
      />

      <WuiText as={WuiTextAs.SPAN} size={WuiTextSize.S} className={`${componentName}-name`}>{name}</WuiText>
    </div>

  );
};

export default GalleryItem;