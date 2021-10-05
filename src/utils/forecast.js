const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=31c8d91f689e7706dd3580b41e259bf2&query=' + latitude + ',' + longitude + ''

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log('Unable to connect to weather service!')
    } else if (body.error) {
      console.log('Unable to find location')
    } else {
      console.log(body)
      callback(undefined, body)
    }
  })
}

module.exports = forecast