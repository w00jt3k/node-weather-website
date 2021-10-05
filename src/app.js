const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Wojciech Wiśniewski'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Wojciech Wiśniewski'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Lorem ipsum dolor sit amet',
    name: 'Wojciech Wiśniewski'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Send correct address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, { location, current } = {}) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: current,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})  

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Topic not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})