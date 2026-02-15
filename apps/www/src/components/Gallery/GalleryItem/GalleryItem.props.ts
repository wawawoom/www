import type { WuiColorAlias } from "@wawawoom/wui";

export interface GalleryItemProps {
  imgUrl: string;
  imgAlt: string;
  name?: string;
  onClick?: () => void;
  textColor?: WuiColorAlias;
}
