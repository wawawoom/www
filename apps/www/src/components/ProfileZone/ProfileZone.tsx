import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiColorAlias,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useModal } from "../../context/ModalContext.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import SocialLinks from "../SocialLinks/SocialLinks.tsx";
import "./ProfileZone.css";

export const ProfileZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { openDreamJobModal } = useModal();
  const { t } = useTranslation();

  const badgeColor = WuiBadgeColor.TRANSPARENT;
  const badgeTextColor = WuiColorValue.PINK_0;
  const badgeSize = WuiBadgeSize.M;

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  return (
    <>
      <WuiBadge
        size={WuiBadgeSize.L}
        color={WuiBadgeColor.WARNING}
        style={{
          marginLeft: "7rem",
          position: "absolute",
          top: "2rem",
          width: "max-content",
        }}
      >
        {t("profileZone.openToWork")}
      </WuiBadge>

      <img
        src="/img/nicolas-payrouse.webp"
        alt="Nicolas Payrouse"
        className="avatar"
      />

      <WuiTitle
        as={WuiTitleAs.H1}
        look={WuiTitleLook.H2}
        color={WuiColorAlias.NEUTRAL_0}
      >
        {t("profileZone.name")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("profileZone.bio1")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("profileZone.bio2")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("profileZone.bio3Before")}
        <WuiLink
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            onClickDreamJob(e);
          }}
          color={WuiLinkColor.NONE}
        >
          {t("profileZone.discoverIdealRole")}
        </WuiLink>
        .
      </WuiText>

      <WuiText as={WuiTextAs.P} className="badges">
        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          UI
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          UX
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          JavaScript
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          Typescript
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          HTML
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          CSS
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          NextJs
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          React
        </WuiBadge>

        <WuiBadge
          color={badgeColor}
          size={badgeSize}
          style={{ color: badgeTextColor }}
        >
          React Native
        </WuiBadge>
      </WuiText>

      <WuiText
        as={WuiTextAs.P}
        size={WuiTextSize.XS}
        color={WuiColorAlias.NEUTRAL_0}
      >
        <i className="fa-regular fa-compass"></i> {t("profileZone.location")}
        <br />
        <i className="fa-regular fa-address-card"></i>{" "}
        {t("profileZone.contact")}
        <br />
        <i className="fa-solid fa-people-roof"></i> {t("profileZone.birth")}
        <br />
        <i className="fa-solid fa-language"></i> {t("profileZone.languages")}
        <br />
        <i className="fa-solid fa-car"></i> {t("profileZone.drivingLicence")}
      </WuiText>

      <SocialLinks />

      <WuiLink
        href="/profile"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.PROFILE);
        }}
      >
        {t("profileZone.viewExperience")}
      </WuiLink>
    </>
  );
};
