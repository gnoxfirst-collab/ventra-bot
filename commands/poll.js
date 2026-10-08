const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('poll').setDescription('عمل تصويت سريع (نعم أو لا)')
    .addStringOption(o => o.setName('question').setDescription('سؤال التصويت').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const embed = new EmbedBuilder()
      .setTitle('📊 تصويت جديد')
      .setDescription(question)
      .setColor('Blue')
      .setFooter({ text: `بواسطة: ${interaction.user.tag}` })
      .setTimestamp();
    const msg = await interaction.channel.send({ embeds: [embed] });
    await msg.react('👍');
    await msg.react('👎');
    await interaction.reply({ content: '✅ تم إنشاء التصويت بنجاح في الروم.', ephemeral: true });
  }
};