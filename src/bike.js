// export class Bike{
//   constructor(location, color, manufacturer, year, picture){
//     this.location = location;
//     this.color = color;
//     this.manufacturer = manufacturer;
//     this.year = year;
//     this.picture = picture;
//   }
// }

export class Search{
  getBike(location, distance, manufacturer) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://bikeindex.org/api/v3/search?API_KEY=${process.env.API_KEY}&page=1&per_page=100&location=${location}&distance=${distance}&stolenness=proximity&manufacturer=${manufacturer}`;
      request.onload = function() {
        console.log("LOADED");
        if(this.status === 200){
          console.log(request.response);
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