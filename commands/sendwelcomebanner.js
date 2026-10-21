const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendwelcomebanner')
    .setDescription('إرسال لوحة ترحيب احترافية في القناة')
    .addChannelOption(option => option.setName('channel').setDescription('قناة الترحيب').setRequired(true))
    .addUserOption(option => option.setName('user').setDescription('العضو الجديد').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const user = interaction.options.getUser('user');

    const embed = new EmbedBuilder()
      .setColor('#2ecc71')
      .setTitle(`🎉 أهلاً بك في سيرفر ${interaction.guild.name}!`)
      .setDescription(`نورت السيرفر يا ${user}! نتمنى لك وقتاً ممتعاً معنا.`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await channel.send({ content: `${user}`, embeds: [embed] });
    await interaction.reply({ content: '✅ تم إرسال الترحيب بنجاح.', ephemeral: true });
  },
};