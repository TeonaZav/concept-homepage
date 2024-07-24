import styles from "./selectPackage.module.scss";
import { getArrowIcon } from "../../utils/icons";

export class SelectPackageSection {
  constructor(data) {
    this.data = data || [
      {
        title: "ციფრული",
        image: "/images/select-package-1.png",
        link: "#",
        linkText: "იხილეთ მეტი",
      },
      {
        title: "360",
        image: "/images/select-package-2.png",
        link: "#",
        linkText: "იხილეთ მეტი",
      },
      {
        title: "პრემიუმი",
        image: "/images/select-package-3.png",
        link: "#",
        linkText: "იხილეთ მეტი",
      },
    ];
  }

  render(container) {
    const packagesContent = this.data
      .map(
        (pkg, index) => `
              <div class="${styles.packageCard} ${
          index === 1 ? styles.largeCard : ""
        }">
                <img src="${pkg.image}" alt="${pkg.title}" class="${
          styles.packageImage
        }" loading="lazy">
                <div class="${styles.packageDetails}">
                  <h3 class="${styles.packageTitle}">${pkg.title}</h3>
                  <a href="${pkg.link}">
                   ${getArrowIcon()} ${pkg.linkText}
                  </a>
                </div>
              </div>
            `
      )
      .join("");

    container.insertAdjacentHTML(
      "beforeend",
      `
          <section class="${styles.selectPackageSection}">
            <div class="${styles.selectPackageContainer}">
              <h2>შეარჩიეთ ნაკრები</h2>
              <div class="${styles.packagesGrid}">
                ${packagesContent}
              </div>
            </div>
          </section>
          `
    );
  }
}
