const customAxios = require('../async-func/customAxios')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.commandName !== '얼마나_공부했을까') return
    const totalTime = await customAxios({
      param: `/studytime/${interaction.user.id}`,
    })
    try {
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
    } catch (e) {
      console.log(e)
      await interaction.reply(`공부시간을 가져오는도중 문제가 발생했습니다.`)
    }
  },
}
