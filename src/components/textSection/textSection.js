import styles from "./textSection.module.scss";

export class TextSection {
  constructor(text) {
    this.text =
      text ||
      "გამოიწერეთ თიბისი კონცეპტის ნაკრები და ისარგებლეთ როგორც საბანკო, ისე არასაბანკო უპირატესობებით.";
  }

  render(container) {
    const textContent = `
        <section class="${styles.textSection}">
          <div class="${styles.textBox}"> 
            <p>${this.text}</p>
          </div>
        </section>
      `;

    container.insertAdjacentHTML("beforeend", textContent);
  }
}
