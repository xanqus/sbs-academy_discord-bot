const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .addChannelOption(option =>
      option.setName('destination').setDescription('Select a channel')
    ),
  async execute(interaction) {
    await interaction.reply('Pong!!!')
  },
}
