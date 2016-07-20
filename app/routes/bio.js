var express = require('express');
var ble = require('../ble');

var router = express.Router();

/* GET bio listing. */
router.get('/data', function (req, res, next) {
    res.send(ble.getData());
});

module.exports = router;
