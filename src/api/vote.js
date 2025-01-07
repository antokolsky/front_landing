export const vote = (id,type) =>
    fetch(`${import.meta.env.VITE_API}/landing/projects/${id}/vote/${type==="bottom"?"?action=unvote":""}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  