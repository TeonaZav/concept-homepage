import styles from "./statsSection.module.scss";
import { formatNumber } from "../../utils/helpers";

export class StatsSection {
  constructor(data) {
    this.data = data || [
      { number: 94750, label: "მომხმარებელი" },
      { number: 150, label: "ლოკაცია" },
      { number: 130, label: "შეთავაზება" },
    ];
  }

  render(container) {
    const statsContent = this.data
      .map(
        (stat, index) => `
          <div class="${styles.statCard}">
            <div class="${styles.statNumber}">
              ${formatNumber(stat.number)}${index > 0 ? "+" : ""}
            </div>
            <div class="${styles.statLabel}">${stat.label}</div>
          </div>
        `
      )
      .join("");

    container.insertAdjacentHTML(
      "beforeend",
      `
        <section class="${styles.statsContainer}">
          ${statsContent}
        </section>
      `
    );
  }
}
