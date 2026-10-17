const { SlashCommandBuilder } = require('discord.js');

const OWNER_ID = '1463139407967031491';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('go-out')
    .setDescription('يُستخدم لخروج البوت من سيرفر معين (مخصص للمالك فقط)')
    .addStringOption(option =>
      option.setName('bot')
        .setDescription('اختر اسم البوت المراد إخراجه')
        .setRequired(true)
        .addChoices(
          // سيتم تحديث الأسماء هنا لتطابق أسماء بوتاتك الحقيقية
          { name: 'VENTRA', value: 'bot1' },
          { name: 'Fire Community', value: 'bot2' }
        )
    )
    .addStringOption(option =>
      option.setName('server_id')
        .setDescription('أدخل ايدي (ID) السيرفر المراد مغادرته')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('send_message')
        .setDescription('هل تريد إرسال رسالة قبل الخروج؟')
        .setRequired(true)
        .addChoices(
          { name: 'نعم', value: 'yes' },
          { name: 'لا', value: 'no' }
        )
    )
    .addStringOption(option =>
      option.setName('message_text')
        .setDescription('نص الرسالة (إذا اخترت نعم في الخيار السابق)')
        .setRequired(false)
    ),

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({ content: '❌ عذراً، هذا الأمر مخصص لمالك البوت فقط!', ephemeral: true });
    }

    const botChoice = interaction.options.getString('bot');
    const serverId = interaction.options.getString('server_id');
    const sendMsg = interaction.options.getString('send_message');
    const msgText = interaction.options.getString('message_text');

    const client = botChoice === 'bot1' ? interaction.client.client1Ref : interaction.client.client2Ref;

    if (!client) {
      return interaction.reply({ content: '❌ لم يتم العثور على مرجع البوت المطلوب.', ephemeral: true });
    }

    const guild = client.guilds.cache.get(serverId);
    if (!guild) {
      return interaction.reply({ content: `❌ البوت ليس موجوداً في السيرفر الذي يحمل الـ ID التالي: \`${serverId}\``, ephemeral: true });
    }

    try {
      if (sendMsg === 'yes' && msgText) {
        const textChannel = guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(guild.members.me)?.has('SendMessages'));
        if (textChannel) {
          await textChannel.send(msgText);
        }
      }

      await guild.leave();
      await interaction.reply({ content: `✅ بنجاح، قام البوت (${client.user.username}) بمغادرة السيرفر: **${guild.name}**`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ حدث خطأ أثناء محاولة مغادرة السيرفر.', ephemeral: true });
    }
  },
};