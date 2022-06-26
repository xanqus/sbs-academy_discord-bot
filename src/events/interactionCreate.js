module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isModalSubmit()) {
      interaction.commandName = 'modal submit'
    }

    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.\n`,
      `commandName: ${interaction.commandName}`
    )
  },
}
