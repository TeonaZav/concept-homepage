import styles from "./burgerButton.module.scss";

export class BurgerButton {
    render(container) {
      container.innerHTML = `
          <button class="${styles.burgerBtn}" id="burgerBtn">
            <span class="${styles.burgerBtnLine}"></span>
            <span class="${styles.burgerBtnLine}"></span>
            <span class="${styles.burgerBtnLine}"></span>
          </button>
        `;
  
      const burgerBtn = container.querySelector("#burgerBtn");
      burgerBtn.addEventListener("click", () => {
        this.handleBurgerClick(burgerBtn);
      });
    }
  
    handleBurgerClick(burgerBtn) {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const main = document.getElementById("main");

      burgerBtn.classList.toggle(styles.active);
  
      if (burgerBtn.classList.contains(styles.active)) {
        footer.style.flex = "1";
        main.style.display = "none";
      } else {
        footer.style.flex = "0";
        main.style.display = "flex";
      }
    }
  }
