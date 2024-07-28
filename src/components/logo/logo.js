import styles from "./logo.module.scss";
import {
  getTbcLogo,
  getTbcLogoDesktop,
  getTbcLogoEnglish,
} from "../../utils/icons";

export function logo(color, language) {
  return `
    <a href="#" style="color:${color}">
      <figure class="${styles.smallLogo}">
        ${getTbcLogo()}
      </figure>
      <figure  class="${styles.largeLogo}">
        ${language === "english" ? getTbcLogoEnglish() : getTbcLogoDesktop()}
      </figure>
    </a>
  `;
}
