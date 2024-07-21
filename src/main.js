import "./styles/main.scss";

import { Home } from "./views/home/home";

document.addEventListener("DOMContentLoaded", () => {
  const home = new Home();
  home.render();
});
