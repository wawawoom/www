import { useEffect, useRef, useState } from "react";

import { WuiColorAlias } from "@wawawoom/wui";

import { navigateTo, useLocation } from "../../hooks/useLocation.ts";
import { Section } from "../../ts/enum/section.enum.ts";
import { Modal } from "../Modal/Modal/Modal.tsx";
import { Zone } from "../Zone/Zone/Zone.tsx";
import "./App.css";

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

  const onOpenModal = (section: Section, updateUrl: boolean = true) => {
    if (updateUrl) {
      navigateTo(`/${section}`);
    }

    setIsModalOpen(true);
    setSection(section);

    // Démarrer l'animation après un court délai pour permettre le rendu
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  const onCloseModal = () => {
    // Inverser l'animation : retirer la classe expanded
    setIsAnimating(false);

    // Fermer la modal après la fin de l'animation
    setTimeout(() => {
      setIsModalOpen(false);
      setSection(null);
      navigateTo("/");
    }, 500); // Durée de l'animation CSS
  };

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
          onOpenModal(sectionFromPath as Section, false);
        }, 100);
      }
    }
  }, [currentPath]);

  return (
    <div id="app">
      <div className="container">
        <Zone
          section={Section.ME}
          title="me."
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
        />
      )}
    </div>
  );
};

export default App;
