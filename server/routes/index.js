const express = require('express')

const router = express.Router()

const { getData, writeData } = require('../utils')

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

router.get('/puppies/:id/edit', (req, res) => {
  getData((err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }

    const id = Number(req.params.id)
    const puppyDetails = data.puppies.find(puppy => puppy.id === id)

    res.render('edit', puppyDetails)
  })
})

router.post('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  const { name, breed, owner, image } = req.body
  const updatedPuppy = { id, name, breed, owner, image }
  
  writeData(updatedPuppy, (err) => {
    if (err) {
      err.code === 404
      ? res.sendStatus(404)
      : res.status(500).send(err.message)
      return
    }

    res.redirect('/puppies/' + id)
  })
})
