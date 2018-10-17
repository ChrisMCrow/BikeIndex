import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {  Search } from './bike.js';


$(document).ready(function() {
  $("#form").submit(function(event){
    event.preventDefault();

    let location = $("#location").val();
    let distance = 10;
    let manufacturer = $("#manufacturer").val();

    let newSearch = new Search();
    let promise = newSearch.getBike(location, distance, manufacturer);
    console.log(promise);
    promise.then(function(response) {
      let body = JSON.parse(response);
      $('.showLocation').append(`Location: ${body.bikes[0].stolen_location}`);
      $('.showManufacturer').show(`Manufacturer: ${body.bikes[0].manufacturer_name}`);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
