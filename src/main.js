import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {  Search } from './bike.js';


$(document).ready(function() {
  $("#form").submit(function(event){
    event.preventDefault();

    let location = $("#location").val();
    let distance = $("#distance").val();
    let manufacturer = $("#manufacturer").val();

    let newSearch = new Search();
    let promise = newSearch.getBike(location, distance, manufacturer);

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(response);
      $('.showLocation').append(`Location: ${body.bikes}`);
      $('.showManufacturer').text(`Manufacturer: ${body.bikes[0].manufacturer_name}`);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
