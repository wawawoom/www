import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiButton,
  WuiButtonColor,
  WuiColorAlias,
  WuiLink,
  WuiLinkColor,
  WuiModal,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { getEnv } from "../../config/env.ts";
import { useModal } from "../../context/ModalContext";
import Gallery from "../Gallery/Gallery";

export const PortfolioModal = () => {
  const { openDreamJobModal } = useModal();
  const { t } = useTranslation();

  const [modalSourceCodeWebsiteIsOpen, setModalSourceCodeWebsiteIsOpen] =
    useState(false);
  const [modalStorybookIsOpen, setModalStorybookIsOpen] = useState(false);
  const [modalComponentsTestsIsOpen, setModalComponentsTestsIsOpen] =
    useState(false);

  const onClickDreamJob = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openDreamJobModal();
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        color={WuiColorAlias.NEUTRAL_0}
        style={{ marginTop: 0 }}
      >
        {t("portfolioModal.title")}
      </WuiTitle>

      <WuiText
        as={WuiTextAs.P}
        color={WuiColorAlias.NEUTRAL_0}
        size={WuiTextSize.XL}
      >
        {t("portfolioModal.intro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("portfolioModal.paragraph1")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("portfolioModal.paragraph2")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("portfolioModal.paragraph3")}
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        {t("portfolioModal.andNow")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={WuiColorAlias.NEUTRAL_0}>
        {t("portfolioModal.andNowParagraphBefore")}
        <WuiLink
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            onClickDreamJob(e);
          }}
          color={WuiLinkColor.NONE}
        >
          {t("profileModal.checkIdealRole")}
        </WuiLink>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={WuiColorAlias.NEUTRAL_0}
        className="mt-44"
      >
        {t("portfolioModal.letMeShowYou")}
      </WuiTitle>

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Eyescyou",
            name: "Eyescyou",
            textColor: WuiColorAlias.NEUTRAL_0,
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Stent AI",
            name: "Stent AI",
            textColor: WuiColorAlias.NEUTRAL_0,
          },
        ]}
      />

      <Gallery
        items={[
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: t("frontEndModal.sourceCode"),
            name: t("frontEndModal.sourceCode"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalSourceCodeWebsiteIsOpen(true);
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Smood Logo",
            name: t("frontEndModal.smoodWebsite"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my storybook
              window.open("https://smood.ch/", "_blank");
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Storybook logo",
            name: t("frontEndModal.wuiLibrary"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalStorybookIsOpen(true);
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Testing",
            name: t("frontEndModal.componentsTests"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my components tests coverage
              window.open("https://storybook.js.org/", "_blank");
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "Kalei logo",
            name: t("frontEndModal.kalei"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my kalei website
              window.open(
                `${getEnv("VITE_DOMAIN_URL")}${getEnv("VITE_PROJECTS_PATH")}/kalei/`,
                "_blank"
              );
            },
          },
          {
            imgUrl: "/img/job/logo-graphisme.jpg",
            imgAlt: "TicTac timetracker logo",
            name: t("frontEndModal.tictacTracker"),
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              // TODO: link to my tictac website
              window.open(
                `${getEnv("VITE_DOMAIN_URL")}${getEnv("VITE_PROJECTS_PATH")}/tictac/`,
                "_blank"
              );
            },
          },
        ]}
      />

      <WuiModal
        open={modalSourceCodeWebsiteIsOpen}
        onClose={() => setModalSourceCodeWebsiteIsOpen(false)}
        title={t("frontEndModal.confirmTitle")}
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => {
              window.open(
                "https://github.com/wawawoom/www/tree/master/apps/www",
                "_blank"
              );

              setModalSourceCodeWebsiteIsOpen(false);
            }}
          >
            {t("frontEndModal.yesViewGitHub")}
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.DIV}>
          {t("frontEndModal.confirmMessage")}
        </WuiText>
      </WuiModal>

      <WuiModal
        open={modalStorybookIsOpen}
        onClose={() => setModalStorybookIsOpen(false)}
        title={t("frontEndModal.choiceTitle")}
        footer={
          <>
            <WuiButton
              color={WuiButtonColor.GHOST}
              onClick={() => {
                window.open(
                  "https://github.com/wawawoom/www/tree/master/libs/wui",
                  "_blank"
                );

                setModalStorybookIsOpen(false);
              }}
            >
              {t("frontEndModal.sourceCodeButton")}
            </WuiButton>

            {/* TODO: link to my storybook */}
            <WuiButton
              color={WuiButtonColor.DARK}
              onClick={() => {
                window.open(
                  "https://github.com/wawawoom/www/tree/master/apps/www",
                  "_blank"
                );

                setModalStorybookIsOpen(false);
              }}
            >
              {t("frontEndModal.storybookButton")}
            </WuiButton>
          </>
        }
      >
        <WuiText as={WuiTextAs.DIV}>
          {t("frontEndModal.storybookMessage")}
        </WuiText>
      </WuiModal>

      <WuiModal
        open={modalComponentsTestsIsOpen}
        onClose={() => setModalComponentsTestsIsOpen(false)}
        title="Make a choice"
        footer={
          <WuiButton
            color={WuiButtonColor.DARK}
            onClick={() => {
              {
                /* TODO: link to my test coverage  */
              }
              window.open(
                "https://github.com/wawawoom/www/tree/master/apps/www",
                "_blank"
              );

              setModalComponentsTestsIsOpen(false);
            }}
          >
            {t("frontEndModal.yesPlease")}
          </WuiButton>
        }
      >
        <WuiText as={WuiTextAs.DIV}>{t("frontEndModal.testsMessage")}</WuiText>
      </WuiModal>
    </>
  );
};
