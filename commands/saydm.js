const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('saydm').setDescription('إرسال رسالة خاصة لعضو بواسطة البوت')
    .addUserOption(o => o.setName('user').setDescription('العضو المستهدف').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('نص الرسالة').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const msg = interaction.options.getString('message');
    try {
      await user.send(msg);
      await interaction.reply({ content: `✅ تم إرسال الرسالة الخاصة إلى ${user.tag} بنجاح.`, ephemeral: true });
    } catch {
      await interaction.reply({ content: '❌ تعذر إرسال رسالة خاصة لهذا العضو (قد تكون رسائله الخاصة مغلقة).', ephemeral: true });
    }
  }
};