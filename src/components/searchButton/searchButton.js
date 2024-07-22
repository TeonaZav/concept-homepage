import { getSearchIcon } from "../../utils/icons";
import styles from "./searchButton.module.scss";

export class SearchButton {
  render(container) {
    container.innerHTML = `
        <button class="${styles.searchBtn}" id="searchBtn">
         ${getSearchIcon()}
        </button>
        <div id="searchDropdown" class="${styles.searchDropdown}">
         <div class=${styles.container}>
          <button class="${styles.closeBtn}" id="closeSearchBtn">✖</button>
          <input type="text" placeholder="Search by keyword" />
         </div>
        </div>
      `;

    const searchBtn = container.querySelector("#searchBtn");
    const searchDropdown = container.querySelector("#searchDropdown");
    const closeSearchBtn = container.querySelector("#closeSearchBtn");

    searchBtn.addEventListener("click", () => {
      searchDropdown.classList.add(styles.show);
      window.history.pushState({}, "", "/search");
    });

    closeSearchBtn.addEventListener("click", () => {
      searchDropdown.classList.remove(styles.show);
      window.history.pushState({}, "", "/");
    });
  }
}
