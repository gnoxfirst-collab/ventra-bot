const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('ventraavatar').setDescription('الحصول على صورة بروفايلك أو بروفايل عضو آخر بدقة عالية')
    .addUserOption(o => o.setName('user').setDescription('العضو المراد جلب صورته')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    await interaction.reply(`🖼️ صورة بروفايل **${user.tag}**:\n${user.displayAvatarURL({ size: 2048, dynamic: true })}`);
  }
};