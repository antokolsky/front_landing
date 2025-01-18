import { respondents } from "../../api/respodents";

export const subscribeForm = () => {
  document
    .querySelector(".subscribe__form")
    .addEventListener("submit", (event) => {
      clearErrors();
      event.preventDefault();
      if (localStorage.getItem("respondents") === "true") {
        return;
      }
      const form = event.target;

      const {
        organization_website,
        email,
        country,
        activity_type,
        organization,
      } = form;

      respondents({
        email: email.value,
        country: country.value,
        organization: organization.value,
        organization_website: organization_website.value,
        activity_type: activity_type.value,
      })
        .then((res) => {
          if (res.ok === false) throw res.json();
          return res.json();
        })
        .then((respondents) => {
          localStorage.setItem("respondents", "true");
          alert("Subscription completed");
        })
        .catch((er) => {
          er.then((errors) => setErrors(errors, form));
        });
    });
};

function setErrors(errors, form) {
  const fields = Object.keys(errors);

  fields.forEach((field) => {
    const errorEl = form.elements[field].parentElement.querySelector(".error");

    errorEl.classList.add("error_active");
    errorEl.textContent = errors[field].join(" ");

    if (["email", "organization", "organization_website"].includes(field)) {
      form.elements[field].classList.add("field-error");
    } else {
      form.elements[field].parentElement
        .querySelector(".ts-control")
        .classList.add("field-error");
    }
  });
}

function clearErrors() {
  const errorTexts = document.querySelectorAll(".error_active");
  const errorFields = document.querySelectorAll(".field-error");
  errorTexts.forEach((el) => {
    el.classList.remove("error_active");
  });

  errorFields.forEach((el) => {
    el.classList.remove("field-error");
  });
}
