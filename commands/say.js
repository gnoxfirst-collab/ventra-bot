const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('say').setDescription('جعل البوت يردد كلامك')
    .addStringOption(o => o.setName('message').setDescription('الرسالة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const msg = interaction.options.getString('message');
    await interaction.channel.send(msg);
    await interaction.reply({ content: '✅ تم إرسال الرسالة.', ephemeral: true });
  }
};