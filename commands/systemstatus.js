const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('systemstatus')
    .setDescription('عرض استهلاك الذاكرة وحالة سيرفر استضافة البوت'),

  async execute(interaction) {
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const uptimeHours = (interaction.client.uptime / (1000 * 60 * 60)).toFixed(1);

    const embed = new EmbedBuilder()
      .setColor('#1abc9c')
      .setTitle('⚙️ حالة موارد نظام البوت (Resource Monitor)')
      .addFields(
        { name: '💾 استهلاك الذاكرة (RAM)', value: `\`${memoryUsage} MB\``, inline: true },
        { name: '⏱️ مدة العمل المستمر', value: `\`${uptimeHours} ساعة\``, inline: true },
        { name: '🌐 إجمالي السيرفرات المتصلة', value: `\`${interaction.client.guilds.cache.size}\``, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};