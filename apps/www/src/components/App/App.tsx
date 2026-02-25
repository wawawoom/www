import { useEffect, useRef, useState } from "react";

import {
  WuiColorAlias,
  WuiColorValue,
  WuiLink,
  WuiLinkColor,
  WuiLinkSize,
} from "@wawawoom/wui";

import { ModalProvider } from "../../context/ModalProvider.tsx";
import { navigateTo, useLocation } from "../../hooks/useLocation.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import { pathToSection } from "../../utils/path-to-section.ts";
import { Modal } from "../layout/Modal/Modal/Modal.tsx";
import { Zone } from "../layout/Zone/Zone/Zone.tsx";
import "./App.css";

const App = () => {
  const currentSectionFromURL = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedZone, setExpandedZone] = useState<Section | null>(null);
  const hasInitializedRef = useRef(false);
  const pendingReopenRef = useRef<{
    section: Section;
    updateUrl: boolean;
  } | null>(null);

  const openModal = (section: Section, updateUrl: boolean) => {
    if (updateUrl) navigateTo(`/${section}`);
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
        navigateTo("/");
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

    const sectionFromUrl = pathToSection(currentSectionFromURL);

    if (!sectionFromUrl) {
      if (isModalOpen) requestAnimationFrame(() => onCloseModal(false));
      return;
    }

    if (!isModalOpen || section !== sectionFromUrl) {
      requestAnimationFrame(() => openModal(sectionFromUrl, false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionFromURL, isModalOpen, section]);

  // Ouvrir automatiquement la modal au chargement si l'URL correspond à une section
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;

      const sectionFromUrl = pathToSection(currentSectionFromURL);
      if (sectionFromUrl) {
        setTimeout(() => onOpenModal(sectionFromUrl, false), 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionFromURL]);

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
            title="Design system"
            titleBack="Token-Driven systems"
            titleColor={WuiColorAlias.NEUTRAL_900}
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.FRONT_END}
            title="Front-end"
            titleBack="Interface Implementation"
            titleColor={WuiColorAlias.NEUTRAL_900}
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.PORTFOLIO}
            title="Selected work"
            titleBack="Production case studies"
            titleColor={WuiColorAlias.NEUTRAL_0}
            onOpenModal={onOpenModal}
            expandedZone={expandedZone}
            onZoneClick={setExpandedZone}
          />

          <Zone
            section={Section.PROFILE}
            title="Profile"
            titleBack="Nicolas Payrouse"
            titleColor={WuiColorAlias.NEUTRAL_0}
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
            <li>fr</li>
            <li>en</li>

            <li>
              <WuiLink
                href="https://www.linkedin.com/in/nicolas-payrouse-3016094/"
                target="_blank"
                size={WuiLinkSize.L}
                color={WuiLinkColor.NONE}
                title="Linkedin profile"
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
                title="Contact me by email"
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
                title="GitHub profile"
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
                title="Contact me by phone"
              >
                <i className="fa-solid fa-mobile-screen-button"></i>
              </WuiLink>
            </li>
          </ul>
        </footer>
      </div>
    </ModalProvider>
  );
};

export default App;
