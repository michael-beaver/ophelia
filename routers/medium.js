const express = require('express')
const router = express.Router()
const feed = require('rss-to-json')

const path = '/medium'

router.get(path + '/', (req, res) => {
  feed.load('https://www.medium.com/feed/@siggame', (err, rss) => {
    if (err) {
      res.send({
        success: false,
        err: err,
        data: []
      })
    } else {
      res.send({
        success: true,
        data: rss.items
      })
    }
  })
})

router.get(path + '/latest', (req, res) => {
  feed.load('https://www.medium.com/feed/@siggame', (err, rss) => {
    if (err) {
      res.send({
        success: false,
        err: err,
        data: []
      })
    } else {
      res.send({
        success: true,
        data: rss.items.slice(0, 5)
      })
    }
  })
})

module.exports = { router }
