const oc = require('oc-transpo');

var setupPromise = new Promise(function(resolve, reject) {
    oc.setup({
        key: "36422cd052fedbe8266b888b26365a19",
        appID: "560500cd"
    });
    if (resolve) {
        doStuff();
    } else {
        console.log('Erorr!');
    }
})
//setTimeout(doStuff, 4000)


function getStopSummary(stopid) {
    oc.getStopSummary(stopid, function (error, data) {
        console.log('Get stop summary');
        if (error) {
            console.error(error);
            return null;
        }

        return console.log(data);
    });
}
x
function getRouteInfo(stopid, busid) {
    oc.getRouteInformation(3000, 44, function (error, data) {
        console.log('Get route info');
        if (error) {
            console.error(error);
            return null;
        }
        //console.log('Next bus is in: ' + data.routes[0].trips[0].arrivalTime + ' mins');
        return console.log(data);
    });
}

// function getRemainingTime(stopid, busid) {
//     data = getRouteInfo(stopid, busid);
//     if (data) routes = data.routes[0];
//     else return null;

//     // Check if trips available
//     if (routes.trips[0]) {
//         return routes.trips[0].arrivalTime;
//     } else {
//         return null;
//     }
// }

function getStopInfo(stopid) {
    oc.getStopInformation(stopid, function (error, data) {
        console.log('Get stop info');
        if (error) {
            console.error(error);
            return null;
        }

        return console.log(data);
    });
}

function doStuff() {
    getStopSummary(3000);
    getRouteInfo(3000, 44);
    getStopInfo(3000);
}