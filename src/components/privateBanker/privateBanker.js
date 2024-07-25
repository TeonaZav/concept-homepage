import { Banner } from "../banner/banner";
import { getArrowIcon } from "../../utils/icons";
import styles from "./privateBanker.module.scss";

export class PrivateBanker extends Banner {
  constructor(
    imageSrc = "./images/private-banker.png",
    title = "პირადი ბანკირი",
    description = "თქვენი სანდო პარტნიორი ფინანსურ რჩევებსა და ოპერაციებში",
    buttonText = "გაიგეთ მეტი",
    includeIcon = false
  ) {
    super(imageSrc, title, description, "h2", buttonText, includeIcon);
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
