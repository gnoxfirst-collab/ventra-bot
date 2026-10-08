const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('slowmode2').setDescription('تحديد سرعة البطء للشات')
    .addIntegerOption(o => o.setName('seconds').setDescription('عدد الثواني').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');
    await interaction.channel.setRateLimitPerUser(seconds);
    await interaction.reply(`⏱️ تم ضبط سرعة الشات على ${seconds} ثانية.`);
  }
};