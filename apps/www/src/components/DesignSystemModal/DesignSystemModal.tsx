import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeSize,
  WuiColorAlias,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

export const DesignSystemModal = () => {
  const { t } = useTranslation();
  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 0 }}
      >
        {t("designSystemModal.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XL}>
        {t("designSystemModal.intro")}
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase1Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase1Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase1Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase1Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase1Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase1Item2Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase1Item3Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase1Item3Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase2Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase2Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase2Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase2Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase2Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase2Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase3Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase3Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase3Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase3Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase3Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase3Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase4Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase4Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase4Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase4Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase4Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase4Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase5Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase5Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase5Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase5Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase5Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase5Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_900}
        style={{ marginTop: 60 }}
      >
        {t("designSystemModal.phase6Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P}>
        {t("designSystemModal.phase6Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV}>
        <ul>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase6Item1Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase6Item1Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase6Item2Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase6Item2Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase6Item3Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase6Item3Text")}
          </li>
          <li>
            <WuiBadge size={WuiBadgeSize.L}>
              {t("designSystemModal.phase6Item4Badge")}
            </WuiBadge>{" "}
            {t("designSystemModal.phase6Item4Text")}
          </li>
        </ul>
      </WuiText>
    </>
  );
};
