import { useEffect, useRef, useState } from "react";

import {
  WuiColorAlias,
  WuiTitle,
  WuiTitleAs,
  WuiTitleLook,
} from "@wawawoom/wui";

import { navigateTo, useLocation } from "./hooks/useLocation.ts";
import { MeModal } from "./modal/MeModal.component.tsx";
import { MobModal } from "./modal/MobModal.component.tsx";
import { UiModal } from "./modal/UiModal.component.tsx";
import { WebModal } from "./modal/WebModal.component.tsx";
import { Section } from "./ts/enum/section.enum.ts";
import { MeZone } from "./zone/MeZone.component.tsx";
import { MobZone } from "./zone/MobZone.component.tsx";
import { UiZone } from "./zone/UiZone.component.tsx";
import { WebZone } from "./zone/WebZone.component.tsx";

const App = () => {
  // Détecter les changements d'URL et déclencher une action
  const currentPath = useLocation((pathname) => {
    // Action déclenchée à chaque changement d'URL
    console.log("URL changée vers:", pathname);

    // Exemple d'actions que vous pouvez faire ici :
    if (pathname === "/me") {
      console.log("Action spécifique pour /me");
      // Ajoutez votre logique ici (animation, scroll, etc.)
    } else if (pathname === "/") {
      console.log("Action spécifique pour /");
      // Ajoutez votre logique ici
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasInitializedRef = useRef(false);

  // Fonction pour ouvrir la modal depuis le centre de l'écran
  const openModal = (section: Section) => {
    setIsModalOpen(true);
    setSection(section);

    // Démarrer l'animation après un court délai pour permettre le rendu
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  const onOpenModal = (section: Section) => {
    navigateTo(`/${section}`);
    openModal(section);
  };

  const handleCloseModal = () => {
    // Inverser l'animation : retirer la classe expanded
    setIsAnimating(false);

    // Fermer la modal après la fin de l'animation
    setTimeout(() => {
      setIsModalOpen(false);
      setSection(null);
      navigateTo("/");
    }, 500); // Durée de l'animation CSS
  };

  const renderSection = () => {
    switch (section) {
      case Section.ME:
        return <MeModal />;
      case Section.UI:
        return <UiModal />;
      case Section.WEB:
        return <WebModal />;
      case Section.MOB:
        return <MobModal />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Ouvrir automatiquement la modal au chargement si l'URL correspond à une section
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const sectionFromPath = currentPath.replace("/", "") as Section | "";
      if (
        sectionFromPath &&
        Object.values(Section).includes(sectionFromPath as Section)
      ) {
        // Petit délai pour s'assurer que le DOM est prêt
        setTimeout(() => {
          openModal(sectionFromPath as Section);
        }, 100);
      }
    }
  }, [currentPath]);

  return (
    <div id="app">
      <div className="container">
        <div className="zone me">
          <WuiTitle
            as={WuiTitleAs.H2}
            look={WuiTitleLook.H6}
            color={WuiColorAlias.NEUTRAL_900}
          >
            me.
          </WuiTitle>

          <MeZone onOpenModal={onOpenModal} />
        </div>

        <div className="zone ui">
          <WuiTitle
            as={WuiTitleAs.H2}
            look={WuiTitleLook.H6}
            color={WuiColorAlias.NEUTRAL_900}
          >
            u(i/x).
          </WuiTitle>

          <UiZone onOpenModal={onOpenModal} />
        </div>

        <div className="zone web">
          <WuiTitle
            as={WuiTitleAs.H2}
            look={WuiTitleLook.H6}
            color={WuiColorAlias.NEUTRAL_0}
          >
            web.
          </WuiTitle>

          <WebZone onOpenModal={onOpenModal} />
        </div>

        <div className="zone mobile">
          <WuiTitle
            as={WuiTitleAs.H2}
            look={WuiTitleLook.H6}
            color={WuiColorAlias.NEUTRAL_0}
          >
            mob.
          </WuiTitle>

          <MobZone onOpenModal={onOpenModal} />
        </div>
      </div>

      {isModalOpen && section && (
        <div
          className={`modal modal--${section} ${isAnimating ? "modal--expanded" : ""}`}
        >
          <button
            className="modal__close"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="modal__content">{renderSection()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
