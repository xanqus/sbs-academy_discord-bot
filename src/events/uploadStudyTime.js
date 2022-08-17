const sendData = require("../customAxios/sendData");
const getUserInfo = require("../customAxios/getUserInfo");
const getDate = require("../util/getDate");
const { MessageEmbed } = require("discord.js");
const { studyTimeUploadChannelIDs, lectureIDs } = require("../../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== "studyTimeUploader") return;

    if (studyTimeUploadChannelIDs.includes(interaction.channelId)) {
      let userInfo = await getUserInfo(interaction.user.id);
      let lectureID = userInfo ? userInfo.data.lectureID : -1;
      const videoTime = interaction.fields.getTextInputValue("videoTimeInput");
      const youtubeWatchCount = interaction.fields.getTextInputValue(
        "youtubeWatchCountInput"
      );
      const baekjoonTime =
        interaction.fields.getTextInputValue("baekjoonTimeInput");
      const blogUploadCount = interaction.fields.getTextInputValue(
        "blogUploadCountInput"
      );
      if (!lectureIDs.includes(lectureID)) {
        return await interaction.reply({
          content: "등록되지 않은 사용자입니다.",
        });
      }

      if (
        isNaN(videoTime) ||
        isNaN(youtubeWatchCount) ||
        isNaN(baekjoonTime) ||
        isNaN(blogUploadCount)
      )
        return await interaction.reply({ content: "항목이 숫자여야합니다." });

      const data = {
        discordID: interaction.user.id,
        videoTime,
        youtubeWatchCount,
        baekjoonTime,
        blogUploadCount,
        lectureID,
      };

      sendData({
        data: data,
        param: "/studytime",
      });

      // inside a command, event listener, etc.
      const embed = new MessageEmbed()
        .addFields(
          {
            name: "영상시간",
            value:
              videoTime >= 3
                ? videoTime >= 6
                  ? videoTime >= 9
                    ? `\`\`\`md\n# ${videoTime}시간\`\`\``
                    : `\`\`\`diff\n- ${videoTime}시간\`\`\``
                  : `\`\`\`diff\n+ ${videoTime}시간\`\`\``
                : `\`\`\`\n- ${videoTime}시간\`\`\``,
          },
          {
            name: "유튜브 시청 수",
            value:
              youtubeWatchCount >= 3
                ? youtubeWatchCount >= 6
                  ? youtubeWatchCount >= 9
                    ? `\`\`\`md\n# ${youtubeWatchCount}시간\`\`\``
                    : `\`\`\`diff\n- ${youtubeWatchCount}시간\`\`\``
                  : `\`\`\`diff\n+ ${youtubeWatchCount}시간\`\`\``
                : `\`\`\`\n- ${youtubeWatchCount}시간\`\`\``,
          },
          {
            name: "백준 공부시간",
            value:
              baekjoonTime >= 3
                ? baekjoonTime >= 6
                  ? baekjoonTime >= 9
                    ? `\`\`\`md\n# ${baekjoonTime}시간\`\`\``
                    : `\`\`\`diff\n- ${baekjoonTime}시간\`\`\``
                  : `\`\`\`diff\n+ ${baekjoonTime}시간\`\`\``
                : `\`\`\`\n- ${baekjoonTime}시간\`\`\``,
          },
          {
            name: "블로그 글 업로드 수",
            value:
              blogUploadCount >= 3
                ? blogUploadCount >= 6
                  ? blogUploadCount >= 9
                    ? `\`\`\`md\n# ${blogUploadCount}시간\`\`\``
                    : `\`\`\`diff\n- ${blogUploadCount}시간\`\`\``
                  : `\`\`\`diff\n+ ${blogUploadCount}시간\`\`\``
                : `\`\`\`\n- ${blogUploadCount}시간\`\`\``,
          }
        )
        .setTitle(
          `${
            interaction.member.nickname
              ? interaction.member.nickname
              : interaction.user.username
          }님의 ${await getDate(new Date())} 공부시간 입니다.`
        )
        .setAuthor({
          name: `${
            interaction.member.nickname
              ? interaction.member.nickname
              : interaction.user.username
          }`,
          iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`,
        })
        .setTimestamp();
      if (
        videoTime >= 3 ||
        youtubeWatchCount >= 3 ||
        baekjoonTime >= 3 ||
        blogUploadCount >= 3
      ) {
        if (
          videoTime >= 6 ||
          youtubeWatchCount >= 6 ||
          baekjoonTime >= 6 ||
          blogUploadCount >= 6
        ) {
          if (
            videoTime >= 9 ||
            youtubeWatchCount >= 9 ||
            baekjoonTime >= 9 ||
            blogUploadCount >= 9
          ) {
            embed.setColor("#9ceeff");
            await interaction.reply({
              content: `공부시간 업로드가 완료되었습니다.\n공부를 정말 많이하셨네요 ${interaction.member.nickname}님.\n9개(시간)이상인 항목이 있습니다!!!`,
              embeds: [embed],
            });
          } else {
            embed.setColor("#ff6969");
            await interaction.reply({
              content: `공부시간 업로드가 완료되었습니다.\n공부를 꽤 많이하셨네요 ${interaction.member.nickname}님.\n6개(시간)이상인 항목이 있습니다!!!`,
              embeds: [embed],
            });
          }
        } else {
          embed.setColor("#b7f79c");
          await interaction.reply({
            content: `공부시간 업로드가 완료되었습니다.\n공부를 많이하셨네요 ${interaction.member.nickname}님.\n3개(시간)이상인 항목이 있습니다!!!`,
            embeds: [embed],
          });
        }
      } else {
        embed.setColor("#808080");
        await interaction.reply({
          content: "공부시간 업로드가 완료되었습니다.",
          embeds: [embed],
        });
      }
    } else {
      await interaction.reply({
        content: "공부시간-업로드채널에서 업로드해주세요.",
      });
    }
  },
};
