import styles from "./productsSlider.module.scss";
import sliderStyles from "../slider/slider.module.scss";

export const productsSlideContent = (slide) => {
  return `
    <div class="${sliderStyles.imgWrapper}">
      <img src="${slide.image}" alt="${slide.alt}" class="${sliderStyles.bannerImg}">
    </div>
    <div class="${styles.content}">
      <h3 class="${styles.cardTitle}">${slide.title}</h3>
      <div class="${styles.description}">
        ${slide.description}
      </div>
    </div>`;
};
