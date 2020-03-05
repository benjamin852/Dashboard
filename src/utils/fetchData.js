const fetchData = (URL, BODY) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("uuid", "dac947e4-ba20-4813-8c96-8e0b63d06e65");
  for (const key in BODY) {
    urlencoded.append(key, BODY[key]);
  }

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
    });
};

export default fetchData;
