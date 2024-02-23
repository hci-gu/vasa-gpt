var axios = require('axios').default

var options = {
  method: 'GET',
  url: 'https://analytics.prod.appadem.in/vasagpt/pages/data',
  headers: {
    cookie: 'f17cace0106c35a615c7939eaadd8abb=664b957ce1fff183fabfaa6e258e3aba',
    'x-api-key': 'b9241d79-1351-4eb8-9bb1-1ea6c41cae7c'
  }
}

axios
  .request(options)
  .then(function (response) {
    let days = {}
    total = 0
    for (let i = 0; i < response.data.length; i++) {
      let date = new Date(response.data[i].timestamp).toLocaleDateString()
      if (days[date]) {
        days[date]++
      } else {
        days[date] = 1
      }
      total++
    }
    Object.keys(days).forEach(function (key) {
      console.log(key + ': ' + days[key])
    })
    console.log('Totalt: ' + total)
  })
  .catch(function (error) {
    console.error(error)
  })
