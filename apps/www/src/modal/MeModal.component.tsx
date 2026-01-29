import {
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
  loremIpsum,
} from "@wawawoom/wui";
import { WuiColorAlias } from "@wawawoom/wui";

export const MeModal = () => {
  return (
    <>
      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginBottom: 0 }}
      >
        Nicolas Payrouse
      </WuiTitle>

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H5}
        color={WuiColorAlias.SUCCESS_900}
        style={{ marginBottom: "2rem" }}
      >
        Web Designer & Développeur front-end
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XXL}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall asleep
        thinking about my next UX challenge.
      </WuiText>
      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        {loremIpsum(200)}
      </WuiText>
    </>
  );
};
