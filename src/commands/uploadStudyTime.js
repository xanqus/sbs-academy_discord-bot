const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('공부시간')
    .setDescription('공부시간'),
  async execute(interaction) {
    if (interaction.modalSubmit) return
    if (interaction.commandName !== '공부시간') return
    const modal = new Modal()
      .setCustomId('studyTimeUploader')
      .setTitle('공부시간을 업로드해주세요!')
    const videoTimeInput = new TextInputComponent()
      .setCustomId('videoTimeInput')
      .setLabel('영상시간을 입력해주세요.')
      .setStyle('SHORT')

    const youtubeWatchCountInput = new TextInputComponent()
      .setCustomId('youtubeWatchCountInput')
      .setLabel('유튜브 시청수를 입력해주세요.')
      .setStyle('SHORT')

    const baekjoonTimeInput = new TextInputComponent()
      .setCustomId('baekjoonTimeInput')
      .setLabel('백준 공부시간을 입력해주세요.')
      .setStyle('SHORT')

    const blogUploadCountInput = new TextInputComponent()
      .setCustomId('blogUploadCountInput')
      .setLabel('블로그 글 업로드 수를 입력해주세요.')
      .setStyle('SHORT')
    const firstActionRow = new MessageActionRow().addComponents(videoTimeInput)
    const secondActionRow = new MessageActionRow().addComponents(
      youtubeWatchCountInput
    )
    const thirdActionRow = new MessageActionRow().addComponents(
      baekjoonTimeInput
    )
    const fourthActionRow = new MessageActionRow().addComponents(
      blogUploadCountInput
    )
    modal.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow
    )
    // Show the modal to the user
    await interaction.showModal(modal)
  },
}
