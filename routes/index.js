var express = require('express');
var http = require('http');
var router = express.Router();

const API_KEY = 'GPmFgGW4Z6GuhtHtkUuF5F';
const CLIENT_ID = '5up7VNdy4a';

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
  // responseDataObj = JSON.parse(responseData)
   if (responseData) {
    res.render('results', {title: responseData});
  } else {
      res.render('index');
  }
}

function parseData(serchResponse, res) {
  console.log('Parsing...')
  console.log(serchResponse)
  let responseData = ''
  serchResponse.on('data', function (chunk) {
      responseData += chunk
  })
  serchResponse.on('end', function () {
      console.log(responseData)
      console.log('Sending response...')
      sendResponse(responseData, res)
  })
}

function searchSets(title, res) {
  res.redirect(302, `https://quizlet.com/authorize?scope=read&client_id=${CLIENT_ID}&response_type=code&state=cuhacks`)
  console.log('Searching..')
  const options = {
      host: 'api.quizlet.com',
      path: `/2.0/search/sets?q=${title}&client_id=${CLIENT_ID}`,
      authorization: `qizKlXsl4pa4P3WcsDbKRrk0Mks7MOeug1y61lyf`
  }
  http.request(options, function (apiResponse) {
      parseData(apiResponse, res)
  }).end()
}

// funtion authorizeQuizlet(res){
//   http.request()
// }

module.exports = router;
