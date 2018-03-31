var express = require('express');
var router = express.Router();

const API_KEY = ''

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  console.log('Query string GET ' + req.query.title);
  if(req.query.title) {
      getRecipes(req.query.title, res);
  } else {
      sendResponse(null, res);
  }
})


function sendResponse(responseData, res) {
  responseDataObj = JSON.parse(responseData)
  //  if (responseDataObj) {
  //   res.render('results', { title: });
  // } else {
  //     res.render('index');
  // }
}

function parseData(serchResponse, res) {
  console.log('Parsing...')
  let responseData = ''
  serchResponse.on('data', function (chunk) {
      responseData += chunk
  })
  console.log(responseData)
  serchResponse.on('end', function () {
      console.log('Sending response...')
      sendResponse(responseData, res)
  })
}

function searchSets(title, res) {

  //You need to provide an appid with your request.
  //Many API services now require that clients register for an app id.

  const options = {
      host: 'api.quizlet.com',
      path: `/2.0/search/sets?q=${title}&access_token=${API_KEY}`
  }
  http.request(options, function (apiResponse) {
      parseData(apiResponse, res)
  }).end()
}

module.exports = router;
