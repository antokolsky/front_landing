import TomSelect from 'tom-select';


const tomselect = (id, isAddAllowed, options) => {
  new TomSelect(id,{
    create: isAddAllowed,
    sortField: {
      field: "text",
      direction: "asc"
    },
    options,
  });
};

export const subscribeFormInit = async () => {
  
  fetch("http://antokolsky.ddns.net/api/landing/projects/")
  

  const country = await fetch("http://antokolsky.ddns.net/api/russian/countries/").then(ref=>ref.json())
  tomselect("#country", false, country.map(v=>({value:v.id,text:v.name_en})));
  
  
  const occupation = await fetch("http://antokolsky.ddns.net/api/landing/activity_types/").then(ref=>ref.json())
   tomselect("#occupation", true, occupation.map(v=>({value:v.id,text:v.name})));
};
