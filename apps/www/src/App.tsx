import { useLocation } from "./hooks/useLocation.ts";
import Home from "./views/Home.tsx";

const App = () => {
  useLocation((pathname) => {
    // Action globale déclenchée à chaque changement d'URL
    console.log("🌐 Changement d'URL global:", pathname);

    // Exemples d'actions possibles :
    // - Scroll vers le haut
    // - Changer le titre de la page
    // - Envoyer un événement analytics
    // - Mettre à jour un état global
    document.title = `Portfolio - ${pathname === "/" ? "Accueil" : pathname}`;
  });

  return <Home />;
};

export default App;
