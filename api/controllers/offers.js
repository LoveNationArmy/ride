const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
  Offers.findAll()
  .then(() => {
    return res.status(200).end()
  })
  .catch((e) => {
    console.log(e);
    return res.status(500).end()
  })
})

module.exports = router
