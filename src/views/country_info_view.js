const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CountryInfoView = function (container) {
  this.container = container;
};

CountryInfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    const country = evt.detail;
    console.log(evt.detail);
    this.render(country);
  })
};

CountryInfoView.prototype.render = function (country) {
  this.container.innerHTML = '';

  const countryName = this.customCreateElement('h2', country.name);
  this.container.appendChild(countryName);

  const image = document.createElement('img');
  image.src = country.flag;
  this.container.appendChild(image);

  const region = this.customCreateElement('h3', country.region);
  this.container.appendChild(region);
};


CountryInfoView.prototype.customCreateElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;

  return element;
};

module.exports = CountryInfoView;
