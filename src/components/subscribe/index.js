import TomSelect from "tom-select";

const tomselect = (id, isAddAllowed, options) => {
  new TomSelect(id, {
    create: isAddAllowed,
    sortField: {
      field: "text",
      direction: "asc",
    },
    options,
  });
};

export const subscribeFormInit = async () => {
  const country = await fetch(
    `${import.meta.env.VITE_API}/russian/countries/`
  ).then((ref) => ref.json());
  tomselect(
    "#country",
    false,
    country.map((v) => ({ value: v.id, text: v.name_en }))
  );

  const occupation = await fetch(
    `${import.meta.env.VITE_API}/landing/activity_types/`
  ).then((ref) => ref.json());
  tomselect(
    "#activity_type",
    true,
    occupation.map((v) => ({ value: v.id, text: v.name }))
  );
};
