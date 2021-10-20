const express = require('express')

const router = express.Router()

const { getData } = require('../utils')

module.exports = router

router.get('/', (req, res) => {
  getData((err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    
    res.render('home', data)
  })
})