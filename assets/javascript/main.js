function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

function main(_) {
  // Trigger hamburger menu open/close
  const navListCheckBoxEl = document.querySelector("nav .checkbox");
  const navListEl = document.querySelector(".nav-list");
  const hamburgerEl = document.querySelector(".hamburger-lines");

  if (isVisible(hamburgerEl) && navListEl) {
    navListCheckBoxEl.addEventListener("click", (_) => {
      navListEl.classList.toggle("open");
    });
  }
}

window.addEventListener("DOMContentLoaded", main);
