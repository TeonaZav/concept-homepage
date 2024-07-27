import { Slider } from "../slider/slider";
import { offerSlideContent } from "./offerSlideContent";

export class OffersSlider extends Slider {
  renderSlideContent(slide) {
    return offerSlideContent(slide);
  }
}
