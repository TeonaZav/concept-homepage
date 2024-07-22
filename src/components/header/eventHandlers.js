import styles from "./header.module.scss";

export const handleNavButtonClick = (
  event,
  navBtns,
  navDropdowns,
  headerDropdown
) => {
  const btn = event.currentTarget;
  const dropdownId = btn.getAttribute("data-dropdown");
  const dropdown = document.getElementById(dropdownId);

  const isDropdownVisible = dropdown.classList.contains(styles.show);

 
  navBtns.forEach((otherBtn) => {
    if (otherBtn !== btn) {
      otherBtn.classList.remove(styles.active);
    }
  });

  navDropdowns.forEach((d) => {
    if (d !== dropdown) {
      d.classList.remove(styles.show);
      d.classList.add(styles.hide);
      setTimeout(() => d.classList.remove(styles.hide), 600);
    }
  });


  if (isDropdownVisible) {
    dropdown.classList.remove(styles.show);
    dropdown.classList.add(styles.hide);
    setTimeout(() => dropdown.classList.remove(styles.hide), 600);
    btn.classList.remove(styles.active);
    headerDropdown.classList.remove(styles.show);
    headerDropdown.classList.add(styles.hide);
    setTimeout(() => headerDropdown.classList.remove(styles.hide), 600);
  } else {
    dropdown.classList.add(styles.show);
    btn.classList.add(styles.active);
    headerDropdown.classList.add(styles.show);
  }
};

export const handleDocumentClick = (
  event,
  navBtns,
  navDropdowns,
  headerDropdown
) => {
  const isClickInside = [headerDropdown, ...navBtns, ...navDropdowns].some(
    (element) => element.contains(event.target)
  );

  if (!isClickInside && headerDropdown.classList.contains(styles.show)) {
    navDropdowns.forEach((dropdown) => {
      dropdown.classList.remove(styles.show);
      dropdown.classList.add(styles.hide);
      setTimeout(() => dropdown.classList.remove(styles.hide), 600);
    });
    navBtns.forEach((btn) => btn.classList.remove(styles.active));
    headerDropdown.classList.remove(styles.show);
    headerDropdown.classList.add(styles.hide);
    setTimeout(() => headerDropdown.classList.remove(styles.hide), 600);
  }
};

