const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('embed').setDescription('إرسال رسالة إمبد منسقة')
    .addStringOption(o => o.setName('title').setDescription('عنوان الإمبد').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('محتوى الإمبد').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor('#0099ff')
      .setTimestamp();
    await interaction.channel.send({ embeds: [embed] });
    await interaction.reply({ content: '✨ تم إرسال الإمبد بنجاح.', ephemeral: true });
  }
};