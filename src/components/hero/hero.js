import { Banner } from "../banner/banner";
import { getArrowIcon } from "../../utils/icons";
import styles from "./hero.module.scss";

export class Hero extends Banner {
  constructor(data, includeIcon = true) {
    console.log(data);
    super(
      data?.imageSrc,
      data?.title,
      data?.description,
      "h1",
      data?.buttonText,
      includeIcon
    );
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
