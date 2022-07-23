const { lectureIDs } = require('../../config.json')
const sendData = require('../customAxios/sendData')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId !== 'userRegister') return

    const studentName = interaction.fields.getTextInputValue('studentNameInput')
    const lectureID = interaction.fields.getTextInputValue('lectureIDInput')

    if (!lectureIDs.includes(lectureID))
      return await interaction.reply({ content: '강의ID를 확인해주세요.' })

    const data = {
      studentName,
      lectureID,
      discordID: interaction.user.id,
    }

    sendData({
      data: data,
      param: '/user',
    })
    await interaction.reply({
      content: '사용자정보가 등록되었습니다.',
    })
  },
}
