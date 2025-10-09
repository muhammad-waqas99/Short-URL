const express = require('express');
const router = express.Router();
const { HandleGenerateNewShortURL, HandleGetAnalytics } = require('../controllers/url');

router.post('/', HandleGenerateNewShortURL);
router.get('/analytics/:shortId', HandleGetAnalytics);

module.exports = router;
