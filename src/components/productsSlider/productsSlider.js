import { Slider } from "../slider/slider";
import { productsSlideContent } from "./productsSlideContent";

export class ProductSlider extends Slider {
  renderSlideContent(slide) {
    return productsSlideContent(slide);
  }
}
