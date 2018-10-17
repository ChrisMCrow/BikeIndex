const Promise = require('es6-promise').Promise;

export class Bike{
  constructor(location, color, manufacturer, year, picture){
    this.location = location;
    this.color = color;
    this.manufacturer = manufacturer;
    this.year = year;
    this.picture = picture;
  }
}

export class Search{
  getBike(location, distance = 10, manufacturer) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://bikeindex.org/api/v3/search?API_KEY=${process.env.API_KEY}&page=1&per_page=1&location=${location}&distance=${distance}&stolenness=proximity&manufacturer=${manufacturer}`;
      request.onLoad = function(){
        if(this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}