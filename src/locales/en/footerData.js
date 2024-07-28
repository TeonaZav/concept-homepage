import { getFacebookIcon, getInstagramIcon } from "../../utils/icons";

export const footerData = {
  navItemsFooter: [
    {
      title: "Products",
      links: [
        { text: "Packages", href: "#" },
        { text: "Private Banker", href: "#" },
      ],
    },
    {
      title: "Lifestyle",
      links: [
        { text: "Offers", href: "#" },
        { text: "Events", href: "#" },
      ],
    },
    {
      title: "Concept Space",
      links: [
        { text: "Library", href: "#" },
        { text: "Cafe", href: "#" },
      ],
    },
  ],
  navItemsFooterMobile: [
    {
      title: "Products",
      dropdownId: "products-links",
      links: [
        { text: "Overview", href: "#" },
        { text: "Packages", href: "#" },
        { text: "Private Banker", href: "#" },
      ],
    },
    {
      title: "Offers",
      dropdownId: "offers-links",
      links: [
        { text: "Overview", href: "#" },
        { text: "Offers", href: "#" },
        { text: "Events", href: "#" },
      ],
    },
    {
      title: "Contept space",
      dropdownId: "space-links",
      links: [
        { text: "overview", href: "#" },
        { text: "Cafe", href: "#" },
        { text: "Library", href: "#" },
        { text: "Tbc Concept Branches", href: "#" },
      ],
    },
  ],
  contactInfo: {
    title: "Contact us",
    data: [
      { image: "/icons/phone-icon.svg", text: "+995 32 2 27 27 00" },
      { image: "/icons/email-icon.svg", text: "info@tbcconcept.ge" },
      { image: "/icons/location-icon.svg", text: "Branches" },
    ],
  },

  socialLinks: {
    data: [
      { href: "#", icon: getFacebookIcon() },
      { href: "#", icon: getInstagramIcon() },
    ],
    title: "follow us",
  },
  language: "english",

  copyright: {
    text: "2024 All rights reserved",
    links: [
      { path: "#", text: "Privacy policy" },
      { path: "#", text: "Terms" },
    ],
  },
};
