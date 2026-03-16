import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiColorAlias,
  WuiModal,
  WuiModalWidth,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { useTheme } from "../../context/ThemeContext.ts";
import Gallery from "../Gallery/Gallery";
import "./PortfolioModal.css";

export const PortfolioModal = () => {
  const { t } = useTranslation();

  const { getWhiteColor } = useTheme();

  const [isModalScreenshotsOpen, setIsModalScreenshotsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

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

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
      >
        {t("portfolioZone.smoodTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.smoodIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>{t("portfolioZone.smoodBullet1")}</li>
          <li>{t("portfolioZone.smoodBullet2")}</li>
          <li>{t("portfolioZone.smoodBullet3")}</li>
          <li>{t("portfolioZone.smoodBullet4")}</li>
          <li>{t("portfolioZone.smoodBullet5")}</li>
        </ul>
      </WuiText>

      <Gallery
        items={[
          {
            imgUrl: "https://next.wawawoom.fr/projects/cdn/www/snack-logo.jpg",
            imgAlt: "Smood Snack",
            name: "Snack design system",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalTitle("Snack Design System");
              setModalContent(
                <div className="wui-modal__images">
                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-001.png"
                    alt="Snack design system - Screenshot 001"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-002.png"
                    alt="Snack design system - Screenshot 002"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-003.png"
                    alt="Snack design system - Screenshot 003"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-004.png"
                    alt="Snack design system - Screenshot 004"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-005.png"
                    alt="Snack design system - Screenshot 005"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-006.png"
                    alt="Snack design system - Screenshot 006"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-007.png"
                    alt="Snack design system - Screenshot 007"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-008.png"
                    alt="Snack design system - Screenshot 008"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-009.png"
                    alt="Snack design system - Screenshot 009"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-010.png"
                    alt="Snack design system - Screenshot 010"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-011.png"
                    alt="Snack design system - Screenshot 011"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-012.png"
                    alt="Snack design system - Screenshot 012"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-013.png"
                    alt="Snack design system - Screenshot 013"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/snack-screenshot-014.png"
                    alt="Snack design system - Screenshot 014"
                    loading="lazy"
                  />
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl:
              "https://next.wawawoom.fr/projects/cdn/www/checkout-logo.png",
            imgAlt: "Smood Checkout",
            name: "Smood Checkout",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalTitle("Smood Checkout");
              setModalContent(
                <div className="wui-modal__images">
                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/checkout-screenshot-001.png"
                    alt="Smood Checkout - Screenshot 001"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/checkout-screenshot-002.png"
                    alt="Smood Checkout - Screenshot 002"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/checkout-screenshot-003.png"
                    alt="Smood Checkout - Screenshot 003"
                    loading="lazy"
                  />
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl:
              "https://next.wawawoom.fr/projects/cdn/www/smood-2-logo.png",
            imgAlt: "Smood 2.0",
            name: "Smood 2.0",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalTitle("Smood 2.0");
              setModalContent(
                <div className="wui-modal__images">
                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-001.png"
                    alt="Smood 2.0 - Screenshot 001"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-002.png"
                    alt="Smood 2.0 - Screenshot 002"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-003.png"
                    alt="Smood 2.0 - Screenshot 003"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-004.png"
                    alt="Smood 2.0 - Screenshot 004"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-005.png"
                    alt="Smood 2.0 - Screenshot 005"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-006.png"
                    alt="Smood 2.0 - Screenshot 006"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-007.png"
                    alt="Smood 2.0 - Screenshot 007"
                    loading="lazy"
                  />
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl:
              "https://next.wawawoom.fr/projects/cdn/www/tracking-logo.png",
            imgAlt: "Smood Order Tracking",
            name: "Smood Order Tracking",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalTitle("Smood Order Tracking");
              setModalContent(
                <div className="wui-modal__images">
                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/tracking-screenshot-001.png"
                    alt="Smood Order tracking - Screenshot 001"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/tracking-screenshot-002.png"
                    alt="Smood Order tracking - Screenshot 002"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/tracking-screenshot-003.png"
                    alt="Smood Order tracking - Screenshot 003"
                    loading="lazy"
                  />
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl:
              "https://next.wawawoom.fr/projects/cdn/www/migros-2-logo.png",
            imgAlt: "Migros / Retail 2.0",
            name: "Migros / Retail 2.0",
            textColor: WuiColorAlias.NEUTRAL_0,
            onClick: () => {
              setModalTitle("Migros / Retail 2.0");
              setModalContent(
                <div className="wui-modal__images">
                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-001.png"
                    alt="Migros / Retail 2.0 - Screenshot 001"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/smood-2-screenshot-002.png"
                    alt="Migros / Retail 2.0 - Screenshot 002"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-003.png"
                    alt="Migros / Retail 2.0 - Screenshot 003"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-004.png"
                    alt="Migros / Retail 2.0 - Screenshot 004"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-005.png"
                    alt="Migros / Retail 2.0 - Screenshot 005"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-006.png"
                    alt="Migros / Retail 2.0 - Screenshot 006"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-007.png"
                    alt="Migros / Retail 2.0 - Screenshot 007"
                    loading="lazy"
                  />

                  <img
                    src="https://next.wawawoom.fr/projects/cdn/www/migros-2-screenshot-008.png"
                    alt="Migros / Retail 2.0 - Screenshot 008"
                    loading="lazy"
                  />
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },
        ]}
      />

      <WuiTitle
        as={WuiTitleAs.H2}
        look={WuiTitleLook.H4}
        color={getWhiteColor()}
        className="wui-mt-60"
      >
        {t("portfolioZone.gtlTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.gtlIntro")}
      </WuiText>

      <WuiModal
        open={isModalScreenshotsOpen}
        onClose={() => setIsModalScreenshotsOpen(false)}
        title={modalTitle}
        width={WuiModalWidth.L}
      >
        {modalContent}
      </WuiModal>
    </>
  );
};
