import { WuiColorAlias, WuiText, WuiTextAs, WuiTextSize, WuiTitle, WuiTitleAs, WuiTitleLook } from "@wawawoom/wui";

export const UiModal = () => {
  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H3} color={WuiColorAlias.NEUTRAL_900} style={{ marginTop: 0 }}>
        UI / UX designer
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900} size={WuiTextSize.S}>
        Ici
      </WuiText>
    </>
  );
}