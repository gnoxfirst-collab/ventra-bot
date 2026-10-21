const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendbutton')
    .setDescription('إرسال رسالة تحتوي على زر تفاعلي برابط')
    .addChannelOption(option => option.setName('channel').setDescription('القناة المستهدفة').setRequired(true))
    .addStringOption(option => option.setName('text').setDescription('نص الرسالة').setRequired(true))
    .addStringOption(option => option.setName('buttontext').setDescription('اسم الزر').setRequired(true))
    .addStringOption(option => option.setName('url').setDescription('رابط الزر (URL)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const text = interaction.options.getString('text');
    const btnText = interaction.options.getString('buttontext');
    const url = interaction.options.getString('url');

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setDescription(text);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(btnText)
          .setStyle(ButtonStyle.Link)
          .setURL(url)
      );

    try {
      await channel.send({ embeds: [embed], components: [row] });
      await interaction.reply({ content: `✅ تم إرسال الرسالة بالزر التفاعلي بنجاح في القناة ${channel}`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ تأكد من صحة الرابط وأن البوت يمتلك صلاحيات النشر.', ephemeral: true });
    }
  },
};