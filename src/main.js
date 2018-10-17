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
      for (let i = 0; i < body.bikes.length; i++) {
        $('#results-table').append(
          `<tr>
            <td>${body.bikes[i].stolen_location}</td>
            <td>${body.bikes[i].date_stolen}</td>
            <td>${body.bikes[i].frame_colors[0]}</td>
            <td>${body.bikes[i].year}</td>
            <td>${body.bikes[i].manufacturer_name}</td>
            <td><img class="tableImg" id="img${i}" data-toggle="modal" data-target="#modal${i}" src=${body.bikes[i].thumb} alt="&nbsp;no image uploaded"></td>
          </tr>`
        );
        $('#modals').append(
          `<div class="modal fade" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img src=${body.bikes[i].large_img}>
                </div>
              </div>
            </div>
          </div>`
        );
        $(`#modal${i}`).on('show.bs.modal', function() {
          $(`#img${i}`).trigger('focus');
        });
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
