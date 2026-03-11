import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
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
import { useTheme } from "../../context/ThemeContext.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import { Badges } from "../Badges/Badges.tsx";
import SocialLinks from "../SocialLinks/SocialLinks.tsx";
import "./ProfileZone.css";

export const ProfileZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { openDreamJobModal } = useModal();
  const { t } = useTranslation();

  const { theme, getWhiteColor } = useTheme();

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.PINK_0,
    size: WuiBadgeSize.M,
  };

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
        color={getWhiteColor()}
      >
        {t("profileZone.name")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()}>
        {t("profileZone.bio1")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()}>
        {t("profileZone.bio2")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()}>
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

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: t("profileZone.ui"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.ux"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.javascript"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.typescript"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.html"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.css"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.nextjs"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.react"),
          },
          {
            ...badgeConfiguration,
            label: t("profileZone.reactNative"),
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XS} color={getWhiteColor()}>
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
        color={theme === "dark" ? WuiLinkColor.PRIMARY : WuiLinkColor.SECONDARY}
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
