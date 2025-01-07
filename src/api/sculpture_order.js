export const sculpture_order = ({ sculpture_name, email, phone }) =>
  fetch(`${import.meta.env.VITE_API}/landing/sculpture_order/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sculpture_name, email, phone: phone ?? "" }),
  });
