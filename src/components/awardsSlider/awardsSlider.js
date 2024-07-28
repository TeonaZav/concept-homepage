import { Slider } from "../slider/slider";
import sliderStyles from "../slider/slider.module.scss";
import { awardsSlideContent } from "./awardsSlideContent";

export class AwardsSlider extends Slider {
  renderSlideContent(slide) {
    return awardsSlideContent(slide);
  }

  /**
   * Renders a single slide, including any specific parent styling needed for the AwardsSlider.
   * Overrides the renderSlide method from the parent Slider class.
   * @param {Object} slide - The data object representing the slide content.
   */

  renderSlide(slide) {
    return `
      <div class="${sliderStyles.slide} ${sliderStyles.awardsSlideParent}">
        ${this.renderSlideContent(slide)}
      </div>
    `;
  }
}
