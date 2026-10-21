const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendrules')
    .setDescription('إرسال لوحة قوانين السيرفر الرسمية')
    .addChannelOption(option => option.setName('channel').setDescription('القناة المراد إرسال القوانين بها').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    const rulesEmbed = new EmbedBuilder()
      .setColor('#e74c3c')
      .setTitle(`📜 قوانين وضوابط سيرفر ${interaction.guild.name}`)
      .setDescription('يرجى الالتزام بالقوانين التالية لضمان بيئة آمنة للجميع:')
      .addFields(
        { name: '1️⃣ الاحترام المتبادل', value: 'يمنع السب، الشتم، أو الإساءة لأي عضو بجميع أشكالها.' },
        { name: '2️⃣ منع الإعلانات', value: 'يمنع نشر روابط السيرفرات الأخرى أو الإعلانات دون إذن إداري.' },
        { name: '3️⃣ عدم السپام', value: 'يمنع تكرار الرسائل أو إرسال صور ومشاهد غير لائقة.' },
        { name: '4️⃣ منشن الإدارة', value: 'يرجى عدم استخدام @everyone إلا للحالات الضرورية القصوى.' }
      )
      .setTimestamp()
      .setFooter({ text: 'إدارة السيرفر تتمنى لكم وقتاً ممتعاً' });

    await channel.send({ embeds: [rulesEmbed] });
    await interaction.reply({ content: `✅ تم إرسال لوحة القوانين بنجاح في القناة ${channel}`, ephemeral: true });
  },
};