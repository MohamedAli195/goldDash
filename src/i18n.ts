import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./../public/locales/en.json";
import ar from "./../public/locales/ar.json";

const resources = { en: { translation: en }, ar: { translation: ar } };

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
