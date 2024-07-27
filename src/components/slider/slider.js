import { getArrowIconLeft, getArrowIconRight } from "../../utils/icons";

import styles from "./slider.module.scss";

export class Slider {
  constructor(slides, slidesPerView = 1, spaceBetween = 15) {
    this.slides = slides;
    this.currentIndex = 0;
    this.slidesPerView = slidesPerView;
    this.spaceBetween = spaceBetween;
    this.totalSlides = slides.length;
    this.startX = 0;
    this.isSwiping = false;
    this.startScrollLeft = 0;
    this.isOverflowing = false; 
  }

  render(container) {
    container.insertAdjacentHTML(
      "beforeend",
      `
          <div class="${styles.sliderContainer}">
            <div class="${styles.sliderWrapper}">
              ${this.slides.map((slide) => this.renderSlide(slide)).join("")}
            </div>
            <div class="${styles.progressBarControlCt}">  
              <div class="${styles.progressBarContainer}">
                <div class="${styles.progressBar}"></div>
              </div>  
              <div class="${styles.sliderControls}">
                <button class="${styles.sliderButton} ${styles.prev}" disabled>
                  ${getArrowIconLeft()}
                </button>
                <button class="${styles.sliderButton} ${styles.next}">
                  ${getArrowIconRight()}
                </button>
              </div>
            </div>
          </div>`
    );

    this.initEvents(container);
  }

  renderSlide(slide) {
    return `
        <div class="${styles.slide}">
          ${this.renderSlideContent(slide)}
        </div>`;
  }

  renderSlideContent(slide) {
    return `
        <div class="${styles.imgWrapper}">
          <img src="${slide.image}" alt="${slide.alt}" class="${styles.bannerImg}">
        </div>
        <div class="${styles.content}">
          <h3 class="${styles.cardTitle}">${slide.title}</h3>
        </div>`;
  }

  initEvents(container) {
    this.sliderWrapper = container.querySelector(`.${styles.sliderWrapper}`);
    this.prevButton = container.querySelector(`.${styles.prev}`);
    this.nextButton = container.querySelector(`.${styles.next}`);
    this.progressBar = container.querySelector(`.${styles.progressBar}`);
    this.progressBarContainer = container.querySelector(
      `.${styles.progressBarContainer}`
    );

    this.updateResponsiveSettings();
    window.addEventListener("resize", this.updateResponsiveSettings.bind(this));

    this.prevButton.addEventListener("click", this.handlePrevClick.bind(this));
    this.nextButton.addEventListener("click", this.handleNextClick.bind(this));

    this.sliderWrapper.addEventListener("scroll", this.handleScroll.bind(this));
    this.sliderWrapper.addEventListener(
      "touchstart",
      this.handleStart.bind(this)
    );
    this.sliderWrapper.addEventListener("touchmove", (e) => this.handleMove(e));
    this.sliderWrapper.addEventListener("touchend", (e) => this.handleEnd(e));
    this.sliderWrapper.addEventListener(
      "mousedown",
      this.handleStart.bind(this)
    );
    this.sliderWrapper.addEventListener("mousemove", (e) => this.handleMove(e));
    this.sliderWrapper.addEventListener("mouseup", (e) => this.handleEnd(e));
    this.sliderWrapper.addEventListener("mouseleave", (e) => this.handleEnd(e));
  }

