import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Hero } from "../../components/hero/hero";
import { DigitalBankingSection } from "../../components/digitalBanking/digitalBankingSection";
import { StatsSection } from "../../components/statsSection/statsSection";
import { SelectPackageSection } from "../../components/selectPackage/selectPackage";
import { TextSection } from "../../components/textSection/textSection";
import { PrivateBanker } from "../../components/privateBanker/privateBanker";
export class Home {
  render() {
    const headerElement = document.getElementById("header");
    const mainElement = document.getElementById("main");
    const footerElement = document.getElementById("footer");

    const header = new Header();
    header.render(headerElement, (isActive) => {
      footer.setBurgerState(isActive);
    });

    const heroSection = new Hero();
    heroSection.render(mainElement);

    const textSection = new TextSection();
    textSection.render(mainElement);

    const selectPackageSection = new SelectPackageSection();
    selectPackageSection.render(mainElement);

    const statsSection = new StatsSection();
    statsSection.render(mainElement);

    const bankingSection = new DigitalBankingSection();
    bankingSection.render(mainElement);

    const privateBankerSection = new PrivateBanker();
    privateBankerSection.render(mainElement);

    const footer = new Footer();
    footer.render(footerElement);
  }
}
