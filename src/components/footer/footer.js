import styles from "./footer.module.scss";
import { getTbcLogo } from "../../utils/icons";
import { logo } from "../logo/logo";
import { languageSwitch } from "../languageSwitch/languageSwitch";
import {
  navItemsFooter,
  navItemsFooterMobile,
  contactInfo,
  socialLinks,
} from "./linksData";
import { getArrowDownIcon } from "../../utils/icons";

export class Footer {
  render(container) {
    this.container = container;
    this.isBurgerActive = false;
    this.updateFooterContent();
  }

  updateFooterContent() {
    const navItems = this.isBurgerActive
      ? navItemsFooterMobile
      : navItemsFooter;

    this.container.innerHTML = `
      <div class="${styles.container}">
        <div class="${styles.topSection}">
          ${logo("#141719")}
          ${languageSwitch("footer")}
        </div>

        <div class="${styles.middleSection}">
          <div class="${styles.linksSection}">
            ${navItems
              .map(
                (section) => `
                <div class="${styles.itemContainer} ${styles.accordionSection}">
                  <h4 class="${styles.accordionHeader}">
                    ${section.title}
                    ${getArrowDownIcon()}
                  </h4>
                  <ul class="${styles.accordionContent}">
                    ${section.links
                      .map(
                        (link) =>
                          `<li><a href="${link.href || link.path}">${
                            link.text
                          }</a></li>`
                      )
                      .join("")}
                  </ul>
                </div>`
              )
              .join("")}
          </div>
          <div class="${styles.contacts}">
            <div class="${styles.contactList}">
              <h4>დაგვიკავშირდით:</h4>
              <ul>
                ${contactInfo
                  .map(
                    (info) => `<li><img src="${info.image}"/> ${info.text}</li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="${styles.socialLinks}">
              <h4>სოციალური ქსელები:</h4>
              <div>
                ${socialLinks
                  .map(
                    (
                      social
                    ) => `<a href="${social.href}" class="${styles.socialLink}">
                      ${social.icon}
                    </a>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="${styles.footerBottom}">
        <div class="${styles.footerBottomCt}">
          <div class="${styles.copyright}">
            ${getTbcLogo()}
            <span>2024 ყველა უფლება დაცულია<span>
          </div>
          <div class="${styles.termLinks}">
            <a href="#">კონფიდენციალურობა</a>
            <a href="#">წესები და პირობები</a>
          </div>
        </div>
      </div>
    `;

    this.container.className = styles.footer;

    this.addAccordionFunctionality();
  }

  setBurgerState(isActive) {
    this.isBurgerActive = isActive;
    this.updateFooterContent();
    if (isActive) {
      this.container.classList.add(styles.mobileNav);
    } else {
      this.container.classList.remove(styles.mobileNav);
    }
  }

  addAccordionFunctionality() {
    const accordionHeaders = this.container.querySelectorAll(
      `.${styles.accordionHeader}`
    );

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentHeader = e.currentTarget;
        const container = currentHeader.parentElement;
        if (!container) return;

        const isOpen = container.classList.contains(styles.active);

        accordionHeaders.forEach((otherHeader) => {
          const otherContainer = otherHeader.parentElement;
          if (otherHeader !== currentHeader && otherContainer) {
            otherContainer.classList.remove(styles.active);
            otherHeader.classList.remove(styles.headerActive);
          }
        });

        if (isOpen) {
          container.classList.remove(styles.active);
          currentHeader.classList.remove(styles.headerActive);
        } else {
          container.classList.add(styles.active);
          currentHeader.classList.add(styles.headerActive);
        }
      });
    });
  }
}