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

  const regionHeading = this.customCreateElement('h3', 'Region:')
  this.container.appendChild(regionHeading);

  const region = this.customCreateElement('p', country.region);
  this.container.appendChild(region);

  const languagesHeading = this.customCreateElement('h3', 'Languages:');
  this.container.appendChild(languagesHeading);

  const languagesList = this.createLanguagesList(country.languages);
  this.container.appendChild(languagesList);
};


CountryInfoView.prototype.customCreateElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;

  return element;
};

CountryInfoView.prototype.createLanguagesList = function (languages) {
  const list = document.createElement('ul');

  languages.forEach((language) => {
    const listItem = document.createElement('li');
    listItem.textContent = language.name;
    list.appendChild(listItem);
  });
  return list;
};

module.exports = CountryInfoView;
