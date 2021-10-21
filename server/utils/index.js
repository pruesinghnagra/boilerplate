const fs = require('fs')
const path = require('path')

module.exports = {
  getData,
  writeData
}

const filepath = path.join(__dirname, '../', 'data', 'data.json')

function getData (cb) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error('Unable to read file')
      cb(new Error('Oh no! That file does not exist!'))
      return
    }
    try {
      const parseData = JSON.parse(data)
      cb(null, parseData)
    } catch (err) {
      console.error(err)
      cb(new Error('Oh no! Unable to parse the data!')) 
    }
  })
}

function writeData (updatedData, cb) {
  getData((err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    
    const editThisPuppy = data.puppies.find(puppy => puppy.id === updatedData.id)
    if (!editThisPuppy) {
      console.error('Unable to find data')
      cb(new Error('Oh no! ID was not found!'))
      return
    }

    const { name, breed, owner, image} = updatedData
    editThisPuppy.name = name
    editThisPuppy.breed = breed
    editThisPuppy.owner = owner
    editThisPuppy.image = image
    
    const updatedPuppies = {
      ...data
    }

    const stringifyData = JSON.stringify(updatedPuppies,  null, 2)

    fs.writeFile(filepath, stringifyData, 'utf8', (err) => {
      if (err) {
        console.error('Unable to write to that file')
        cb(new Error('Oh no! That file does not want to be written to!'))
        return
      }
      cb()
    })
  })
}
