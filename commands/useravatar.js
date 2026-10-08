const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('useravatar').setDescription('عرض صورة بروفايلك أو بروفايل عضو آخر بخامات عالية الدقة')
    .addUserOption(o => o.setName('target').setDescription('العضو المراد عرض صورته')),
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;
    await interaction.reply(`🖼️ صورة بروفايل **${user.tag}**:\n${user.displayAvatarURL({ size: 2048, dynamic: true })}`);
  }
};