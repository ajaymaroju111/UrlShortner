const express = require('express');
const router = express.Router();
const { CreateShortUrl, getAllLinks, DeleteByCode, RedirectUsingCode, getLinkByCode } = require('../controllers/urlControllers.js')


router.get('/healthz', async(req, res) => {
  res.status(200).json({
    message: 'OK',
    quote: "Successfully running"
  })
})
router.post('/', CreateShortUrl);
router.get('/', getAllLinks);
router.get('/code/:code', getLinkByCode);
router.delete('/:code', DeleteByCode);
router.get('/:code', RedirectUsingCode);


module.exports = router;