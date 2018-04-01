const Transit = require('./request.js')

//let resp = transit.getRemainingTime(3000, 44);
let transit = new Transit();
console.log(transit.getStopInfo(3000));