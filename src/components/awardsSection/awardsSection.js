import styles from "./awardsSection.module.scss";
import { AwardsSlider } from "..";
import { sectionHeader } from "../sectionHeader/sectionHeader";

export class AwardsSection {
  constructor(slides, sectionTitle, linkText, linkHref) {
    this.slides = slides;
    this.sectionTitle = sectionTitle;
    this.linkText = linkText;
    this.linkHref = linkHref;
  }

  render(container) {
    const sectionHeaderHTML = sectionHeader(
      this.sectionTitle,
      this.linkText,
      this.linkHref
    );

    container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="${styles.awardsSection}">
        ${sectionHeaderHTML}
      </section>`
    );

    const slider = new AwardsSlider(this.slides);
    slider.render(container.querySelector(`.${styles.awardsSection}`));
  }
}
