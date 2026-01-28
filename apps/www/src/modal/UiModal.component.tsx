import { WuiColorAlias, WuiTitle, WuiTitleAs } from "@wawawoom/wui";

export const UiModal = () => {
  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} color={WuiColorAlias.NEUTRAL_900}>
        UI / UX designer
      </WuiTitle>
    </>
  );
}