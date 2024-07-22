import { getFacebookIcon, getInstagramIcon } from "../../utils/icons";

export const navItemsFooter = [
  {
    title: "პროდუქტები",
    links: [
      { text: "ნაკრები", href: "#" },
      { text: "პერსონალური ბანკირი", href: "#" },
    ],
  },
  {
    title: "Lifestyle",
    links: [
      { text: "შეთავაზებები", href: "#" },
      { text: "ღონისძიებები", href: "#" },
    ],
  },
  {
    title: "კონცეპციის სერვისი",
    links: [
      { text: "ბიბლიოთეკა", href: "#" },
      { text: "კაფე", href: "#" },
    ],
  },
];

export const contactInfo = [
  { image: "/icons/phone-icon.svg", text: "+995 32 2 27 27 00" },
  { image: "/icons/email-icon.svg", text: "info@tbcconcept.ge" },
  { image: "/icons/location-icon.svg", text: "ფილიმონ ყიფიანი" },
];

export const socialLinks = [
  { href: "#", icon: getFacebookIcon() },
  { href: "#", icon: getInstagramIcon() },
];
