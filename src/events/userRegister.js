const customAxios = require('../async-func/customAxios')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId === 'userRegister') {
      const studentName =
        interaction.fields.getTextInputValue('studentNameInput')

      const data = {
        studentName: studentName,
        discordId: interaction.user.id,
      }

      customAxios({
        data: data,
        param: '/user',
      })
      await interaction.reply({
        content: '사용자정보가 등록되었습니다.',
      })
    }
  },
}
