const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('customebed')
    .setDescription('إرسال رسالة Embed مخصصة واحترافية')
    .addChannelOption(option => option.setName('channel').setDescription('القناة المستهدفة').setRequired(true))
    .addStringOption(option => option.setName('title').setDescription('عنوان الـ Embed').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('محتوى النص').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('لون الـ Hex (مثال: #ff0000)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const color = interaction.options.getString('color') || '#5865F2';

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setTimestamp();

    try {
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: `✅ تم إرسال رسالة الـ Embed بنجاح في القناة ${channel}`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ حدث خطأ أثناء إرسال الرسالة.', ephemeral: true });
    }
  },
};