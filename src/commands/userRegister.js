const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('사용자등록')
    .setDescription('공부시간'),
  async execute(interaction) {
    const modal = new Modal()
      .setCustomId('userRegister')
      .setTitle('이름을 입력해주세요')
    const studentName = new TextInputComponent()
      .setCustomId('studentNameInput')
      .setLabel(' 이름을 입력해주세요.')
      .setStyle('SHORT')

    const firstActionRow = new MessageActionRow().addComponents(studentName)

    modal.addComponents(firstActionRow)
    // Show the modal to the user
    await interaction.showModal(modal)
  },
}
