const customAxios = require('../async-func/customAxios')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId === 'studyTimeUploader') {
      const videoTime = interaction.fields.getTextInputValue('videoTimeInput')
      const youtubeWatchCount = interaction.fields.getTextInputValue(
        'youtubeWatchCountInput'
      )
      const baekjoonTime =
        interaction.fields.getTextInputValue('baekjoonTimeInput')
      const blogUploadCount = interaction.fields.getTextInputValue(
        'blogUploadCountInput'
      )
      const data = {
        discordId: interaction.user.id,
        videoTime,
        youtubeWatchCount,
        baekjoonTime,
        blogUploadCount,
      }

      customAxios({
        data: data,
        param: '/studytime',
      })

      await interaction.reply({
        content: '성공적으로 업로드 되었습니다!!',
      })
    }
  },
}
