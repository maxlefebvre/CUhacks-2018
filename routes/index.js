var express = require('express');
var http = require('http');
var router = express.Router();

const API_KEY = 'GPmFgGW4Z6GuhtHtkUuF5F'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  console.log('Query string GET ' + req.query.title);
  if(req.query.title) {
    searchSets(req.query.title, res);
  } else {
      sendResponse(null, res);
  }
})

// Handle search
router.post('/', function (req, res) {
  console.log('Finding ' + req.body.title)
  // Clean up input by getting rid of spaces
  title = req.body.title.replace(/\s/g, '');
  searchSets(title, res);
})

function sendResponse(responseData, res) {
  responseDataObj = JSON.parse(responseData)
   if (responseDataObj) {
    res.render('results', {});
  } else {
      res.render('index');
  }
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
  console.log('Searching..')
  const options = {
      host: 'api.quizlet.com',
      path: `/2.0/search/sets?q=${title}&access_token=${API_KEY}`
  }
  http.request(options, function (apiResponse) {
      parseData(apiResponse, res)
  }).end()
}

module.exports = router;
