const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('senddm')
    .setDescription('إرسال رسالة خاصة لعضو من البوت')
    .addUserOption(option => option.setName('target').setDescription('العضو المستهدف').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription('نص الرسالة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const msg = interaction.options.getString('message');

    try {
      await target.send(`📩 **رسالة خاصة من إدارة السيرفر (${interaction.guild.name}):**\n\n${msg}`);
      await interaction.reply({ content: `✅ تم إرسال الرسالة بنجاح إلى ${target}`, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: '❌ لم أتمكن من إرسال الرسالة، قد تكون الرسائل الخاصة مقفلة لدى العضو.', ephemeral: true });
    }
  },
};