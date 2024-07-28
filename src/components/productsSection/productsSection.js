import styles from "./productsSection.module.scss";

import { ProductSlider } from "../productsSlider/productsSlider";
import { sectionHeader } from "../sectionHeader/sectionHeader";

export class ProductsSection {
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
      <section class="${styles.productsSection}">
        ${sectionHeaderHTML}
      </section>`
    );

    const slider = new ProductSlider(this.slides);
    slider.render(container.querySelector(`.${styles.productsSection}`));
  }
}