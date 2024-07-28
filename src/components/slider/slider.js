"use strict";
import styles from "./slider.module.scss";
import { getArrowIconLeft, getArrowIconRight } from "../../utils/icons";

export class Slider {
  /**
   * Initializes the Slider instance.
   * @param {Array} slides - The array of slide data objects.
   * @param {number|string} slidesPerView - The number of slides to display at a time, or 'auto' for auto width.
   * @param {number} spaceBetween - The space between slides in pixels.
   */
  constructor(slides, slidesPerView = 1, spaceBetween = 15) {
    this.slides = slides;
    this.currentIndex = 0;
    this.slidesPerView = slidesPerView;
    this.spaceBetween = spaceBetween;
    this.spaceBetweenRem = this.spaceBetween / 10; // Convert to rem
    this.totalSlides = slides.length;
    this.startX = 0;
    this.isSwiping = false;
    this.startScrollLeft = 0;
    this.isOverflowing = false;
    this.isScrolling = null;
    this.handleMove = this.handleMove.bind(this);
  }

 /**
   * Renders the slider component into the given container.
   * @param {HTMLElement} container - The container to render the slider in.
   */
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

/**
 * Renders a single slide.
 * @param {Object} slide - The slide data object.
 * @returns {string} - The HTML string for the slide.
 */
renderSlide(slide) {
  const slideContent = this.renderSlideContent(slide);
  return `
    <div class="${styles.slide}">
      ${slideContent}
    </div>`;
}

/**
 * Renders the content of a slide. Can be overridden by child classes.
 * @param {Object} slide - The slide data object.
 * @returns {string} - The HTML string for the slide content.
 */
renderSlideContent(slide) {
  return `
    <div class="${styles.imgWrapper}">
      <img src="${slide.image}" alt="${slide.alt}" class="${styles.bannerImg}">
    </div>
    <div class="${styles.content}">
      <h3 class="${styles.cardTitle}">${slide.title}</h3>
    </div>`;
}

