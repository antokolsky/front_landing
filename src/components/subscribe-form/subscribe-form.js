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
        .then((v) => {
          if (v.ok === false) throw v.json();
          return v.json();
        })
        .then((v) => {
          
            localStorage.setItem("respondents","true")
            alert("successfully")
        })
        .catch((v) => {
          v.then((v) => alert(JSON.stringify(v)));
        });
    });
};
