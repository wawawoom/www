import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en as Record<string, unknown> },
    fr: { translation: fr as Record<string, unknown> },
  },
  supportedLngs: ["en", "fr"],
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
