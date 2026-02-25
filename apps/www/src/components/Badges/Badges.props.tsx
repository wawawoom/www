import { WuiBadgeColor, WuiBadgeSize, WuiColorValue } from "@wawawoom/wui";

export interface BadgeProps {
  color: WuiBadgeColor;
  size: WuiBadgeSize;
  textColor: WuiColorValue;
  label: string;
}

export interface BadgesProps {
  badges: BadgeProps[];
}
