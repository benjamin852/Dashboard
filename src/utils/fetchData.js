const fetchData = (URL, BODY) => {
  var urlencoded = new URLSearchParams(BODY);

  return fetch(URL, {
    method: "POST",
    body: urlencoded,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error("fetchData Error :\n", err.message);
      throw err.message;
    });
};

export default fetchData;
