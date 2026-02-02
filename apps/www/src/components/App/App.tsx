import { useEffect, useRef, useState } from "react";

import { WuiColorAlias, WuiColorValue } from "@wawawoom/wui";

import { navigateTo, useLocation } from "../../hooks/useLocation.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import { Modal } from "../Modal/Modal/Modal.tsx";
import { Zone } from "../Zone/Zone/Zone.tsx";
import "./App.css";
import { pathToSection } from "../../utils/path-to-section.ts";



const App = () => {

  const currentSectionFromURL = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasInitializedRef = useRef(false);
  const pendingReopenRef = useRef<{ section: Section; updateUrl: boolean } | null>(null);

  const openModal = (section: Section, updateUrl: boolean) => {
    if (updateUrl) navigateTo(`/${section}`);
    setSection(section);
    setIsModalOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)));
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
        requestAnimationFrame(() => openModal(pendingOpenModal.section, pendingOpenModal.updateUrl));
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
    <div id="app">
      <div className="container">
        <Zone
          section={Section.ME}
          title="nico."
          titleColor={WuiColorAlias.NEUTRAL_900}
          onOpenModal={onOpenModal}
        />

        <Zone
          section={Section.UI}
          title="u(i/x)."
          titleColor={WuiColorAlias.NEUTRAL_900}
          onOpenModal={onOpenModal}
        />

        <Zone
          section={Section.WEB}
          title="web."
          titleColor={WuiColorAlias.NEUTRAL_0}
          onOpenModal={onOpenModal}
        />

        <Zone
          section={Section.MOB}
          title="mob."
          titleColor={WuiColorAlias.NEUTRAL_0}
          onOpenModal={onOpenModal}
        />
      </div>

      {isModalOpen && section && (
        <Modal
          section={section}
          isAnimating={isAnimating}
          onCloseModal={onCloseModal}
          onOpenModal={onOpenModal}
          closeButtonColor={
            section === Section.WEB || section === Section.MOB
              ? WuiColorValue.BLACK_0
              : WuiColorValue.BLACK_900
          }
        />
      )}
    </div>
  );
};

export default App;
