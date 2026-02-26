import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiBadgeColor,
  WuiBadgeSize,
  WuiButton,
  WuiButtonColor,
  WuiColorAlias,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { Section } from "../../ts/enum/section.enum";
import { Badges } from "../Badges/Badges";

export const DesignSystemZone = (props: {
  onOpenModal: (section: Section) => void;
}) => {
  const { onOpenModal } = props;
  const { t } = useTranslation();

  const [openTestModal, setOpenTestModal] = useState(false);

  const badgeConfiguration = {
    color: WuiBadgeColor.TRANSPARENT,
    textColor: WuiColorValue.YELLOW_900,
    size: WuiBadgeSize.M,
  };

  return (
    <>
      <WuiTitle as={WuiTitleAs.H1} look={WuiTitleLook.H2}>
        {t("designSystemZone.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_900}>
        {t("designSystemZone.intro")}
      </WuiText>

      <Badges
        badges={[
          {
            ...badgeConfiguration,
            label: t("designSystemZone.designTokens"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.componentArchitecture"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.systemGovernance"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.documentation"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.versioning"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.crossFunctionalAlignment"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.figmaFoundations"),
          },
          {
            ...badgeConfiguration,
            label: t("designSystemZone.storybook"),
          },
        ]}
      />

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("designSystemZone.paragraph1")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("designSystemZone.paragraph2")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("designSystemZone.paragraph3")}
      </WuiText>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
        {t("designSystemZone.paragraph4")}
      </WuiText>

      <WuiLink
        href="/design-system"
        color={WuiLinkColor.LIGHT}
        onClick={(event) => {
          event.preventDefault();

          onOpenModal(Section.DESIGN_SYSTEM);
        }}
      >
        {t("designSystemZone.letsDiveIn")}
      </WuiLink>

      <WuiModal
        open={openTestModal}
        onClose={() => setOpenTestModal(false)}
        title={t("designSystemZone.modalTitle")}
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => setOpenTestModal(false)}
          >
            {t("designSystemZone.modalClose")}
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.P}>{t("designSystemZone.modalContent")}</WuiText>
      </WuiModal>
    </>
  );
};
