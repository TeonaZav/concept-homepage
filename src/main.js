import "./styles/main.scss";
import * as en from "./locales/en/index.js";
import * as ka from "./locales/ka/index.js";
import { Home } from "./views/home/home";

import { languageSwitch } from "./components/languageSwitch/languageSwitch.js";
import { getCurrentLanguage } from "./utils/languageUtils.js";

// const getTranslation = () => {
//   const currentLang = getCurrentLanguage();
//   return currentLang === "en" ? en.default : ka.default;
// };

// document.addEventListener("DOMContentLoaded", () => {
//   if (headerLanguageSwitcher) {
//     headerLanguageSwitcher.innerHTML = languageSwitch();
//   }

//   if (footerLanguageSwitcher) {
//     footerLanguageSwitcher.innerHTML = languageSwitch();
//   }

//   const translations = getTranslation();
//   console.log(translations);
//   const home = new Home(translations);
//   home.render();
// });

const getTranslation = () => {
  const currentLang = getCurrentLanguage();
  return currentLang === "en" ? en.default : ka.default;
};

document.addEventListener("DOMContentLoaded", () => {
  // Select the elements where the language switchers will be rendered
  const headerLanguageSwitcher = document.getElementById(
    "header-language-switcher"
  );
  const footerLanguageSwitcher = document.getElementById(
    "footer-language-switcher"
  );

  // Render the language switcher in the header if the container exists
  if (headerLanguageSwitcher) {
    headerLanguageSwitcher.innerHTML = languageSwitch();
  }

  // Render the language switcher in the footer if the container exists
  if (footerLanguageSwitcher) {
    footerLanguageSwitcher.innerHTML = languageSwitch();
  }

  // Get the translations for the current language and render the home component
  const translations = getTranslation();
  console.log(translations);
  const home = new Home(translations);
  home.render();
});
