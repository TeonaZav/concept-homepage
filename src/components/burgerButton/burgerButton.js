import styles from "./burgerButton.module.scss";

export class BurgerButton {
  constructor(onToggle) {
    this.onToggle = onToggle;
  }

  render(container) {
    container.innerHTML = `
      <button class="${styles.burgerBtn}" id="burgerBtn">
        <span></span>
        <span></span>
        <span></span>
      </button>
    `;

    const burgerBtn = container.querySelector("#burgerBtn");

    if (burgerBtn) {
      burgerBtn.addEventListener("click", (e) => {
        this.handleBurgerClick(e.currentTarget);
      });
    }
  }

  handleBurgerClick(burgerBtn) {
    const footer = document.getElementById("footer");
    const main = document.getElementById("main");

    if (footer && main) {
      const footerBottom = footer.lastElementChild;

      burgerBtn.classList.toggle(styles.active);

      const isActive = burgerBtn.classList.contains(styles.active);

      if (isActive) {
        footerBottom.style.flex = "1";
        main.style.display = "none";
        footer.style.marginTop = "8rem";
        console.log(isActive, footer.classList);
      } else {
        footerBottom.style.flex = "0";
        main.style.display = "flex";
        footer.style.marginTop = "0";
      }

      if (this.onToggle) {
        this.onToggle(isActive);
      }
    }
  }
}
