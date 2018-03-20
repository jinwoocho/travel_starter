//API Key: AIzaSyBlkx51nA8l_I0msmC8VvFSjEbRAtcelME

var service;
var location;

// function ItineraryObj () {
//     this.timeCreated = new Date();
//     this.tags = [];
//     this.listItems = [
//          idNumber;
// ];
// }

function CityObj (){
    this.name = null;
    this.images = [];
    this.metadata = {
        'latlong': [],
        'locality': [],
        'entityType': ['city']
    };
    this.recommendations = []
}

// function PoiObj () {
//     this.idNumber = null;
//     this.name = null;
//     this.rating = null;
//     this.address = null;
//     this.description = null;
//     this.images = [];
//     this.metadata = {
//         'latlong': [],
//         'locality': [],
//         'entityType': ['pointOfInterest'],
//     }
// }

//madrid


function storeCityData() {
//hardcoded madrid for timely purposes. replace later with dynamic placeID retrieval via Google Places
    var city = new CityObj;
    var placeIdObj = {
        placeId: 'ChIJgTwKgJcpQg0RaSKMYcHeNsQ'
    };
    //don't want a map on dom
    service = new google.maps.places.PlacesService($('#nada').get(0));
    service.getDetails(placeIdObj, callback);
    //callback here is used to populate recommendations attribute in city object, and retrieve photos
    function callback(place, status){
        if(status === 'OK'){
            generatePois();
            console.log(place);

            var imageURL = null;
            //hardcoded name attribute for timely purposes
            city.name = 'Madrid';
            for (var i = 0; i < place.photos.length; i++) {
                //photos retrieved can be customized to any size
                imageURL = "" + place.photos[i].getUrl({'maxWidth': 500, 'maxHeight': 500});
                city.images.push(imageURL);
            }
        }
    }


    function generatePois(){
        $.ajax({
            //hardcoded madrid
            url: 'https://www.triposo.com/api/v2/poi.json?location_id=Madrid',
            method: 'get',
            dataType: 'json',
            data: {
                'account': 'Z3R6JX1X',
                'token': 'w8haxij8ysa6iv2jocnijnnk21wr9gwt'
            },
            success: function (result) {
                //hardcoded locality. use Google Maps later to determine locality, either country or state
                city.metadata.locality = 'Spain';
                //push results from Triposo into object recommendations array, after checking to make sure recommendations array does not already contain result ** need potential bug testing
                //flag begins 'off', if duplicate recommendation exists flag turns 'on' skips pushing recommendation, then turns off at end
                //otherwise, flag never turns 'on, so recommendation is added
                var flag = 'off';
                for(var i = 0; i < result.results.length; i++) {
                    for(var j = 0; j < city.recommendations.length;j++){
                        if (city.recommendations[j].name === result.results[i].name){
                            flag = 'on';
                        }
                    }
                    if(flag === 'off') {
                        city.recommendations.push(result.results[i]);
                    }
                    flag = 'off'
                }
                makeHashtag(city);
                //final object product console logged
                console.log(city)
            }
        });
        $.ajax({
            //hardcoded madrid
            url: 'https://www.triposo.com/api/v2/poi.json?location_id=Madrid&tag_labels=eatingout',
            method: 'get',
            dataType: 'json',
            data: {
                'account': 'Z3R6JX1X',
                'token': 'w8haxij8ysa6iv2jocnijnnk21wr9gwt'
            },
            success: function (result) {
                //hardcoded locality. use Google Maps later to determine locality, either country or state
                city.metadata.locality = 'Spain';
                //push results from Triposo into object recommendations array, after checking to make sure recommendations array does not already contain result ** need potential bug testing
                //flag begins 'off', if duplicate recommendation exists flag turns 'on' skips pushing recommendation, then turns off at end
                //otherwise, flag never turns 'on, so recommendation is added
                var flag = 'off';
                for(var i = 0; i < result.results.length; i++) {
                    for(var j = 0; j < city.recommendations.length;j++){
                        if (city.recommendations[j].name === result.results[i].name){
                            flag = 'on';
                        }
                    }
                    if(flag === 'off') {
                        city.recommendations.push(result.results[i]);
                    }
                    flag = 'off'
                }
                makeHashtag(city);
                //final object product console logged
                console.log(JSON.stringify(city))
            }
        });

    }

    function makeHashtag(resultObj){
        //hardcoded tags for now.
        var tagCheck = [
            'fine', 'art', 'desserts', 'dessert', 'beach', 'shopping', 'historic', 'garden', 'architecture', 'gardens', 'restaurant', 'food', 'museum',
            'live', 'music', 'bar',
            'drinks', 'sights', 'attraction', 'culture', 'entertainment', 'dance', 'dancing', 'trail', 'hiking', 'classic', 'classical', 'cultural'
        ];
        //loops through each recommendation in city object
        for(var i = 0; i < resultObj.recommendations.length; i ++){
            //create new hashtags attribute in city object. add concatenated POI name as first hashtag
            var firstHashtag = '#' + resultObj.recommendations[i].name.replace('-', ' ').split(' ').join('');
            resultObj.recommendations[i].hashtags = [firstHashtag];
            var splitSnippet = resultObj.recommendations[i].snippet.replace(',', ' ').replace('.', ' ').split(' ');
            //snippet attribute is split and looped through
            for(var j = 0; j < splitSnippet.length; j++){
                //cross-reference tagCheck and the snippet for hashtag candidates
                for(var k = 0; k < tagCheck.length; k++){
                    //check for and avoid repeat tags
                    if (splitSnippet[j].toLowerCase() === tagCheck[k] && resultObj.recommendations[i].hashtags.indexOf('#' + tagCheck[k]) === -1){
                        resultObj.recommendations[i].hashtags.push('#' + tagCheck[k]);
                    }
                }
            }
            //make cURL call to store hashtag into city object's hashtags attribute.
        }
    }
}