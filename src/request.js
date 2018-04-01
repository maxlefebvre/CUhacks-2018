const oc = require('oc-transpo');



var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDl2U0aoM2R2k_qxtb-GNWPYoaUeD3JGBw'
  });


// Geocode an address.
googleMapsClient.geocode({
    address: '1400 Kilborn Avenue, Ottawa, Ontario, CA'
  }, function(err, response) {
    if (!err) {
      //console.log(response.json.results);
      let location = response.json.results[0].geometry.location;
      console.log(location);
    } else {
        console.log('ERROR!')
    }
  });
// oc.setup({
//     key: "36422cd052fedbe8266b888b26365a19",
//     appID: "560500cd"
// });



// oc.getRouteDirectionIdentifiers(7188, 48, function(error, data) {
//     console.log('Get route direction');
//     if(error) {
//         return console.error(error);
//     }
 
//     return console.log(data);
// });

// oc.getStopSummary(7188, function(error, data) {
//     console.log('Get stop summary');
//     if(error) {
//         return console.error(error);
//     }

//     return console.log(data);
// });

// oc.getRouteInformation(7188, 48, function(error, data) {
//     console.log('Get route info');
//     if(error) {
//         return console.error(error);
//     }
 
//     return console.log(data);
// });

// oc.getStopInformation(3000, function(error, data) {
//     console.log('Get stop info');
//     if(error) {
//         return console.error(error);
//     }
 
//     return console.log(data);
// });