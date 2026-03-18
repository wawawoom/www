import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiLink,
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
        color={getWhiteColor()}
        style={{ marginTop: 0 }}
      >
        {t("portfolioModal.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.XL}>
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
            imgUrl: "https://wawawoom.fr/projects/cdn/www/snack-logo.jpg",
            imgAlt: t("portfolioModal.snackAlt"),
            name: t("portfolioModal.snackName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.snackTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  {[
                    "001",
                    "002",
                    "003",
                    "004",
                    "005",
                    "006",
                    "007",
                    "008",
                    "009",
                    "010",
                    "011",
                    "012",
                    "013",
                    "014",
                  ].map((n) => (
                    <img
                      key={n}
                      src={`https://wawawoom.fr/projects/cdn/www/snack-screenshot-${n}.png`}
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.snackTitle"),
                        number: n,
                      })}
                      loading="lazy"
                    />
                  ))}
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/checkout-logo.png",
            imgAlt: t("portfolioModal.checkoutAlt"),
            name: t("portfolioModal.checkoutName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.checkoutTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  {["001", "002", "003"].map((n) => (
                    <img
                      key={n}
                      src={`https://wawawoom.fr/projects/cdn/www/checkout-screenshot-${n}.png`}
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.checkoutTitle"),
                        number: n,
                      })}
                      loading="lazy"
                    />
                  ))}
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/smood-2-logo.png",
            imgAlt: t("portfolioModal.smood2Alt"),
            name: t("portfolioModal.smood2Name"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.smood2Title"));
              setModalContent(
                <div className="wui-modal__images">
                  {["001", "002", "003", "004", "005", "006", "007"].map(
                    (n) => (
                      <img
                        key={n}
                        src={`https://wawawoom.fr/projects/cdn/www/smood-2-screenshot-${n}.png`}
                        alt={t("portfolioModal.screenshotAlt", {
                          name: t("portfolioModal.smood2Title"),
                          number: n,
                        })}
                        loading="lazy"
                      />
                    )
                  )}
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/tracking-logo.png",
            imgAlt: t("portfolioModal.trackingAlt"),
            name: t("portfolioModal.trackingName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.trackingTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  {["001", "002", "003"].map((n) => (
                    <img
                      key={n}
                      src={`https://wawawoom.fr/projects/cdn/www/tracking-screenshot-${n}.png`}
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.trackingTitle"),
                        number: n,
                      })}
                      loading="lazy"
                    />
                  ))}
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/migros-2-logo.png",
            imgAlt: t("portfolioModal.migrosAlt"),
            name: t("portfolioModal.migrosName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.migrosTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  {[
                    "001",
                    "002",
                    "003",
                    "004",
                    "005",
                    "006",
                    "007",
                    "008",
                    "009",
                  ].map((n, i) => (
                    <img
                      key={n}
                      src={`https://wawawoom.fr/projects/cdn/www/${i === 1 ? "smood-2" : "migros-2"}-screenshot-${n}.png`}
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.migrosTitle"),
                        number: n,
                      })}
                      loading="lazy"
                    />
                  ))}
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

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul className="wui-ma-0">
          <li>{t("portfolioZone.gtlBullet1")}</li>
          <li>{t("portfolioZone.gtlBullet2")}</li>
        </ul>
      </WuiText>

      <Gallery
        items={[
          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/eyescyou-logo.jpg",
            imgAlt: t("portfolioModal.eyescyouAlt"),
            name: t("portfolioModal.eyescyouName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.eyescyouTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <iframe
                    width="100%"
                    height="700"
                    src="https://www.youtube.com/embed/k3LdcUerOyQ?si=xKPHeFClOzD4MR54"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                  <iframe
                    width="100%"
                    height="700"
                    src="https://www.youtube.com/embed/mQhlaN5fdeI?si=WYN1-eJcantTRDzA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                  <iframe
                    width="100%"
                    height="700"
                    src="https://www.youtube.com/embed/peKRlcVdM0Q?si=oD3BfZRGQWDWUzMI"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                  <iframe
                    width="100%"
                    height="700"
                    src="https://www.youtube.com/embed/i5GyvIli2cg?si=ItVFy49j_UPTdXen"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
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
        {t("portfolioZone.stentTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.stentIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>{t("portfolioZone.stentBullet1")}</li>
          <li>{t("portfolioZone.stentBullet2")}</li>
          <li>{t("portfolioZone.stentBullet3")}</li>
        </ul>
      </WuiText>

      <Gallery
        items={[
          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/stent-logo.jpeg",
            imgAlt: t("portfolioModal.stentAlt"),
            name: t("portfolioModal.stentName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.stentTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    {["1", "2"].map((n) => (
                      <img
                        key={n}
                        src={`https://wawawoom.fr/projects/cdn/www/stent-screenshot-${n}.png`}
                        alt={t("portfolioModal.screenshotAlt", {
                          name: t("portfolioModal.stentTitle"),
                          number: n,
                        })}
                        loading="lazy"
                      />
                    ))}
                  </div>
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
        {t("portfolioZone.hoozinTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioZone.hoozinIntro")}
      </WuiText>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        <ul>
          <li>{t("portfolioZone.hoozinBullet1")}</li>
          <li>{t("portfolioZone.hoozinBullet2")}</li>
          <li>{t("portfolioZone.hoozinBullet3")}</li>
          <li>{t("portfolioZone.hoozinBullet4")}</li>
          <li>{t("portfolioZone.hoozinBullet5")}</li>
        </ul>
      </WuiText>

      <Gallery
        items={[
          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/hoozin-logo.png",
            imgAlt: t("portfolioModal.hoozinAlt"),
            name: t("portfolioModal.hoozinName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.hoozinTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    {["001", "002", "003", "004", "005"].map((n) => (
                      <img
                        key={n}
                        src={`https://wawawoom.fr/projects/cdn/www/hoozin-screenshot-${n}.png`}
                        alt={t("portfolioModal.screenshotAlt", {
                          name: t("portfolioModal.hoozinTitle"),
                          number: n,
                        })}
                        loading="lazy"
                      />
                    ))}
                  </div>
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
        {t("portfolioModal.personalProjectsTitle")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getWhiteColor()} size={WuiTextSize.S}>
        {t("portfolioModal.personalProjectsIntro")}
      </WuiText>

      <Gallery
        items={[
          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/wui-logo.svg",
            imgAlt: t("portfolioModal.wuiAlt"),
            name: t("portfolioModal.wuiName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.wuiTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      {t("portfolioModal.wuiCheckText")}{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/wui/storybook/"
                        target="_blank"
                      >
                        {t("portfolioModal.storybook")}
                      </WuiLink>
                      ,{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/wui/tests/"
                        target="_blank"
                      >
                        {t("portfolioModal.testingCoverage")}
                      </WuiLink>{" "}
                      {t("portfolioModal.and")}{" "}
                      <WuiLink
                        href="https://github.com/wawawoom/www/tree/master/libs/wui"
                        target="_blank"
                      >
                        {t("portfolioModal.sourceCode")}
                      </WuiLink>
                    </WuiText>

                    {["001", "002", "003", "004"].map((n) => (
                      <img
                        key={n}
                        src={`https://wawawoom.fr/projects/cdn/www/wui-screenshot-${n}.png`}
                        alt={t("portfolioModal.screenshotAlt", {
                          name: t("portfolioModal.wuiTitle"),
                          number: n,
                        })}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/logos-logo.jpg",
            imgAlt: t("portfolioModal.logosAlt"),
            name: t("portfolioModal.logosName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.logosTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <img
                      src="https://wawawoom.fr/projects/cdn/www/yoooo-logo.png"
                      alt={t("portfolioModal.logoYoooo")}
                      loading="lazy"
                      style={{ maxWidth: 300 }}
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/kalei-logo.png"
                      alt={t("portfolioModal.logoKalei")}
                      loading="lazy"
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/lena-logo.jpg"
                      alt={t("portfolioModal.logoPayrouse")}
                      loading="lazy"
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/bioman-logo.jpg"
                      alt={t("portfolioModal.logoBioman")}
                      loading="lazy"
                      style={{ maxWidth: 600 }}
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/canyon-logo.jpg"
                      alt={t("portfolioModal.logoCanyon")}
                      loading="lazy"
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/cape-logo.jpg"
                      alt={t("portfolioModal.logoCape")}
                      loading="lazy"
                    />

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/ayva.jpg"
                      alt={t("portfolioModal.logoAyva")}
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/logo-kalei-only.png",
            imgAlt: t("portfolioModal.kaleiAlt"),
            name: t("portfolioModal.kaleiName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.kaleiTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      {t("portfolioModal.kaleiCheckText")}{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/kalei/"
                        target="_blank"
                      >
                        {t("portfolioModal.webapp")}
                      </WuiLink>
                      , {t("portfolioModal.and")}{" "}
                      <WuiLink
                        href="https://github.com/wawawoom/www/tree/master/apps/kalei"
                        target="_blank"
                      >
                        {t("portfolioModal.sourceCode")}
                      </WuiLink>
                    </WuiText>

                    {["001", "002", "003"].map((n) => (
                      <img
                        key={n}
                        src={`https://wawawoom.fr/projects/cdn/www/kalei-screenshot-${n}.png`}
                        alt={t("portfolioModal.screenshotAlt", {
                          name: t("portfolioModal.kaleiTitle"),
                          number: n,
                        })}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/tictac-logo.png",
            imgAlt: t("portfolioModal.tictacAlt"),
            name: t("portfolioModal.tictacName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.tictacTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      {t("portfolioModal.tictacCheckText")}{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/tictac/"
                        target="_blank"
                      >
                        {t("portfolioModal.webapp")}
                      </WuiLink>
                      , {t("portfolioModal.and")}{" "}
                      <WuiLink
                        href="https://github.com/wawawoom/www/tree/master/apps/tictac"
                        target="_blank"
                      >
                        {t("portfolioModal.sourceCode")}
                      </WuiLink>
                    </WuiText>

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/tictac-screenshot-001.png"
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.tictacTitle"),
                        number: "001",
                      })}
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/konsole-logo.png",
            imgAlt: t("portfolioModal.konsoleAlt"),
            name: t("portfolioModal.konsoleName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.konsoleTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      {t("portfolioModal.konsoleCheckText")}{" "}
                      <WuiLink
                        href="https://github.com/wawawoom/konsole"
                        target="_blank"
                      >
                        konsole
                      </WuiLink>
                    </WuiText>

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/konsole-screenshot-001.png"
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.konsoleTitle"),
                        number: "001",
                      })}
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/wawawood-logo.png",
            imgAlt: t("portfolioModal.wawawoodAlt"),
            name: t("portfolioModal.wawawoodName"),
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle(t("portfolioModal.wawawoodTitle"));
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      {t("portfolioModal.wawawoodIntro")}{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/wawawood/"
                        target="_blank"
                      >
                        {t("portfolioModal.wawawoodLink")}
                      </WuiLink>
                    </WuiText>

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/wawawood-screenshot-001.png"
                      alt={t("portfolioModal.screenshotAlt", {
                        name: t("portfolioModal.wawawoodTitle"),
                        number: "001",
                      })}
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },

          {
            imgUrl: "https://wawawoom.fr/projects/cdn/www/lab-logo.png",
            imgAlt: "Lab CSS",
            name: "Lab CSS",
            textColor: getWhiteColor(),
            onClick: () => {
              setModalTitle("Lab CSS");
              setModalContent(
                <div className="wui-modal__images">
                  <div className="wui-modal__images">
                    <WuiText as={WuiTextAs.P} size={WuiTextSize.S}>
                      Mon espace d'expérimentation CSS et JavaScript{" "}
                      <WuiLink
                        href="https://wawawoom.fr/projects/lab/"
                        target="_blank"
                      >
                        =&gt; Lab
                      </WuiLink>
                    </WuiText>

                    <img
                      src="https://wawawoom.fr/projects/cdn/www/lab-screenshot-001.png"
                      alt="Lab CSS"
                      loading="lazy"
                    />
                  </div>
                </div>
              );

              setIsModalScreenshotsOpen(true);
            },
          },
        ]}
      />

      {/* MODAL */}

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
