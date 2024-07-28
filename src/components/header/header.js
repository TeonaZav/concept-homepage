import styles from "./header.module.scss";
import { logo } from "../logo/logo";
import { handleNavButtonClick, handleDocumentClick } from "./eventHandlers";
import { languageSwitch } from "../languageSwitch/languageSwitch";
import { BurgerButton } from "../burgerButton/burgerButton";
import { SearchButton } from "../searchButton/searchButton";
import { getArrowIcon, getArrowUpIcon } from "../../utils/icons";


export class Header {
  constructor(translations) {
    this.translations = translations;
    console.log(this.translations.navItems);
  }

  render(container, onBurgerToggle) {
    container.innerHTML = `
      <header class="${styles.header}">
        <div class="${styles.wrapper}">
          <div class="${styles.container}">
            <div class="${styles.logo}">
              ${logo("#555f62", this.translations.language)}
            </div>
            <nav class="${styles.nav}">
              ${this.translations.navItems
                .map(
                  (item) => `
                <div class="${styles.navItem}">
                  <button class="${styles.navBtn}" data-dropdown="${
                    item.dropdownId
                  }">
                    ${item.text}
                  </button>
                  <div id="${item.dropdownId}" class="${styles.navDropdown}">
                    <ul>
                      ${item.links
                        .map(
                          (link) =>
                            `<li><a href="${link.path}">${link.text}</a></li>`
                        )
                        .join("")}
                    </ul>
                  </div>
                </div>`
                )
                .join("")}
            </nav>
            <div class="${styles.actions}" id="headerActions"></div>
          </div>
          <div id="headerDropdown" class="${styles.headerDropdown}">
            <div class="${styles.dropdownContainer}">
              <div class="${styles.dropdownContent}">
                <img src="/images/credit-cards.png" class="${
                  styles.dropdownImage
                }" loading="lazy" />
                <a href="#" class="${styles.linkButton}">
                  ${getArrowUpIcon()}
                  <span>ციფრული ბანკი</span>
                </a>            
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
    container.className = styles.header;

    this.addDropdownLogic();

    const headerActions = document.getElementById("headerActions");
    this.renderActions(headerActions, onBurgerToggle);
  }

  addDropdownLogic() {
    const navBtns = Array.from(document.querySelectorAll(`.${styles.navBtn}`));
    const navDropdowns = Array.from(
      document.querySelectorAll(`.${styles.navDropdown}`)
    );
    const headerDropdown = document.getElementById("headerDropdown");

    navBtns.forEach((btn) => {
      btn.addEventListener("click", (event) =>
        handleNavButtonClick(event, navBtns, navDropdowns, headerDropdown)
      );
    });

    document.addEventListener("click", (event) =>
      handleDocumentClick(event, navBtns, navDropdowns, headerDropdown)
    );
  }

  renderActions(container, onBurgerToggle) {
  
    const searchButton = new SearchButton();
    const searchBtnContainer = document.createElement("div");
    container.appendChild(searchBtnContainer);
    searchButton.render(searchBtnContainer);


    container.innerHTML += `
      <a href="#" class="${styles.linkButton}">
        ${getArrowIcon()}
        <span>${this.translations.navLinkText}</span>
      </a>
    `;

 
    const languageSwitchHTML = languageSwitch("header");
    container.insertAdjacentHTML("beforeend", languageSwitchHTML);


    const burgerButton = new BurgerButton(onBurgerToggle);
    const burgerBtnContainer = document.createElement("div");
    container.appendChild(burgerBtnContainer);
    burgerButton.render(burgerBtnContainer);
  }
}
