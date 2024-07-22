import styles from "./languageSwitch.module.scss";
import { getLanguageIcon } from "../../utils/icons";

export const languageSwitch = (context = '') => {
  const contextClass = context ? styles[`${context}Language`] : '';
  const currentLang = 'ge';
  const langText = currentLang === "en" ? "Eng" : "ქარ";
  const otherLang = currentLang === "en" ? "ქარ" : "Eng";
  const otherLangCode = currentLang === "en" ? "ge" : "en";

  return `
    <div class="${styles.language} ${contextClass}">
      <div class="${styles.languageSwitch}">
        ${getLanguageIcon()} 
        <span class="${styles.languageText}" data-current-lang="${currentLang}">${langText}</span>
      </div>
      <div class="${styles.languageDropdown}">
        <button class="${styles.languageOption}" data-lang="${otherLangCode}">${otherLang}</button>
      </div>
    </div>
  `;
};
