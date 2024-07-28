import styles from "./sectionHeader.module.scss";
import { getArrowIcon } from "../../utils/icons";

export const sectionHeader = (sectionTitle, linkText, linkHref) => {
  return `
      <div class="${styles.sectionHeader}">
        <div class="${styles.headingCt}">
          <h2>${sectionTitle}</h2>
          ${
            linkText && linkHref
              ? `
          <a href="${linkHref}" class="${styles.linkButton}">
            ${getArrowIcon()}
            <span>${linkText}</span>
          </a>`
              : ""
          }
        </div>
      </div>
    `;
};
