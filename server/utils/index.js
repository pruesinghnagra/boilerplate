const fs = require('fs')
const path = require('path')

module.exports = {
  getData
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