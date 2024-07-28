import { getFacebookIcon, getInstagramIcon } from "../../utils/icons";

export const footerData = {
  navItemsFooter: [
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
  ],
  navItemsFooterMobile: [
    {
      title: "პროდუქტები",
      dropdownId: "products-links",
      links: [
        { text: "პროდუქტების მიმოხილვა", href: "#" },
        { text: "ნაკრები", href: "#" },
        { text: "პირადი ბანკირი", href: "#" },
      ],
    },
    {
      title: "შეთავაზებები",
      dropdownId: "offers-links",
      links: [
        { text: "მიმოხილვა", href: "#" },
        { text: "შეთავაზებები", href: "#" },
        { text: "ღონისძიებები", href: "#" },
      ],
    },
    {
      title: "კონცეპტის სივრცე",
      dropdownId: "space-links",
      links: [
        { text: "მიმოხილვა", href: "#" },
        { text: "კაფე", href: "#" },
        { text: "ბიბლიოთეკა", href: "#" },
        { text: "კონცეპტ ფილილალები", href: "#" },
      ],
    },
  ],
  contactInfo: {
    data: [
      { image: "/icons/phone-icon.svg", text: "+995 32 2 27 27 00" },
      { image: "/icons/email-icon.svg", text: "info@tbcconcept.ge" },
      { image: "/icons/location-icon.svg", text: "ფილიმონ ყიფიანი" },
    ],
    title: "დაგვიკავშირდით",
  },

  socialLinks: {
    data: [
      { href: "#", icon: getFacebookIcon() },
      { href: "#", icon: getInstagramIcon() },
    ],
    title: "სოციალური ქსელები",
  },
  language: "georgian",

  copyright: {
    text: "2024 ყველა უფლება დაცულია",
    links: [
      { path: "#", text: "კონფიდენციალურობა" },
      { path: "#", text: "წესები და პირობები" },
    ],
  },
};
