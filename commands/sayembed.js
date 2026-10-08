const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('sayembed').setDescription('جعل البوت يكرر رسالتك داخل إمبد رسمي')
    .addStringOption(o => o.setName('text').setDescription('النص المراد إرساله').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    const embed = new EmbedBuilder()
      .setDescription(text)
      .setColor('Random');
    await interaction.channel.send({ embeds: [embed] });
    await interaction.reply({ content: '✨ تم إرسال الإمبد بنجاح.', ephemeral: true });
  }
};