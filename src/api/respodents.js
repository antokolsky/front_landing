export const respondents = ({
  email,
  organization,
  organization_website,
  country,
  activity_type,
}) =>
  fetch(`${import.meta.env.VITE_API}/landing/respondents/`, {
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
