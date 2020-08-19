var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.post('/', function(request, res, next) {
  // console.log(req);
  fs.writeFileSync("../server/public/" + request.query.filename, request.body.content)
  res.send('');
  res.end()
  // res.render('index', { title: 'Expresfs.writeFileSync(file, data[, options])s' });
});

module.exports = router;
