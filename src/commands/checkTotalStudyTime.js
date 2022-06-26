const { SlashCommandBuilder } = require('@discordjs/builders')
const customAxios = require('../async-func/customAxios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('얼마나_공부했을까')
    .setDescription('Get Total studyTime for a server'),
  async execute(interaction) {
    const totalTime = await customAxios({
      param: `/studytime/${interaction.user.id}`,
    })

    const {
      name,
      totalVideoTime,
      totalYoutubeWatchCount,
      totalBaekjoonTime,
      totlaBlogUploadCount,
    } = totalTime.data

    await interaction.reply(
      `${name}님 지금까지 공부량은\n영상시간: ${totalVideoTime}\n유튜브 시청 개수: ${totalYoutubeWatchCount}\n백준 공부시간: ${totalBaekjoonTime}\n블로그 글 작성 수: ${totlaBlogUploadCount}\n입니다.`
    )
  },
}
