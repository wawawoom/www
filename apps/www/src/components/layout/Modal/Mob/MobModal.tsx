import { WuiColorAlias, WuiText, WuiTextAs, WuiTextSize, WuiTitle, WuiTitleAs } from "@wawawoom/wui";

export const MobModal = () => {
  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} color={WuiColorAlias.NEUTRAL_0} style={{ marginTop: 0 }}>
        React Native developper
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0} size={WuiTextSize.S}>
        Ici
      </WuiText>
    </>
  );
}