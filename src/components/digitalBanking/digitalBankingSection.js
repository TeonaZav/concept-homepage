import styles from "./digitalBankingSection.module.scss";

export class DigitalBankingSection {
  render(container) {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="${styles.bankingSection}">
        <div class="${styles.bankingContainer}">
          <div class="${styles.contentWrapper}">
            <div class="${styles.bankingContent}">
              <h2>ციფრული ბანკი</h2>
              <figure class="${styles.bankingImage}">
                <img src="/images/banking-section-image.png" alt="Phone Image"/>
              </figure>
              <p>შეასრულეთ საბანკო ოპერაციები დისტანციურად, ციფრული ბანკის დახმარებით</p>
              <div class="${styles.storeButtons}">
                <a href="https://play.google.com/store/apps/details?id=com.icomvision.bsc.tbc&hl=en" class="${styles.storeButton}"></a>
                <a href="https://apps.apple.com/us/app/tbc-bank/id766598432" class="${styles.storeButton}"></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
    );
  }
}
