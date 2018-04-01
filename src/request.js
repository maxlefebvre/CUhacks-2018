const oc = require('oc-transpo')

module.exports.setup = oc.setup({
    key: "36422cd052fedbe8266b888b26365a19",
    appID: "560500cd"
});

module.exports.getStopSummary = oc.getStopSummary(stopid, function (error, data) {
    console.log('Get stop summary');
    if (error) {
        return console.error(error);
    }

    return data;
});

module.exports.getRouteInfo = oc.getRouteInformation(stopid, busid, function (error, data) {
    console.log('Get route info');
    if (error) {
        return console.error(error);
    }
    console.log('Next bus is in: ' + data.routes[0].trips[0].arrivalTime + ' mins');
    return data;
});

module.exports.getStopInfo = oc.getStopInformation(stopid, function (error, data) {
    console.log('Get stop info');
    if (error) {
        return console.error(error);
    }

    return data;
});

module.exports.getRemainingTime = oc.getRouteInformation(stopid, busid, function (error, data) {
    console.log('Get remaining time');
    if (error) {
        return console.error(error);
    }
    return data.routes[0].trips[0].arrivalTime
});

// oc.getRouteDirectionIdentifiers(3000, 44, function (error, data) {
//     console.log('Get route direction');
//     if (error) {
//         return console.error(error);
//     }

//     return console.log(data);
// });
