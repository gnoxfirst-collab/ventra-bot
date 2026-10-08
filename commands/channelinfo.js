const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('channelinfo').setDescription('عرض معلومات الروم الحالي'),
  async execute(interaction) {
    const channel = interaction.channel;
    await interaction.reply(`📌 اسم الروم: ${channel.name}\n🆔 الآيدي: \`${channel.id}\`\n📂 النوع: \`${channel.type}\``);
  }
};