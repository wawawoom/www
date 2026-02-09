import { WuiText, WuiTextAs, WuiTextSize } from "@wawawoom/wui";

import "./GalleryItem.css";
import type { GalleryItemProps } from "./GalleryItem.props";

export const GalleryItem = (props: GalleryItemProps) => {
  const { imgUrl, imgAlt, name, onClick } = props;

  const componentName = "gallery-item";

  return (
    <div
      className={componentName}
      style={{ cursor: onClick ? "pointer" : "default" }}
      {...(onClick ? { onClick } : {})}
    >
      <img src={imgUrl} alt={imgAlt} className={`${componentName}-image`} />

      <WuiText
        as={WuiTextAs.SPAN}
        size={WuiTextSize.S}
        className={`${componentName}-name`}
      >
        {name}
      </WuiText>
    </div>
  );
};

export default GalleryItem;
