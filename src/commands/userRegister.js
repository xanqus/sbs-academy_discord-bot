const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('사용자등록')
    .setDescription('사용자등록'),
  async execute(interaction) {
    if (interaction.modalSubmit) return
    if (interaction.commandName !== '사용자등록') return
    const modal = new Modal()
      .setCustomId('userRegister')
      .setTitle('이름을 입력해주세요')
    const studentName = new TextInputComponent()
      .setCustomId('studentNameInput')
      .setLabel('이름을 입력해주세요.')
      .setStyle('SHORT')
    const lectureID = new TextInputComponent()
      .setCustomId('lectureIDInput')
      .setLabel('강의ID를 입력해주세요.')
      .setStyle('SHORT')

    const firstActionRow = new MessageActionRow().addComponents(studentName)
    const secondActionRow = new MessageActionRow().addComponents(lectureID)

    modal.addComponents(firstActionRow)
    modal.addComponents(secondActionRow)
    // Show the modal to the user
    await interaction.showModal(modal)
  },
}
