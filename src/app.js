const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
const selectElement = document.querySelector('select#countries');
const countryDropdown = new SelectView(selectElement);
countryDropdown.bindEvents();

const countries = new Countries();
countries.getData();

});
