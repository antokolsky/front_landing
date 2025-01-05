export const vote = (id,type) =>
    fetch(`https://antokolsky.ddns.net/api/landing/projects/${id}/vote/${type==="bottom"?"?action=unvote":""}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  