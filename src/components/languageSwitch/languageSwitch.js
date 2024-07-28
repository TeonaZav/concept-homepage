import styles from "./languageSwitch.module.scss";
import { getCurrentLanguage } from "../../utils/languageUtils";
import { getLanguageIcon } from "../../utils/icons";



const setCurrentLanguage = (lang) => {
  localStorage.setItem("currentLang", lang);
};

export const languageSwitch = (context = "") => {
  const contextClass = context ? styles[`${context}Language`] : "";
  const currentLang = getCurrentLanguage();
  const langText = currentLang === "ka" ? "ქარ" : "Eng";
  const otherLang = currentLang === "ka" ? "Eng" : "ქარ";
  const otherLangCode = currentLang === "ka" ? "en" : "ka";

  const languageSwitchHTML = `
    <div class="${styles.language} ${contextClass}">
      <div class="${styles.languageSwitch}">
        ${getLanguageIcon()} 
        <span class="${
          styles.languageText
        }" data-current-lang="${currentLang}">${langText}</span>
      </div>
      <div class="${styles.languageDropdown}">
        <button class="${
          styles.languageOption
        }" data-lang="${otherLangCode}">${otherLang}</button>
      </div>
    </div>
  `;

  const languageSwitchContainer = document.createElement("div");
  languageSwitchContainer.innerHTML = languageSwitchHTML;

  const languageOptionButton = languageSwitchContainer.querySelector(
    `.${styles.languageOption}`
  );
  if (languageOptionButton) {
    languageOptionButton.addEventListener("click", onLanguageChange);
  } else {
    console.error("Language switch button not found.");
  }

  return languageSwitchContainer.innerHTML;
};


const onLanguageChange = (event) => {
  const newLang = event.target.getAttribute("data-lang");
  if (newLang) {
    setCurrentLanguage(newLang);
    window.location.reload();
  } else {
    console.warn("No data-lang attribute found.");
  }
};
