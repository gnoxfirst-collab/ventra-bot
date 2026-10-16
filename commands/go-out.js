const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// استبدل هذا الـ ID الخاص بك (الايدي بتاع حسابك الشخصي على ديسكورد)
const OWNER_ID = '1463139407967031491';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('go-out')
    .setDescription('يُستخدم لخروج البوت من سيرفر معين (مخصص للمالك فقط)')
    .addStringOption(option =>
      option.setName('bot')
        .setDescription('اختر البوت المراد إخراجه')
        .setRequired(true)
        .addChoices(
          { name: 'Bot 1', value: 'bot1' },
          { name: 'Bot 2', value: 'bot2' }
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
    // التحقق مما إذا كان المستخدم هو أنت فقط
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({ content: '❌ عذراً، هذا الأمر مخصص لمالك البوت فقط!', ephemeral: true });
    }

    const botChoice = interaction.options.getString('bot');
    const serverId = interaction.options.getString('server_id');
    const sendMsg = interaction.options.getString('send_message');
    const msgText = interaction.options.getString('message_text');

    // تحديدClient الخاص بالبوت بناءً على الاختيار
    const client = botChoice === 'bot1' ? interaction.client.client1Ref : interaction.client.client2Ref;

    if (!client) {
      return interaction.reply({ content: '❌ لم يتم العثور على مرجع البوت المطلوب.', ephemeral: true });
    }

    const guild = client.guilds.cache.get(serverId);
    if (!guild) {
      return interaction.reply({ content: `❌ البوت المطلوب (${botChoice}) ليس موجوداً في السيرفر الذي يحمل الـ ID التالي: \`${serverId}\``, ephemeral: true });
    }

    try {
      // إرسال الرسالة إذا اخترت "نعم" وتم كتابة نص
      if (sendMsg === 'yes' && msgText) {
        const textChannel = guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(guild.members.me)?.has('SendMessages'));
        if (textChannel) {
          await textChannel.send(msgText);
        }
      }

      // مغادرة السيرفر
      await guild.leave();
      await interaction.reply({ content: `✅ بنجاح، قام البوت (${botChoice}) بمغادرة السيرفر: **${guild.name}**`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ حدث خطأ أثناء محاولة مغادرة السيرفر.', ephemeral: true });
    }
  },
};