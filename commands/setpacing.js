const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setpacing')
    .setDescription('تحديد مهلة زمنية (Slowmode) بين إرسال الرسائل في القناة')
    .addIntegerOption(option => 
      option.setName('seconds')
        .setDescription('عدد الثواني بين كل رسالة ورسالة (0 لإلغاء المهلة)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(21600)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    try {
      await interaction.channel.setRateLimitPerUser(seconds);
      if (seconds === 0) {
        await interaction.reply({ content: '⚡ تم إلغاء الوضع البطئ في هذه القناة بنجاح.' });
      } else {
        await interaction.reply({ content: `⏱️ تم تحديد المهلة بين الرسائل بـ **${seconds}** ثانية.` });
      }
    } catch (error) {
      await interaction.reply({ content: '❌ لم أتمكن من ضبط مهلة القناة.', ephemeral: true });
    }
  },
};