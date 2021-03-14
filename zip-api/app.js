const express = require('express');
const app = express();

const zipdb = require('./zipData');
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.json({test: 'Yay'});
});


app.get('/zip/:zipCode', (req, res) => {
  const zip = req.params.zipCode;
  const cities = zipdb.byZip[zip];

  !cities ? 
    res.status(404).send("Not Found")
  : 
    res.json(cities);
});


app.get('/city/:cityName', (req, res) => {
  const city = req.params.cityName;
  const zipCodes = zipdb.byCity[city];

  !zipCodes ?
    res.status(404).send("Not Found")
  :
    res.json(zipCodes);
});


app.listen(PORT, () => {
  console.log(`zip-api is up and running on http://localhost:${PORT}`);
});
