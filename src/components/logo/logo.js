import styles from "./logo.module.scss";
import { getTbcLogo, getTbcLogoDesktop } from "../../utils/icons";

export function logo(color) {
  return `
    <a href="#" style="color:${color}">
      <figure class="${styles.smallLogo}">
        ${getTbcLogo()}
      </figure>
      <figure  class="${styles.largeLogo}">
        ${getTbcLogoDesktop()}
      </figure>
    </a>
  `;
}
