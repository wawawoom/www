import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { useTheme } from "../../context/ThemeContext";

export const FrontEndModal = () => {
  const { t } = useTranslation();

  const { theme, getBlackColor } = useTheme();

  const getBadgeColor = (): WuiBadgeColor => {
    return theme === "dark" ? WuiBadgeColor.PRIMARY : WuiBadgeColor.SECONDARY;
  };

  const getBadgeSize = (): WuiBadgeSize => {
    return WuiBadgeSize.M;
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        style={{ marginTop: 0 }}
        color={getBlackColor()}
      >
        {t("frontEndModal.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XL} color={getBlackColor()}>
        {t("frontEndModal.intro")}
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase1Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase1Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase1Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase1Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase1Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase1Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase2Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase2Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase2Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase2Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase2Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase2Item2Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase2Item3Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase2Item3Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase3Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase3Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase3Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase3Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase3Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase3Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase4Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase4Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase4Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase4Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase4Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase4Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase5Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase5Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase5Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase5Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase5Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase5Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase6Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase6Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase6Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase6Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase6Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase6Item2Text")}
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        {t("frontEndModal.phase7Title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        {t("frontEndModal.phase7Intro")}
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase7Item1Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase7Item1Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase7Item2Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase7Item2Text")}
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              {t("frontEndModal.phase7Item3Badge")}
            </WuiBadge>{" "}
            {t("frontEndModal.phase7Item3Text")}
          </li>
        </ul>
      </WuiText>
    </>
  );
};
