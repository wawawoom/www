import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour détecter les changements d'URL
 * @param callback Fonction appelée à chaque changement d'URL
 * @returns L'URL actuelle
 */
export const useLocation = (callback?: (pathname: string) => void) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // Fonction pour mettre à jour l'URL
    const updatePathname = () => {
      const newPathname = window.location.pathname;
      setPathname(newPathname);
      if (callback) {
        callback(newPathname);
      }
    };

    // Écouter les changements via popstate (bouton retour/avant du navigateur)
    window.addEventListener("popstate", updatePathname);

    // Créer un événement personnalisé pour les changements programmatiques
    const handleLocationChange = () => {
      updatePathname();
    };
    window.addEventListener("locationchange", handleLocationChange);

    // Vérifier périodiquement les changements (pour les cas où pushState est appelé sans événement)
    const interval = setInterval(() => {
      if (window.location.pathname !== pathname) {
        updatePathname();
      }
    }, 100);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener("locationchange", handleLocationChange);
      clearInterval(interval);
    };
  }, [pathname, callback]);

  return pathname;
};

/**
 * Fonction utilitaire pour changer l'URL et déclencher l'événement
 */
export const navigateTo = (path: string) => {
  window.history.pushState({}, "", path);
  // Déclencher un événement personnalisé pour notifier le changement
  window.dispatchEvent(new Event("locationchange"));
};
