import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationSP from "./locales/sp/translation.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationEN,
        },
        de: {
            translation: translationDE,
        },
        sp: {
            translation: translationSP,
        },
        fr: {
            translation: translationFR,
        },
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    }
});

export default i18n;