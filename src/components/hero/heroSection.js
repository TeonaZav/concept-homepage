import { Banner } from "../banner/banner";
import { getArrowIcon } from "../../utils/icons";
import styles from "./heroSection.module.scss";

export class HeroSection extends Banner {
  constructor(
    imageSrc = "./images/hero-banner.webp",
    title = "თიბისი კონცეპტი",
    description = "პერსონალური საბანკო მომსახურება, მორგებული თქვენს საჭიროებებსა და ინტერესებზე",
    buttonText = "გაიგეთ მეტი",
    includeIcon = true
  ) {
    super(imageSrc, title, description, "h1", buttonText, includeIcon);
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
