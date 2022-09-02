// Matomo - Analytics setup
function setupAnalytics() {
  const _paq = (window._paq = window._paq || []);
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  const url = "//matomo.metaprovide.org/";
  _paq.push(["setTrackerUrl", url + "matomo.php"]);
  _paq.push(["setSiteId", "1"]);
  const g = document.createElement("script");
  const s = document.getElementsByTagName("script")[0];
  g.async = true;
  g.src = url + "matomo.js";
  s.parentNode.insertBefore(g, s);
}

// Util functions
function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isBlacklisted(subject, blacklist) {
  return blacklist.some((prohibited) => prohibited.test(subject));
}

const blacklistedEmailRegExes = [
  /^\S+@\S+\.ru$/,
  /^\S+@yangoogl.cc$/,
  /^\S+@course-fitness.com$/,
  /^\S+@eldorado-avtomaty.com$/,
  /^\S+@yandex.com$/,
];

const blacklistedTextRegexes = [
  /^.*intimate.*$/i,
  /^.*casino.*$/i,
  /^.*[\u4e00-\u9fa5].*$/, // chinease characters
  /^.*[\u0400-\u04FF].*$/, // russian characters
];

function sendInBluePost(url) {
  const successMessageWrapperEl = document.querySelector("#success-message");
  const errorMessageWrapperEl = document.querySelector("#error-message");

  successMessageWrapperEl.style.display = "none";
  errorMessageWrapperEl.style.display = "none";
  return fetch(url, { method: "POST" })
    .then((resp) => (successMessageWrapperEl.style.display = "block"))
    .catch((err) => (errorMessageWrapperEl.style.display = "block"));
}

function handleContactFormSubmit(ev) {
  ev.preventDefault();
  const errorMessageWrapperEl = document.querySelector("#error-message");
  const errorMessageEl = document.querySelector(
    "#error-message .sib-form-message-panel__inner-text"
  );
  const isValidEmail = validateEmail(ev.target.elements["EMAIL"].value);
  const isAcceptedEmail = !isBlacklisted(
    ev.target.elements["EMAIL"].value,
    blacklistedEmailRegExes
  );
  const isAcceptedMessage = !isBlacklisted(
    ev.target.elements["MESSAGE"].value,
    blacklistedTextRegexes
  );
  let customMessages = [];
  if (!isValidEmail) customMessages.push("Invalid email");
  if (!isAcceptedEmail) customMessages.push("Unacceptable email");
  if (!isAcceptedMessage) customMessages.push("Unaccptable message");
  if (!isValidEmail || !isAcceptedEmail || !isAcceptedMessage) {
    errorMessageEl.innerText =
      "Your message cannot be saved. " + customMessage.join(", ");
    errorMessageWrapperEl.style.display = "block";
    return;
  }

  sendInBluePost(
    "https://c357f7a2.sibforms.com/serve/MUIEAHshO2aQDmOk6-QyQcLnWoFoApB8_qwUDh5tToa_qX4ojBxrrl97k4eEVrTr7ar4RFFW1UeeffuKh4YZ0ak_xXO59w6TpGNylNZicUbCtj4EuaqZmJeTB-t_i_1mRETsdgoQcFyqEdzhCzft3KHRFwnsKf6ttjKh8njHHnjMZZcRk6NvgNZsmWQ92HIVNZOC9RKdtNiLSBkj"
  );
}

function handleNewsletterSubmit(ev) {
  ev.preventDefault();
  const errorMessageWrapperEl = document.querySelector("#error-message");
  const errorMessageEl = document.querySelector(
    "#error-message .sib-form-message-panel__inner-text"
  );
  const isValidEmail = validateEmail(ev.target.elements["EMAIL"].value);
  const isAcceptedEmail = !isBlacklisted(
    ev.target.elements["EMAIL"].value,
    blacklistedEmailRegExes
  );
  const isAgreedToTerms = ev.target.elements["OPT_IN"].checked;
  let customMessages = [];
  if (!isValidEmail) customMessages.push("Invalid email");
  if (!isAcceptedEmail) customMessages.push("Unacceptable email");
  if (!isAgreedToTerms) customMessages.push("Not agreed to terms");
  if (!isValidEmail || !isAcceptedEmail || !isAgreedToTerms) {
    errorMessageEl.innerText =
      "Your subscription cannot be saved. " + customMessage.join(", ");
    errorMessageWrapperEl.style.display = "block";
    return;
  }

  sendInBluePost(
    "https://c357f7a2.sibforms.com/serve/MUIEAKdLkyBf-gtNAPxrCwZYOujTDaz7WDt0PWmjoelUdASenwQhKDzHFp4X6Onqk7F3u985sk0AUpjedfa7W1QoXGq03uQOM5BVMn7rOnxPkhuvszEdY-I3_qKZu1j43cc4lnJgK_Csl7flGU9qdaqHDh-a3vuI1Fpfg0y1JbJoW-btLG2wQfFqAcFJqqeNuWTfknRFgtfRJVJZ"
  );
}

function main(_) {
  // Analytics
  setupAnalytics();

  // DOM Elements
  const navListCheckBoxEl = document.querySelector("nav .checkbox");
  const navListEl = document.querySelector(".nav-list");
  const hamburgerEl = document.querySelector(".hamburger-lines");
  const newsletterFormEl = document.querySelector("#newsletter-section form");
  const contactFormEl = document.querySelector("#contact-section form");
  const submitButtonEl = document.querySelector("#submit-button");

  // Trigger hamburger nav-menu open/close
  if (isVisible(hamburgerEl) && navListEl) {
    navListCheckBoxEl.addEventListener("click", (_) => {
      navListEl.classList.toggle("open");
    });
  }

  // Validates input on newsletter subscription
  if (newsletterFormEl) {
    newsletterFormEl.addEventListener("submit", handleNewsletterSubmit);

    newsletterFormEl.addEventListener("input", (_) => {
      const isAgreedToTerms = newsletterFormEl.elements["OPT_IN"].checked;
      const isValidEmail = validateEmail(
        newsletterFormEl.elements["EMAIL"].value
      );
      const isAcceptedEmail = !isBlacklisted(
        newsletterFormEl.elements["EMAIL"].value,
        blacklistedEmailRegExes
      );

      submitButtonEl.disabled = !(
        isAgreedToTerms &&
        isValidEmail &&
        isAcceptedEmail
      );
    });
  }

  // Validates input on contact form
  if (contactFormEl) {
    contactFormEl.addEventListener("submit", handleContactFormSubmit);
    contactFormEl.addEventListener("input", (_) => {
      const isValidEmail = validateEmail(contactFormEl.elements["EMAIL"].value);
      const isAcceptedEmail = !isBlacklisted(
        contactFormEl.elements["EMAIL"].value,
        blacklistedEmailRegExes
      );
      const isAccpetedMessage = !isBlacklisted(
        contactFormEl.elements["MESSAGE"].value,
        blacklistedTextRegexes
      );
      submitButtonEl.disabled = !(
        isValidEmail &&
        isAcceptedEmail &&
        isAccpetedMessage
      );
    });
  }
}

window.addEventListener("DOMContentLoaded", main);

