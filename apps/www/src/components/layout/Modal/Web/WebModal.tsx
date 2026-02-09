import {
  WuiColorAlias,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

export const WebModal = () => {
  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H3}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: 0 }}
      >
        Web developper
      </WuiTitle>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.S}
      >
        Ici
      </WuiText>
    </>
  );
};
