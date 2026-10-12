const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قائمة شاملة لأعلام دول العالم
const ALL_FLAGS = [
  { country: 'مصر', code: 'eg' }, { country: 'السعودية', code: 'sa' }, { country: 'الإمارات', code: 'ae' },
  { country: 'الكويت', code: 'kw' }, { country: 'قطر', code: 'qa' }, { country: 'البحرين', code: 'bh' },
  { country: 'عمان', code: 'om' }, { country: 'الأردن', code: 'jo' }, { country: 'فلسطين', code: 'ps' },
  { country: 'لبنان', code: 'lb' }, { country: 'سوريا', code: 'sy' }, { country: 'العراق', code: 'iq' },
  { country: 'المغرب', code: 'ma' }, { country: 'الجزائر', code: 'dz' }, { country: 'تونس', code: 'tn' },
  { country: 'ليبيا', code: 'ly' }, { country: 'السودان', code: 'sd' }, { country: 'موريتانيا', code: 'mr' },
  { country: 'اليمن', code: 'ye' }, { country: 'الصومال', code: 'so' }, { country: 'جيبوتي', code: 'dj' },
  { country: 'تركيا', code: 'tr' }, { country: 'إيران', code: 'ir' }, { country: 'باكستان', code: 'pk' },
  { country: 'الهند', code: 'in' }, { country: 'إندونيسيا', code: 'id' }, { country: 'ماليزيا', code: 'my' },
  { country: 'اليابان', code: 'jp' }, { country: 'كوريا الجنوبية', code: 'kr' }, { country: 'الصين', code: 'cn' },
  { country: 'روسيا', code: 'ru' }, { country: 'ألمانيا', code: 'de' }, { country: 'فرنسا', code: 'fr' },
  { country: 'إيطاليا', code: 'it' }, { country: 'إسبانيا', code: 'es' }, { country: 'البرتغال', code: 'pt' },
  { country: 'بريطانيا', code: 'gb' }, { country: 'أمريكا', code: 'us' }, { country: 'كندا', code: 'ca' },
  { country: 'المكسيك', code: 'mx' }, { country: 'البرازيل', code: 'br' }, { country: 'الأرجنتين', code: 'ar' },
  { country: 'أستراليا', code: 'au' }, { country: 'جنوب إفريقيا', code: 'za' }, { country: 'السويد', code: 'se' }
];

const usedFlagsCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-flags')
    .setDescription('لعبة تحدي أعلام دول العالم (15 جولة بنظام النقاط)'),

  async execute(interaction) {
    // إعلام ديسكورد ببدء معالجة الأمر لمنع خطأ Application Did Not Respond
    await interaction.deferReply();

    const guildId = interaction.guildId;
    const guildIcon = interaction.guild?.iconURL({ dynamic: true }) || interaction.client.user.displayAvatarURL();

    if (!usedFlagsCache.has(guildId)) {
      usedFlagsCache.set(guildId, []);
    }

    let serverUsed = usedFlagsCache.get(guildId);
    let score = 0;

    // بدء الـ 15 جولة متتالية
    for (let round = 1; round <= 15; round++) {
      if (serverUsed.length >= ALL_FLAGS.length) {
        serverUsed = [];
        usedFlagsCache.set(guildId, serverUsed);
      }

      const availableFlags = ALL_FLAGS.filter((_, index) => !serverUsed.includes(index));
      const selectedFlagObj = availableFlags[Math.floor(Math.random() * availableFlags.length)];

      const originalIndex = ALL_FLAGS.findIndex(f => f.country === selectedFlagObj.country && f.code === selectedFlagObj.code);
      serverUsed.push(originalIndex);

      const flagImageUrl = `https://flagcdn.com/w640/${selectedFlagObj.code}.png`;

      const roundEmbed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`🎮 تحدي الأعلام - الجولة [${round} من 15]`)
        .setDescription(
          'ما هي الدولة التي يمثلها هذا العلم؟\n\n' +
          '⏱️ **لديك 15 ثانية لكتابة اسم الدولة في الشات!**'
        )
        .setThumbnail(guildIcon)
        .setImage(flagImageUrl);

      if (round === 1) {
        await interaction.editReply({ embeds: [roundEmbed] });
      } else {
        await interaction.channel.send({ embeds: [roundEmbed] });
      }

      const filter = response => response.author.id === interaction.user.id;

      try {
        const collected = await interaction.channel.awaitMessages({
          filter,
          max: 1,
          time: 15000,
          errors: ['time']
        });

        const userMessage = collected.first();
        const answer = userMessage.content.trim().toLowerCase();

        if (answer === selectedFlagObj.country.toLowerCase()) {
          score++;
          const successEmbed = new EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`🎉 كفو <@${interaction.user.id}>! إجابة صحيحة (${score} نقاط)`);
          
          await interaction.channel.send({ embeds: [successEmbed] });
        } else {
          // إجابة خاطئة بدون كشف الدولة مع منشن المستخدم
          const failEmbed = new EmbedBuilder()
            .setColor('#ED4245')
            .setDescription(`❌ <@${interaction.user.id}> إجابة غير صحيحة! حاول في الجولة القادمة.`);
          
          await interaction.channel.send({ embeds: [failEmbed] });
        }

      } catch (error) {
        const timeoutEmbed = new EmbedBuilder()
          .setColor('#FEE75C')
          .setDescription(`⏰ <@${interaction.user.id}> انتهى الوقت ولم تكتب الإجابة!`);
        
        await interaction.channel.send({ embeds: [timeoutEmbed] });
      }

      // استراحة قصيرة بين الجولات
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // إرسال النتائج النهائية بعد الـ 15 جولة
    const finalEmbed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🏆 انتهت لعبة الأعلام بنجاح!')
      .setDescription(`لقد أنهيت الـ 15 جولة يا <@${interaction.user.id}> وحصلت على مجموع: **${score} من 15** نقطة! 🔥`)
      .setTimestamp();

    await interaction.channel.send({ embeds: [finalEmbed] });
  }
};