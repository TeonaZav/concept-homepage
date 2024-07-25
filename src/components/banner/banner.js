import styles from "./banner.module.scss";
import { getArrowIcon } from "../../utils/icons";

export class Banner {
  constructor(
    imageSrc,
    title,
    description,
    headingType = "h1",
    buttonText = "გამოიწერეთ",
    includeIcon = true
  ) {
    this.imageSrc = imageSrc || "./images/hero-banner.webp";
    this.title = title || "Default Title";
    this.description = description || "Default description.";
    this.headingType = headingType;
    this.buttonText = buttonText;
    this.includeIcon = includeIcon;
  }

  render(container) {
    const headingElement = `<${this.headingType}>${this.title}</${this.headingType}>`;
    const iconElement = this.includeIcon ? getArrowIcon() : "";

    container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="${styles.bannerSection}">
        <div class="${styles.bannerWrapper}"> 
          <div class="${styles.banner}" style="--bg-image: url('${this.imageSrc}')">
            <div class="${styles.textBox}">
              ${headingElement}
              <p>${this.description}</p>
              <a href="#" class="${styles.button}">
                ${iconElement}
                <span>${this.buttonText}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      `
    );

    const bannerElement = container.querySelector(`.${styles.banner}`);
    if (bannerElement) {
      bannerElement.style.setProperty("--bg-image", `url('${this.imageSrc}')`);
    } else {
      console.error("Banner element not found.");
    }
  }
}
