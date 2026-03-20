import { WuiButtonColor } from "@wawawoom/wui";

export const labTypeToColor = (type: string): WuiButtonColor => {
  switch (type) {
    case "CSS":
      return WuiButtonColor.SUCCESS;

    case "CANVAS":
      return WuiButtonColor.INFO;

    default:
      return WuiButtonColor.PRIMARY;
  }
};
