import { respondents } from "../../api/respodents";

export const subscribeForm = () => {
  document
    .querySelector(".subscribe__form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      if(localStorage.getItem("respondents")==="true") {
        alert("successfully")
        return
      }
      const form = event.target;

      const { website_organization, email, country, occupation, organization } =
        form;

      respondents({
        email: email.value,
        country: country.value,
        organization: organization.value,
        organization_website: website_organization.value,
        activity_type: occupation.value,
      })
        .then((res) => {
          if (res.ok === false) throw res.json();
          return res.json();
        })
        .then((respondents) => {
          
        })
        .catch((error) => {
          
        });
    });
};
