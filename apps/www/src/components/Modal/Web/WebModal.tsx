import { WuiColorAlias, WuiTitle, WuiTitleAs } from "@wawawoom/wui";

export const WebModal = () => {
  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} color={WuiColorAlias.NEUTRAL_0}>
        React developper
      </WuiTitle>
    </>
  );
}