  /**
   * Initializes event listeners for slider interactions.
   * @param {HTMLElement} container - The container element for the slider.
   */
  initEvents(container) {
    this.sliderWrapper = container.querySelector(`.${styles.sliderWrapper}`);
    this.prevButton = container.querySelector(`.${styles.prev}`);
    this.nextButton = container.querySelector(`.${styles.next}`);
    this.progressBar = container.querySelector(`.${styles.progressBar}`);
    this.progressBarContainer = container.querySelector(
      `.${styles.progressBarContainer}`
    );
    this.progressBarControlCt = container.querySelector(
      `.${styles.progressBarControlCt}`
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
    this.sliderWrapper.addEventListener("touchmove", this.handleMove);
    this.sliderWrapper.addEventListener("touchend", this.handleEnd.bind(this));
    this.sliderWrapper.addEventListener(
      "mousedown",
      this.handleStart.bind(this)
    );
    this.sliderWrapper.addEventListener("mousemove", this.handleMove);
    this.sliderWrapper.addEventListener("mouseup", this.handleEnd.bind(this));
    this.sliderWrapper.addEventListener(
      "mouseleave",
      this.handleEnd.bind(this)
    );

    if (this.isScrollable) {
      this.addProgressBarEvents();
    }
  }

  /**
   * Adds event listeners for the progress bar interactions.
   */
  addProgressBarEvents() {
    this.progressBarContainer.addEventListener(
      "mousedown",
      this.handleProgressBarContainerClick.bind(this)
    );
    this.progressBar.addEventListener(
      "mousedown",
      this.handleProgressBarMouseDown.bind(this)
    );
    this.progressBarContainer.addEventListener(
      "touchstart",
      this.handleProgressBarContainerClick.bind(this)
    );
    this.progressBar.addEventListener(
      "touchstart",
      this.handleProgressBarMouseDown.bind(this)
    );
  }

  /**
   * Handles click events on the progress bar container to update slider position.
   * @param {MouseEvent|TouchEvent} e - The event object.
   */
  handleProgressBarContainerClick(e) {
    if (!this.isScrollable) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    this.updateScrollFromProgressBar(clientX);
  }

  /**
   * Handles mouse down events on the progress bar for dragging functionality.
   * @param {MouseEvent|TouchEvent} e - The event object.
   */
  handleProgressBarMouseDown(e) {
    if (!this.isScrollable) return;
    e.preventDefault();
    this.isDraggingProgressBar = true;
    document.addEventListener(
      "mousemove",
      this.handleProgressBarMouseMove.bind(this)
    );
    document.addEventListener(
      "mouseup",
      this.handleProgressBarMouseUp.bind(this)
    );
    document.addEventListener(
      "touchmove",
      this.handleProgressBarMouseMove.bind(this)
    );
    document.addEventListener(
      "touchend",
      this.handleProgressBarMouseUp.bind(this)
    );
    this.handleProgressBarMouseMove(e);
  }

  /**
   * Handles mouse move events while dragging the progress bar.
   * @param {MouseEvent|TouchEvent} e - The event object.
   */
  handleProgressBarMouseMove(e) {
    if (!this.isDraggingProgressBar || !this.isScrollable) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    this.updateScrollFromProgressBar(clientX);
  }

  /**
   * Handles mouse up events after dragging the progress bar.
   */
  handleProgressBarMouseUp() {
    this.isDraggingProgressBar = false;
    document.removeEventListener(
      "mousemove",
      this.handleProgressBarMouseMove.bind(this)
    );
    document.removeEventListener(
      "mouseup",
      this.handleProgressBarMouseUp.bind(this)
    );
    document.removeEventListener(
      "touchmove",
      this.handleProgressBarMouseMove.bind(this)
    );
    document.removeEventListener(
      "touchend",
      this.handleProgressBarMouseUp.bind(this)
    );
  }

  /**
   * Updates the slider position based on the progress bar interaction.
   * @param {number} clientX - The x-coordinate of the client interaction.
   */
  updateScrollFromProgressBar(clientX) {
    const progressBarRect = this.progressBarContainer.getBoundingClientRect();
    const progressBarWidth = this.progressBar.offsetWidth;
    const maxProgressBarPosition = progressBarRect.width - progressBarWidth;
    const mouseX = clientX - progressBarRect.left;
    const progressRatio = Math.max(
      0,
      Math.min(mouseX / maxProgressBarPosition, 1)
    );
    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    this.sliderWrapper.scrollLeft = progressRatio * maxScrollLeft;
    this.updateProgressBar(false);
  }

  /**
   * Calculates the widths of the slides and applies them.
   */
  calculateSlideWidths() {
    let slideWidth;
    if (this.slidesPerView === "auto") {
      slideWidth = Math.max(
        ...Array.from(this.sliderWrapper.children).map(
          (slide) => slide.scrollWidth
        )
      );
    } else {
      const containerWidth = this.sliderWrapper.clientWidth / 10; 
      const totalSpaceBetween = (this.slidesPerView - 1) * (this.spaceBetween / 10); 
      slideWidth = (containerWidth - totalSpaceBetween) / this.slidesPerView; 
    }
  
    Array.from(this.sliderWrapper.children).forEach((slide, index, array) => {
      slide.style.width = `${slideWidth}rem`; 
  
      if (index < array.length - 1) {
        slide.style.marginRight = `${this.spaceBetween / 10}rem`; 
      } else {
        slide.style.marginRight = '0';
      }
    });
  }

  /**
   * Updates the slider settings based on the screen size.
   */
  updateResponsiveSettings() {
    this.setResponsiveConfig();
    this.calculateSlideWidths();
    this.updateProgressBar();
    this.updateButtonStates();
    this.checkScrollable();
  }

  /**
   * Sets the responsive configuration for the slider.
   */
  setResponsiveConfig() {
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
  }

  /**
   * Checks if the slider content is scrollable and updates related states and UI.
   */
  checkScrollable() {
    const containerWidth = this.sliderWrapper.clientWidth;
    const contentWidth = this.sliderWrapper.scrollWidth;
    this.isScrollable = contentWidth > containerWidth;

    this.progressBarControlCt.style.display = this.isScrollable ? "" : "none";
    this.sliderWrapper.style.overflowX = this.isScrollable ? "auto" : "hidden";
    this.sliderWrapper.classList.toggle(
      styles["is-grabbing"],
      this.isScrollable
    );

    if (this.isScrollable) {
      this.addProgressBarEvents();
    } else {
      this.removeProgressBarEvents();
    }
  }

  /**
   * Removes event listeners for the progress bar interactions.
   */
  removeProgressBarEvents() {
    this.progressBarContainer.removeEventListener(
      "mousedown",
      this.handleProgressBarContainerClick
    );
    this.progressBar.removeEventListener(
      "mousedown",
      this.handleProgressBarMouseDown
    );
    this.progressBarContainer.removeEventListener(
      "touchstart",
      this.handleProgressBarContainerClick
    );
    this.progressBar.removeEventListener(
      "touchstart",
      this.handleProgressBarMouseDown
    );
  }

  /**
   * Updates the progress bar position and size based on the slider state.
   * @param {boolean} [overscrolling=false] - Indicates if the slider is overscrolling.
   * @param {number} [translateX=0] - The amount to translate the progress bar.
   */
  updateProgressBar(overscrolling = false, translateX = 0) {
    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    const progressRatio = this.sliderWrapper.scrollLeft / maxScrollLeft;
    const progressBarWidth = window.innerWidth < 768 ? 12.7 : 30; 
    const maxProgressBarPosition =
      this.progressBarContainer.clientWidth / 10 - progressBarWidth;
    let progressPosition = progressRatio * maxProgressBarPosition;

    if (progressPosition < 0) progressPosition = 0;
    if (progressPosition > maxProgressBarPosition)
      progressPosition = maxProgressBarPosition;

    this.progressBar.style.width = `${progressBarWidth}rem`;

    if (overscrolling) {
      this.handleOverscroll(translateX, maxScrollLeft, progressPosition);
    } else {
      this.progressBar.style.transform = `translateX(${progressPosition}rem)`;
    }
  }

  /**
   * Handles the progress bar position when overscrolling.
   * @param {number} translateX - The translation in the X-axis.
   * @param {number} maxScrollLeft - The maximum scroll left position.
   * @param {number} progressPosition - The current progress position.
   */
  handleOverscroll(translateX, maxScrollLeft, progressPosition) {
    let overscroll = 0;
    if (this.sliderWrapper.scrollLeft <= 0) {
      overscroll = -this.sliderWrapper.scrollLeft;
    } else if (this.sliderWrapper.scrollLeft >= maxScrollLeft) {
      overscroll = this.sliderWrapper.scrollLeft - maxScrollLeft;
    }
    const translateBarWidth =
      (this.progressBar.offsetWidth / this.sliderWrapper.offsetWidth) *
      translateX;

    if (this.sliderWrapper.scrollLeft <= 0) {
      this.progressBar.style.transform = `translateX(${
        progressPosition - translateBarWidth
      }rem)`;
    } else if (this.sliderWrapper.scrollLeft >= maxScrollLeft) {
      this.progressBar.style.transform = `translateX(${
        progressPosition + translateBarWidth
      }rem)`;
    }
  }

  /**
   * Updates the states of the navigation buttons (prev/next).
   */
  updateButtonStates() {
    this.prevButton.disabled = this.sliderWrapper.scrollLeft === 0;
    this.nextButton.disabled =
      this.sliderWrapper.scrollLeft + this.sliderWrapper.clientWidth >=
      this.sliderWrapper.scrollWidth;
  }

  /**
   * Handles the click event on the previous button, moving the slider left.
   */
  handlePrevClick() {
    this.sliderWrapper.scrollLeft -=
      this.sliderWrapper.children[0].offsetWidth + this.spaceBetween;
    this.updateProgressBar();
    this.updateButtonStates();
  }

  /**
   * Handles the click event on the next button, moving the slider right.
   */
  handleNextClick() {
    this.sliderWrapper.scrollLeft +=
      this.sliderWrapper.children[0].offsetWidth + this.spaceBetween;
    this.updateProgressBar();
    this.updateButtonStates();
  }

  /**
   * Handles the scroll event on the slider wrapper, updating progress bar and button states.
   */
  handleScroll() {
    clearTimeout(this.isScrolling);
    this.sliderWrapper.classList.add(styles["is-scrolling"]);

    this.isScrolling = setTimeout(() => {
      this.sliderWrapper.classList.remove(styles["is-scrolling"]);
      this.checkOverflow();
    }, 100);

    this.updateProgressBar();
    this.updateButtonStates();
  }

  /**
   * Handles the start of a swipe gesture on the slider.
   * @param {MouseEvent|TouchEvent} e - The event object.
   */
  handleStart(e) {
    if (!this.isScrollable) return;
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startScrollLeft = this.sliderWrapper.scrollLeft;
    this.isSwiping = true;
    this.sliderWrapper.classList.add(styles["is-grabbing"]);
  }

  /**
   * Handles the movement during a swipe gesture on the slider.
   * @param {MouseEvent|TouchEvent} e - The event object.
   */
  handleMove(e) {
    if (this.isSwiping && this.sliderWrapper) {
      const currentX = e.touches ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - this.startX;
      const sensitivityFactor = 1;
      let newScrollLeft = this.startScrollLeft - deltaX * sensitivityFactor;
      const maxScrollLeft =
        this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
      const isAtLeftEdge = this.startScrollLeft === 0;
      const isAtRightEdge = this.startScrollLeft === maxScrollLeft;

      let overscroll = 0;
      if (isAtLeftEdge && newScrollLeft < 0) {
        overscroll = -newScrollLeft;
        newScrollLeft = 0;
      } else if (isAtRightEdge && newScrollLeft > maxScrollLeft) {
        overscroll = newScrollLeft - maxScrollLeft;
        newScrollLeft = maxScrollLeft;
      }

      this.sliderWrapper.scrollLeft = newScrollLeft;
      const translateX = isAtLeftEdge ? overscroll : -overscroll;
      this.sliderWrapper.style.transform = `translateX(${translateX}px)`;

      this.updateProgressBar(translateX ? true : false, overscroll);
    }
  }

  /**
   * Handles the end of a swipe gesture on the slider.
   */
  handleEnd() {
    this.isSwiping = false;
    this.sliderWrapper.classList.remove(styles["is-grabbing"]);

    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    const currentScrollLeft = this.sliderWrapper.scrollLeft;

    if (currentScrollLeft < 0 || currentScrollLeft > maxScrollLeft) {
      const targetScrollLeft = currentScrollLeft < 0 ? 0 : maxScrollLeft;
      this.animateBounceBack(targetScrollLeft);
    } else {
      this.resetTransform();
    }

    this.updateProgressBar(false);
  }

  /**
   * Animates the slider to bounce back to the nearest valid scroll position.
   * @param {number} targetScrollLeft - The target scroll position to bounce back to.
   */
  animateBounceBack(targetScrollLeft) {
    this.sliderWrapper.style.transition = "transform 0.5s ease-out";
    const translateX = targetScrollLeft - this.sliderWrapper.scrollLeft;
    this.sliderWrapper.style.transform = `translateX(${translateX}px)`;

    setTimeout(() => {
      this.resetTransform();
      this.sliderWrapper.scrollLeft = targetScrollLeft;
    }, 500);
  }

  /**
   * Resets the transform property of the slider wrapper.
   */
  resetTransform() {
    this.sliderWrapper.style.transition = "none";
    this.sliderWrapper.style.transform = "none";
    this.updateProgressBar(false);
  }

  /**
   * Checks if the slider has overflowed and corrects the scroll position if necessary.
   */
  checkOverflow() {
    const maxScrollLeft =
      this.sliderWrapper.scrollWidth - this.sliderWrapper.clientWidth;
    this.isOverflowing =
      this.sliderWrapper.scrollLeft < 0 ||
      this.sliderWrapper.scrollLeft > maxScrollLeft;
    if (this.isOverflowing) {
      const targetScrollLeft =
        this.sliderWrapper.scrollLeft < 0 ? 0 : maxScrollLeft;
      this.animateBounceBack(targetScrollLeft);
    }
  }
}
