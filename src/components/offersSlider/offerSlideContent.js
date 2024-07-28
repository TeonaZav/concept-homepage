import styles from "./offersSlider.module.scss";
import sliderStyles from "../slider/slider.module.scss";

export const offerSlideContent = (slide) => {
  return `
    <div class="${sliderStyles.imgWrapper}">
      <img src="${slide.image}" alt="${slide.alt}" class="${
    sliderStyles.bannerImg
  }">
      <div class="${sliderStyles.logo}"><img src="${slide.logo}" alt="${
    slide.alt
  }"></div>
    </div>
    <div class="${styles.content}">
      <div class="${styles.categoryWrap}">
        ${slide.categories
          .map(
            (category) => `<p class="${styles.cardCategory}">${category}</p>`
          )
          .join("")}
      </div>
      <h3 class="${styles.cardTitle}">${slide.title}</h3>
    </div>`;
};
