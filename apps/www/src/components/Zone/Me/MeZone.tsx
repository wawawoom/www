import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../../ts/enum/section.enum";
import "./MeZone.css";

export const MeZone = (props: { onOpenModal: (section: Section) => void }) => {
  const { onOpenModal } = props;

  return (
    <>
      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        Nicolas Payrouse
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        I eat JavaScript for breakfast, savor UI for lunch, and fall asleep
        thinking about my next UX challenge.
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>UI</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>UX</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>JavaScript</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>Typescript</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>HTML</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>CSS</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>NextJs</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>React</WuiBadge>
        <WuiBadge color={WuiBadgeColor.TRANSPARENT} size={WuiBadgeSize.M}>React Native</WuiBadge>
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XS}>
        📍 357 Chemin de Saquier - 06200 Nice
        <br />
        📱 wawawoom[@]gmail.com / 06 31 796 781
        <br />
        👨 Né le 5 Décembre 1978, marié, deux enfants.
        <br />
        🇬🇧 French, english spoken and written.
        <br />
        🚗 Titulaire du permis B
      </WuiText>

      <WuiLink
        href="/me"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.ME);
        }}
      >
        See more
      </WuiLink>
    </>
  );
};
