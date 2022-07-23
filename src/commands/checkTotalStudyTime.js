const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('얼마나_공부했을까')
    .setDescription('Get Total studyTime for a server'),
  async execute(interaction) {},
}
