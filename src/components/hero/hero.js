import { Banner } from "../banner/banner";
import { getArrowIcon } from "../../utils/icons";
import styles from "./hero.module.scss";

export class Hero extends Banner {
  constructor(
    imageSrc = './images/hero-banner.webp',
    title = 'თიბისი კონცეპტი',
    description = 'პერსონალური საბანკო მომსახურება, მორგებული თქვენს საჭიროებებსა და ინტერესებზე',
    buttonText = 'გამოიწერეთ',
    includeIcon = true
  ) {
    super(imageSrc, title, description, 'h1', buttonText, includeIcon);
  }

  render(container) {
    super.render(container);

    if (this.includeIcon) {
      const button = container.querySelector(`.${styles.button}`);
      if (button) {
        button.innerHTML = `${getArrowIcon()} <span>${this.buttonText}</span>`;
      }
    }
  }
}