  calculateSlideWidths() {
    let slideWidth;
    if (this.slidesPerView === "auto") {
      slideWidth = Math.max(
        ...Array.from(this.sliderWrapper.children).map(
          (slide) => slide.scrollWidth
        )
      );
    } else {
      const containerWidth = this.sliderWrapper.clientWidth;
      slideWidth =
        (containerWidth - (this.slidesPerView - 1) * this.spaceBetween) /
        this.slidesPerView;
    }

    Array.from(this.sliderWrapper.children).forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.marginRight = `${this.spaceBetween}px`;
    });
  }

  updateResponsiveSettings() {
    if (window.innerWidth < 600) {
      this.slidesPerView = 1;
      this.spaceBetween = 15;
    } else if (window.innerWidth < 1024) {
      this.slidesPerView = 2;
      this.spaceBetween = 15;
    } else {
      this.slidesPerView = 3;
      this.spaceBetween = 30;
    }

    this.calculateSlideWidths();
    this.updateProgressBar();
    this.updateButtonStates();
  }

  //TODO დავამატო პროგრესბარს ანიმაცია
  updateProgressBar() {
    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    const progressRatio = this.sliderWrapper.scrollLeft / maxScrollLeft;
    const progressBarWidth = window.innerWidth < 768 ? 127 : 300;

    const maxProgressBarPosition =
      this.progressBarContainer.clientWidth - progressBarWidth;
    let progressPosition = progressRatio * maxProgressBarPosition;

    progressPosition = Math.max(
      0,
      Math.min(progressPosition, maxProgressBarPosition)
    );

    this.progressBar.style.width = `${progressBarWidth}px`;
    this.progressBar.style.transform = `translateX(${progressPosition}px)`;

    this.checkOverflow();
  }

  updateButtonStates() {
    this.prevButton.disabled = this.sliderWrapper.scrollLeft === 0;
    this.nextButton.disabled =
      this.sliderWrapper.scrollLeft + this.sliderWrapper.clientWidth >=
      this.sliderWrapper.scrollWidth;
  }

  handlePrevClick() {
    this.sliderWrapper.scrollLeft -=
      this.sliderWrapper.children[0].offsetWidth + this.spaceBetween;
    this.updateProgressBar();
    this.updateButtonStates();
  }

  handleNextClick() {
    this.sliderWrapper.scrollLeft +=
      this.sliderWrapper.children[0].offsetWidth + this.spaceBetween;
    this.updateProgressBar();
    this.updateButtonStates();
  }

  handleScroll() {
    clearTimeout(this.isScrolling);
    this.sliderWrapper.classList.add(styles["is-scrolling"]);

    this.isScrolling = setTimeout(() => {
      this.sliderWrapper.classList.remove(styles["is-scrolling"]);
    }, 100);

    this.updateProgressBar();
    this.updateButtonStates();
  }

  handleStart(e) {
    e.preventDefault();
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startScrollLeft = this.sliderWrapper.scrollLeft;
    this.isSwiping = true;
    this.sliderWrapper.classList.add(styles["is-grabbing"]);
  }

  handleMove(e) {
    if (this.isSwiping) {
      const currentX = e.touches ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - this.startX;
      const newScrollLeft = this.startScrollLeft - deltaX;

      if (
        newScrollLeft < 0 ||
        newScrollLeft >
          this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth
      ) {
        this.isOverflowing = true;
        this.sliderWrapper.style.transform = `translateX(${deltaX / 2}px)`;
      } else {
        this.isOverflowing = false;
        this.sliderWrapper.style.transform = "none";
        this.sliderWrapper.scrollLeft = newScrollLeft;
      }
    }
    console.log("handleMove - isOverflowing:", this.isOverflowing);
  }

  handleEnd() {
    this.isSwiping = false;
    this.sliderWrapper.classList.remove(styles["is-grabbing"]);

    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;

    if (this.sliderWrapper.scrollLeft < 0) {
      this.isOverflowing = true;
      this.animateBounceBack(0);
    } else if (this.sliderWrapper.scrollLeft > maxScrollLeft) {
      this.isOverflowing = true;
      this.animateBounceBack(maxScrollLeft);
    } else {
      this.isOverflowing = false;
      this.sliderWrapper.style.transition = "none";
      this.sliderWrapper.style.transform = "none";
    }
    console.log("handleEnd - isOverflowing:", this.isOverflowing);
  }

  animateBounceBack(targetScrollLeft) {
    this.sliderWrapper.style.transition = "transform 0.5s ease-out";
    this.sliderWrapper.style.transform = `translateX(${
      targetScrollLeft - this.sliderWrapper.scrollLeft
    }px)`;
    setTimeout(() => {
      this.sliderWrapper.style.transition = "none";
      this.sliderWrapper.style.transform = "none";
      this.sliderWrapper.scrollLeft = targetScrollLeft;
    }, 500);
  }

  checkOverflow() {
    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    this.isOverflowing =
      this.sliderWrapper.scrollLeft < 0 ||
      this.sliderWrapper.scrollLeft > maxScrollLeft;
    console.log("checkOverflow - isOverflowing:", this.isOverflowing);
  }
}
