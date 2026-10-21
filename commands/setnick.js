const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setnick')
    .setDescription('تغيير الاسم المستعار لعضو في السيرفر')
    .addUserOption(option => option.setName('user').setDescription('العضو').setRequired(true))
    .addStringOption(option => option.setName('nickname').setDescription('الاسم الجديد').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const nickname = interaction.options.getString('nickname');
    const member = await interaction.guild.members.fetch(user.id);

    try {
      await member.setNickname(nickname);
      await interaction.reply({ content: `✅ تم تغيير اسم العضو **${user.tag}** إلى **${nickname}**` });
    } catch (error) {
      await interaction.reply({ content: '❌ لم أتمكن من تغيير اسم العضو بسبب الصلاحيات.', ephemeral: true });
    }
  },
};