import { WuiColorAlias, WuiText, WuiTextAs, WuiTextSize } from "@wawawoom/wui";

import "./GalleryItem.css";
import type { GalleryItemProps } from "./GalleryItem.props";

export const GalleryItem = (props: GalleryItemProps) => {
  const {
    imgUrl,
    imgAlt,
    name,
    onClick,
    textColor = WuiColorAlias.NEUTRAL_900,
  } = props;

  const componentName = "gallery-item";

  return (
    <div
      className={componentName}
      style={{ cursor: onClick ? "pointer" : "default" }}
      {...(onClick ? { onClick } : {})}
    >
      <img src={imgUrl} alt={imgAlt} className={`${componentName}-image`} />

      <WuiText
        as={WuiTextAs.DIV}
        size={WuiTextSize.S}
        className={`${componentName}-name`}
        color={textColor}
        style={{ lineHeight: 1.3 }}
      >
        {name}
      </WuiText>
    </div>
  );
};

export default GalleryItem;
