import {
  Header,
  Footer,
  Hero,
  DigitalBankingSection,
  StatsSection,
  SelectPackageSection,
  TextSection,
  PrivateBanker,
  OffersSection,
  ProductsSection,
  AwardsSection,
} from "../../components";
import { awardsSlides } from "../../components/awardsSlider/data";
import { offerSlides } from "../../components/offersSlider/data";
import { productsSlides } from "../../components/productsSlider/data";

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

    const offersSection = new OffersSection(
      offerSlides,
      "შეთავაზებები",
      "ყველა შეთავაზება",
      "/all-offers"
    );
    offersSection.render(mainElement);

    const bankingSection = new DigitalBankingSection();
    bankingSection.render(mainElement);

    const productsSection = new ProductsSection(
      productsSlides,
      "პროდუქტები",
      "",
      "#"
    );
    productsSection.render(mainElement);

    const privateBankerSection = new PrivateBanker();
    privateBankerSection.render(mainElement);

    const awardsSection = new AwardsSection(
      awardsSlides,
      "ჯილდოები",
      "",
      "#"
    );
    awardsSection.render(mainElement);

    const footer = new Footer();
    footer.render(footerElement);
  }
}
