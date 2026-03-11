import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  WuiColorAlias,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
} from "@wawawoom/wui";

import { ModalProvider } from "../../context/ModalProvider.tsx";
import { useTheme } from "../../context/ThemeContext.ts";
import { navigateTo, useLocation } from "../../hooks/useLocation.ts";
import i18n from "../../i18n.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import { DEFAULT_LOCALE, getLocaleFromPathname } from "../../utils/locale.ts";
import { pathToSection } from "../../utils/path-to-section.ts";
import { Modal } from "../Modal/Modal.tsx";
import { Zone } from "../Zone/Zone.tsx";
import "./App.css";

const App = () => {
  const pathname = useLocation();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedZone, setExpandedZone] = useState<Section | null>(null);

  const hasInitializedRef = useRef(false);
  const pendingReopenRef = useRef<{
    section: Section;
    updateUrl: boolean;
  } | null>(null);

  // Redirect root to locale-prefixed path
  useEffect(() => {
    if (pathname === "/") {
      const preferred =
        typeof navigator !== "undefined" && navigator.language.startsWith("en")
          ? "en"
          : DEFAULT_LOCALE;
      navigateTo(`/${preferred}`);
      return;
    }
  }, [pathname]);

  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const openModal = (section: Section, updateUrl: boolean) => {
    if (updateUrl) navigateTo(`/${locale}/${section}`);
    setSection(section);
    setIsModalOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsAnimating(true))
    );
  };

  const onOpenModal = (section: Section, updateUrl: boolean = true) => {
    if (isModalOpen) {
      pendingReopenRef.current = { section, updateUrl };
      onCloseModal();
    } else {
      openModal(section, updateUrl);
    }
  };

  const onCloseModal = (updateUrl: boolean = true) => {
    setIsAnimating(false);

    setTimeout(() => {
      const pendingOpenModal = pendingReopenRef.current;
      pendingReopenRef.current = null;

      setIsModalOpen(false);
      setSection(null);

      if (updateUrl) {
        navigateTo(`/${locale}`);
      }

      if (pendingOpenModal) {
        requestAnimationFrame(() =>
          openModal(pendingOpenModal.section, pendingOpenModal.updateUrl)
        );
      }
    }, 500);
  };

  // Synchroniser la modal avec l'URL (bouton retour / avant du navigateur)
  useEffect(() => {
    if (!hasInitializedRef.current) return;

    const sectionFromUrl = pathToSection(pathname);

    if (!sectionFromUrl) {
      if (isModalOpen) requestAnimationFrame(() => onCloseModal(false));
      return;
    }

    if (!isModalOpen || section !== sectionFromUrl) {
      requestAnimationFrame(() => openModal(sectionFromUrl, false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isModalOpen, section]);

  // Ouvrir automatiquement la modal au chargement si l'URL correspond à une section
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;

      const sectionFromUrl = pathToSection(pathname);
      if (sectionFromUrl) {
        setTimeout(() => onOpenModal(sectionFromUrl, false), 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  return (
    <ModalProvider>
      <div id="app" className={expandedZone ? "app--zone-expanded" : undefined}>
        {expandedZone != null && (
          <div
            className="app__collapse-backdrop"
            onClick={() => setExpandedZone(null)}
            aria-hidden
          />
        )}

        {/* SectionsZones */}
        <div
          className={[
            "container",
            expandedZone ? `container--${expandedZone}-expanded` : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Zone
            section={Section.DESIGN_SYSTEM}
            title={t("zones.designSystem.title")}
            titleBack={t("zones.designSystem.titleBack")}
            titleColor={
              theme === "dark"
                ? WuiColorAlias.NEUTRAL_0
                : WuiColorAlias.NEUTRAL_900
            }
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.FRONT_END}
            title={t("zones.frontEnd.title")}
            titleBack={t("zones.frontEnd.titleBack")}
            titleColor={
              theme === "dark"
                ? WuiColorAlias.NEUTRAL_0
                : WuiColorAlias.NEUTRAL_900
            }
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.PORTFOLIO}
            title={t("zones.portfolio.title")}
            titleBack={t("zones.portfolio.titleBack")}
            titleColor={
              theme === "dark"
                ? WuiColorAlias.NEUTRAL_900
                : WuiColorAlias.NEUTRAL_0
            }
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.PROFILE}
            title={t("zones.profile.title")}
            titleBack={t("zones.profile.titleBack")}
            titleColor={
              theme === "dark"
                ? WuiColorAlias.NEUTRAL_900
                : WuiColorAlias.NEUTRAL_0
            }
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />
        </div>

        {/* Section Modal */}
        {isModalOpen && section && (
          <Modal
            section={section}
            isAnimating={isAnimating}
            onCloseModal={onCloseModal}
            onOpenModal={onOpenModal}
            closeButtonColor={
              section === Section.PROFILE || section === Section.PORTFOLIO
                ? WuiColorValue.BLACK_0
                : WuiColorValue.BLACK_900
            }
          />
        )}

        <footer className="app__footer">
          <ul>
            <li>
              <WuiLink
                href={section ? `/fr/${section}` : `/fr`}
                onClick={(event) => {
                  event.preventDefault();

                  navigateTo(section ? `/fr/${section}` : "/fr");
                }}
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                aria-current={locale === "fr" ? "true" : undefined}
              >
                fr
              </WuiLink>
            </li>
            <li>
              <WuiLink
                href={section ? `/en/${section}` : `/en`}
                onClick={(event) => {
                  event.preventDefault();

                  navigateTo(section ? `/en/${section}` : "/en");
                }}
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                aria-current={locale === "en" ? "true" : undefined}
              >
                en
              </WuiLink>
            </li>

            <li>
              <WuiLink
                href="https://www.linkedin.com/in/nicolas-payrouse-3016094/"
                target="_blank"
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                title={t("footer.linkedinTitle")}
              >
                <i className="fa-brands fa-linkedin"></i>
              </WuiLink>
            </li>

            <li>
              <WuiLink
                href="mailto:wawawoom@gmail.com"
                target="_blank"
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                title={t("footer.emailTitle")}
              >
                <i className="fa-solid fa-envelope"></i>
              </WuiLink>
            </li>

            <li>
              <WuiLink
                href="https://github.com/wawawoom"
                target="_blank"
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                title={t("footer.githubTitle")}
              >
                <i className="fa-brands fa-github"></i>
              </WuiLink>
            </li>

            <li>
              <WuiLink
                href="tel:+33631796781"
                target="_blank"
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                title={t("footer.phoneTitle")}
              >
                <i className="fa-solid fa-mobile-screen-button"></i>
              </WuiLink>
            </li>

            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="app__theme-toggle"
                title={
                  theme === "light"
                    ? t("footer.themeDark")
                    : t("footer.themeLight")
                }
                aria-label={
                  theme === "light"
                    ? t("footer.themeDark")
                    : t("footer.themeLight")
                }
              >
                <i
                  className={
                    theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"
                  }
                  aria-hidden
                />
              </button>
            </li>
          </ul>
        </footer>
      </div>
    </ModalProvider>
  );
};

export default App;
