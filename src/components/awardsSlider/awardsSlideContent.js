import styles from "./awardsSlider.module.scss";
/**
 * Generates the HTML content for an individual award slide.
 * @param {Object} slide - The data object representing the slide content.
 * @param {string} slide.image -  image path
 * @param {string} slide.alt - The alt text for the image.
 * @param {string} slide.title - The title text for the slide.
 * @param {string} slide.institution - The name of the awarding institution.
 * @returns {string} 
 */
export const awardsSlideContent = (slide) => {
  return `
  <div class="${styles.content}">
    <div class="${styles.companyLogo}">
      <img src="${slide.image}" alt="${slide.alt}">
    </div>
    <h3 class="${styles.cardTitle}">${slide.title}</h3>
    <p class="${styles.institution}">${slide.institution}</p>
  </div>
`;
};
