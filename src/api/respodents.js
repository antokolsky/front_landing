export const respondents = ({
  email,
  organization,
  organization_website,
  country,
  activity_type,
}) =>
<<<<<<< HEAD
  fetch(`${import.meta.env.VITE_API}/landing/respondents/`, {
=======
  fetch("https://antokolsky.ddns.net/api/landing/respondents/", {
>>>>>>> 5421e0cf138b4fa77faf57175f929543fbf07bf7
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      organization,
      organization_website,
      country,
      activity_type,
    }),
  });
