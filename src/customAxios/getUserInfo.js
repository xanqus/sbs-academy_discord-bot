const axios = require('axios')
const { backend_url } = require('../../config.json')

module.exports = async discordID => {
  try {
    const data = await axios({
      method: 'post',
      url: `${backend_url}/user/${discordID}`,
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
