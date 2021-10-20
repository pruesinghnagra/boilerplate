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

router.get('/puppies/:id', (req, res) => {
  getData((err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }

    const id = Number(req.params.id)
    const puppyDetails = data.puppies.find(puppy => puppy.id === id)

    res.render('details', puppyDetails)
  })
})