// Util functions

function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function main(_) {
  // Trigger hamburger menu open/close
  const navListCheckBoxEl = document.querySelector("nav .checkbox");
  const navListEl = document.querySelector(".nav-list");
  const hamburgerEl = document.querySelector(".hamburger-lines");
  const newsletterFormEl = document.querySelector("#sib-form");
  const submitButtonEl = document.querySelector("#submit-button");

  if (isVisible(hamburgerEl) && navListEl) {
    navListCheckBoxEl.addEventListener("click", (_) => {
      navListEl.classList.toggle("open");
    });
  }

  // Validates input on newsletter subscription
  if (newsletterFormEl) {
    newsletterFormEl.addEventListener("input", (_) => {
      const isAgreedToTerms = newsletterFormEl.elements["OPT_IN"].checked;
      const isValidEmail = validateEmail(
        newsletterFormEl.elements["EMAIL"].value
      );

      submitButtonEl.disabled = !(isAgreedToTerms && isValidEmail);
    });
  }
}

window.addEventListener("DOMContentLoaded", main);
