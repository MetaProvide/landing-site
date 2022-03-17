// Util functions
function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isBlacklisted(subject, blacklist) {
	return blacklist.some(prohibited => prohibited.test(subject));
}

const blacklistedEmailRegExes = [
	/^\S+@\S+\.ru$/,
	/^\S+@yangoogl.cc$/,
	/^\S+@course-fitness.com$/,
	/^\S+@eldorado-avtomaty.com$/,
	/^\S+@yandex.com$/
];

const blacklistedTextRegexes = [
	/^.*intimate.*$/i,
	/^.*casino.*$/i,
	/^.*[\u4e00-\u9fa5].*$/, // chinease characters
	/^.*[\u0400-\u04FF].*$/  // russian characters
];

function main(_) {
  const navListCheckBoxEl = document.querySelector("nav .checkbox");
  const navListEl = document.querySelector(".nav-list");
  const hamburgerEl = document.querySelector(".hamburger-lines");
  const newsletterFormEl = document.querySelector("#newsletter-section form");
  const contactFormEl = document.querySelector("#contact-section form");
  const submitButtonEl = document.querySelector("#submit-button");
  
  // Trigger hamburger menu open/close
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
      const isAcceptedEmail = !isBlacklisted(
        newsletterFormEl.elements["EMAIL"].value,
	blacklistedEmailRegExes
      );

      submitButtonEl.disabled = !(isAgreedToTerms && isValidEmail && isAcceptedEmail);
    });
  }

  // Validates input on contact form
  if (contactFormEl) {
    contactFormEl.addEventListener("input", (_) => {
      const isValidEmail = validateEmail(contactFormEl.elements["EMAIL"].value);
      const isAcceptedEmail = !isBlacklisted(contactFormEl.elements["EMAIL"].value, blacklistedEmailRegExes);
      const isAccpetedMessage = !isBlacklisted(contactFormEl.elements["MESSAGE"].value, blacklistedTextRegexes);
      submitButtonEl.disabled = !(isValidEmail && isAcceptedEmail && isAccpetedMessage );
    });
  }
}

window.addEventListener("DOMContentLoaded", main);
