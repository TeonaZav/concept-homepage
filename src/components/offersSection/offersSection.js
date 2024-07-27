import styles from "./offersSection.module.scss";
import { OffersSlider } from "..";
import { sectionHeader } from "../sectionHeader/sectionHeader";

export class OffersSection {
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
      <section class="${styles.offersSection}">
          ${sectionHeaderHTML}
        <div class="${styles.sliderContainer}">
          <div id="offers-slider" class="${styles.sliderWrapper}"></div>
        </div>
      </section>`
    );

    const slider = new OffersSlider(this.slides);
    slider.render(document.getElementById("offers-slider"));
  }
}
