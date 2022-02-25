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
  const newLetterformEl = document.querySelector('#sib-form');
  const submitButtonEl = document.querySelector('#submit-button');

  if (isVisible(hamburgerEl) && navListEl) {
    navListCheckBoxEl.addEventListener("click", (_) => {
      navListEl.classList.toggle("open");
    });
  }

  // Validates input on newsletter subscription
  if (newLetterformEl) {
    newLetterformEl.addEventListener('input', (_) => {
      const isAgreedToTerms = formEl.elements["OPT_IN"].checked
      const isValidEmail = validateEmail(formEl.elements["EMAIL"].value);

      submitButtonEl.disabled = !(isAgreedToTerms && isValidEmail)
    });
  }

}

window.addEventListener("DOMContentLoaded", main);
