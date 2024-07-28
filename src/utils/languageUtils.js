export const getCurrentLanguage = () => {
  return localStorage.getItem("currentLang") || "ka";
};

export const setCurrentLanguage = (lang) => {
  localStorage.setItem("currentLang", lang);
};
