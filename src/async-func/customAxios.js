const axios = require('axios')
const { backend_url } = require('../../config.json')

module.exports = async parameter => {
  try {
    console.log(parameter)
    const data = await axios({
      method: 'post',
      url: backend_url + parameter.param,
      data: parameter.data,
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
