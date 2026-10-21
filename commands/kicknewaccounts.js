const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kicknewaccounts')
    .setDescription('طرد الحسابات التي تم إنشاؤها حديثاً على ديسكورد')
    .addIntegerOption(option => 
      option.setName('days')
        .setDescription('حد الأيام (طرد من أنشأ حسابه قبل أقل من هذا العدد من الأيام)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(30)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const days = interaction.options.getInteger('days');
    await interaction.deferReply({ ephemeral: true });

    const members = await interaction.guild.members.fetch();
    const now = Date.now();
    const maxAge = days * 24 * 60 * 60 * 1000;

    const newMembers = members.filter(m => !m.user.bot && (now - m.user.createdTimestamp) < maxAge);

    let count = 0;
    for (const [, member] of newMembers) {
      try {
        await member.kick(`حساب جديد (تم إنشاؤه في أقل من ${days} أيام)`);
        count++;
      } catch (e) {}
    }

    await interaction.editReply({ content: `🛡️ تم طرد **${count}** حساب جديد تم إنشاؤه في أقل من ${days} أيام.` });
  },
};