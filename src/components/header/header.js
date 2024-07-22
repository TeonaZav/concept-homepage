import styles from "./header.module.scss";
import { logo } from "../logo/logo";
import { navItems } from "./linksData";
import { handleNavButtonClick, handleDocumentClick } from "./eventHandlers";
import { languageSwitch } from "../languageSwitch/languageSwitch";
import { BurgerButton } from "../burgerButton/burgerButton";
import { SearchButton } from "../searchButton/searchButton";
import { getArrowIcon, getArrowUpIcon } from "../../utils/icons";

export class Header {
  render(container) {
    container.innerHTML = `
      <header class="${styles.header}">
        <div class="${styles.container}">
          <div class="${styles.logo}">
            ${logo("#555f62")}
          </div>
          <nav class="${styles.nav}">
            ${navItems
              .map(
                (item) => `
              <div class="${styles.navItem}">
                <button class="${styles.navBtn}" data-dropdown="${
                  item.dropdownId
                }">${item.text}</button>
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
            <img src="/images/credit-cards.png"/>
            <a href="#" class="${styles.linkButton}">
              ${getArrowUpIcon()}
              <span>ციფრული ბანკი</span>
            </a>            
           </div>
          </div>
        </div>
      </header>
    `;
    container.className = styles.header;

    this.addDropdownLogic();

    const headerActions = document.getElementById("headerActions");
    this.renderActions(headerActions);
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

  renderActions(container) {
    const searchButton = new SearchButton();
    const searchBtnContainer = document.createElement("div");
    container.appendChild(searchBtnContainer);
    searchButton.render(searchBtnContainer);

    container.innerHTML += `
    <a href="#" class="${styles.linkButton}">
      ${getArrowIcon()}
      <span>გამოიწერეთ ნაკრები</span>
    </a>
  `;

    container.insertAdjacentHTML("beforeend", languageSwitch("header"));

    const burgerButton = new BurgerButton();
    const burgerBtnContainer = document.createElement("div");
    container.appendChild(burgerBtnContainer);
    burgerButton.render(burgerBtnContainer);
  }
}
