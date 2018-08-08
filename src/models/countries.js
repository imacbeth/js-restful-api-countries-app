const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');


const Countries = function () {
  this.text = null;
}

Countries.prototype.getData = function () {
  const request = new Request('https://restcountries.eu/rest/v2/all');
  request.get((data) => {
    this.text = data;
    PubSub.publish('Countries:all-countries', this.text);
  });
};

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    const selectedIndex = evt.detail;
    this.publishCountryDetail(selectedIndex);
  });
};

Countries.prototype.publishCountryDetail = function (countryIndex) {
  const selectedCountry = this.text[countryIndex];

  PubSub.publish('Countries:selected-country-ready', selectedCountry);
};

module.exports = Countries;
