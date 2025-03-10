var express = require('express');
var router = express.Router();
const requestIp = require('request-ip');

router.get('/', function(req, res, next) {
  res.send('Express App is Running!');
});

router.get('/request-info', (req, res) => {
    const clientIp = requestIp.getClientIp(req) || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const requestInfo = {
        ip_address: clientIp,
        user_agent: req.headers['user-agent'] || 'Unknown',
        request_headers: req.headers,
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString()
    };

    res.json(requestInfo);
});

module.exports = router;
