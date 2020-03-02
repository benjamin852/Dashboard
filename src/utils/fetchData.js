const fetchData = async (URL, BODY) => {
  let data = await fetch(URL, {
    method: "GET",
    mode: "no-cors",
    body: JSON.stringify(BODY)
  });
  console.log(data);
  let result = await data.json();
  return result;
};

export default fetchData;
