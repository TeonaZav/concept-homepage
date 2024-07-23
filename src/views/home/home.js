import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Hero } from "../../components/hero/hero";
import { DigitalBankingSection } from "../../components/digitalBanking/digitalBankingSection";

export class Home {
  render() {
    const headerElement = document.getElementById("header");
    const mainElement = document.getElementById("main");
    const footerElement = document.getElementById("footer");

    const header = new Header();
    header.render(headerElement, (isActive) => {
      footer.setBurgerState(isActive);
    });
    const hero = new Hero();
    hero.render(mainElement);

    const bankingSection = new DigitalBankingSection();
    bankingSection.render(mainElement);

    const footer = new Footer();
    footer.render(footerElement);
  }
}
