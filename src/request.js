const oc = require('oc-transpo');



// var googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyDl2U0aoM2R2k_qxtb-GNWPYoaUeD3JGBw'
//   });

// let location = '';
// // Geocode an address.
// googleMapsClient.geocode({
//     address: '1400 Kilborn Avenue, Ottawa, Ontario'
//   }, function(err, response) {
//     if (!err) {
//       //console.log(response.json.results);
//       location = response.json.results[0].geometry.location;
//       console.log(location);
//       let request = {
//         location: location,
//         radius: 200,
//         type: 'bus_station',
//       }
//       googleMapsClient.placesNearby(request, function(err, response) {
//         if(!err) {
//             console.log(response.json.results);
//         } else {
//             console.log('ERROR!')
//         }
//     })
//     } else {
//         console.log('ERROR!')
//     }
//   });



oc.setup({
    key: "36422cd052fedbe8266b888b26365a19",
    appID: "560500cd"
});
setTimeout(doStuff, 1000)

function doStuff(){

    // oc.getRouteDirectionIdentifiers(3000, 44, function (error, data) {
    //     console.log('Get route direction');
    //     if (error) {
    //         return console.error(error);
    //     }

    //     return console.log(data);
    // });
    oc.getStopSummary(3060, function (error, data) {
        console.log('Get stop summary');
        if (error) {
            return console.error(error);
        }

        return console.log(data);
    });

    // oc.getRouteInformation(3000, 44, function (error, data) {
    //     console.log('Get route info');
    //     if (error) {
    //         return console.error(error);
    //     }
    //     console.log('Next bus is in: ' + data.routes[0].trips[0].arrivalTime + ' mins');
    //     return console.log(data);
    // });

    // oc.getStopInformation(3000, function (error, data) {
    //     console.log('Get stop info');
    //     if (error) {
    //         return console.error(error);
    //     }

    //     return console.log(data);
    // });
}