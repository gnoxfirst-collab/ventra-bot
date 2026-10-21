const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('إرسال إعلان رسمي في قناة محددة')
    .addChannelOption(option => option.setName('channel').setDescription('القناة المراد إرسال الإعلان فيها').setRequired(true))
    .addStringOption(option => option.setName('title').setDescription('عنوان الإعلان').setRequired(true))
    .addStringOption(option => option.setName('content').setDescription('محتوى الإعلان').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const content = interaction.options.getString('content');

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle(`📢 ${title}`)
      .setDescription(content)
      .setTimestamp()
      .setFooter({ text: `تم الإعلان بواسطة: ${interaction.user.tag}` });

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `✅ تم إرسال الإعلان بنجاح في القناة ${channel}`, ephemeral: true });
  },
};