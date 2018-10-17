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
    getBikeByLocation(location, manufacturer){
        return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            let url = `bikeindex.org/api/v3/search?API_KEY=${process.env.API_KEY}&page=1&per_page=25manufacturer=${manufacturer}&&location=${location}`;
            request.onLoad = function(){
                if(this.status === 200){
                    resolve(request.response);
                }else{
                    reject(Error(request.statusText));
                }
            }
            request.open("GET", url, true);
            request.send();
        });

        getBikeByColor()
    }
}