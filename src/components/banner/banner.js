import styles from "./banner.module.scss";
import { getArrowIcon } from "../../utils/icons";

export class Banner {
  constructor(imageSrc, title, description, headingType = 'h1', buttonText = 'გამოიწერეთ', includeIcon = true) {
    this.imageSrc = imageSrc;
    this.title = title;
    this.description = description;
    this.headingType = headingType;
    this.buttonText = buttonText;
    this.includeIcon = includeIcon;
  }

  render(container) {
    const headingElement = `<${this.headingType} class="${styles.title}">${this.title}</${this.headingType}>`;
    const iconElement = this.includeIcon ? getArrowIcon() : '';

    container.insertAdjacentHTML(
      'beforeend',
      `
      <section class="${styles.bannerSection}">
        <div class="${styles.bannerWrapper}"> 
          <div class="${styles.banner}" style="background-image: url('${this.imageSrc}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
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
  }
}