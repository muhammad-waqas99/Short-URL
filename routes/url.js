const express = require('express');
const router = express.Router();
const { HandleGenerateNewShortURL, HandleGetAnalytics } = require('../controllers/url');
const { restrictTo } = require('../middlewares/auth');

router.post('/',HandleGenerateNewShortURL);
router.get('/analytics/:shortId', HandleGetAnalytics);

module.exports = router;
