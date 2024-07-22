import styles from "./footer.module.scss";
import { getTbcLogo } from "../../utils/icons";
import { logo } from "../logo/logo";
import { languageSwitch } from "../languageSwitch/languageSwitch";
import { navItemsFooter, contactInfo, socialLinks } from "./linksData";

export class Footer {
  render(container) {
    container.innerHTML = `
      <div class="${styles.container}">
        <div class="${styles.topSection}">
          ${logo("#141719")}
          ${languageSwitch("footer")}
        </div>

        <div class="${styles.middleSection}">
          <div class="${styles.linksSection}">
            ${navItemsFooter
              .map(
                (section) => `
                <div class="${styles.itemContainer}">
                  <h4>${section.title}</h4>
                  <ul> ${section.links
                    .map(
                      (link) =>
                        `<li><a href="${link.href}">${link.text}</a></li>`
                    )
                    .join("")}
                    
                  </ul>
            
                </div>`
              )
              .join("")}
          </div>
          <div class="${styles.contacts}">
            <div class="${styles.contactList}"> 
              <h4>დაგვიკავშირდით:</h4>
               <ul> 
              ${contactInfo
                .map(
                  (info) => `<li><img src="${info.image}"/> ${info.text}</li>`
                )
                .join("")}
              </ul>
            </div>
            <div class="${styles.socislLinks}"> 
              <h4>სოციალური ქსელები:</h4>
              ${socialLinks
                .map(
                  (
                    social
                  ) => `<a href="${social.href}" class="${styles.socialLink}">
                    ${social.icon}
                  </a>`
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
      <div class="${styles.footerBottom}">
        <div class="${styles.footerBottomCt}"> 
          <div class="${styles.copyright}"> 
            ${getTbcLogo()}
            <span>2024 ყველა უფლება დაცულია<span>
          </div>
          <div class="${styles.termLinks}"> 
            <a href="#">კონფიდენციალურობა</a>
            <a href="#">წესები და პირობები</a>
          </div>
        </div>
      </div>
    `;

    container.className = styles.footer;
  }
}
