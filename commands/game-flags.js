\const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قائمة شاملة لجميع دول العالم مع الرمز الكودي لخدمة الصور المباشرة HD High-Resolution Flags
const ALL_FLAGS = [
  { country: 'مصر', code: 'eg' }, { country: 'السعودية', code: 'sa' }, { country: 'الإمارات', code: 'ae' },
  { country: 'الكويت', code: 'kw' }, { country: 'قطر', code: 'qa' }, { country: 'البحرين', code: 'bh' },
  { country: 'عمان', code: 'om' }, { country: 'الأردن', code: 'jo' }, { country: 'فلسطين', code: 'ps' },
  { country: 'لبنان', code: 'lb' }, { country: 'سوريا', code: 'sy' }, { country: 'العراق', code: 'iq' },
  { country: 'المغرب', code: 'ma' }, { country: 'الجزائر', code: 'dz' }, { country: 'تونس', code: 'tn' },
  { country: 'ليبيا', code: 'ly' }, { country: 'السودان', code: 'sd' }, { country: 'موريتانيا', code: 'mr' },
  { country: 'اليمن', code: 'ye' }, { country: 'الصومال', code: 'so' }, { country: 'جيبوتي', code: 'dj' },
  { country: 'تركي', code: 'tr' }, { country: 'تركيا', code: 'tr' }, { country: 'إيران', code: 'ir' },
  { country: 'باكستان', code: 'pk' }, { country: 'الهند', code: 'in' }, { country: 'إندونيسيا', code: 'id' },
  { country: 'ماليزيا', code: 'my' }, { country: 'اليابان', code: 'jp' }, { country: 'كوريا الجنوبية', code: 'kr' },
  { country: 'الصين', code: 'cn' }, { country: 'روسيا', code: 'ru' }, { country: 'ألمانيا', code: 'de' },
  { country: 'فرنسا', code: 'fr' }, { country: 'إيطاليا', code: 'it' }, { country: 'إسبانيا', code: 'es' },
  { country: 'البرتغال', code: 'pt' }, { country: 'بريطانيا', code: 'gb' }, { country: 'المملكة المتحدة', code: 'gb' },
  { country: 'أمريكا', code: 'us' }, { country: 'الولايات المتحدة', code: 'us' }, { country: 'كندا', code: 'ca' },
  { country: 'المكسيك', code: 'mx' }, { country: 'البرازيل', code: 'br' }, { country: 'الأرجنتين', code: 'ar' },
  { country: 'أستراليا', code: 'au' }, { country: 'جنوب إفريقيا', code: 'za' }, { country: 'السويد', code: 'se' },
  { country: 'النرويج', code: 'no' }, { country: 'الدنمارك', code: 'dk' }, { country: 'فنلندا', code: 'fi' },
  { country: 'سويسرا', code: 'ch' }, { country: 'هولندا', code: 'nl' }, { country: 'بلجيكا', code: 'be' }
];

// نظام لتخزين الأعلام المستخدمة لكل سيرفر لمنع التكرار
const usedFlagsCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-flags')
    .setDescription('لعبة تخمين جميع أعلام دول العالم بالصور HD (بدون تكرار)'),

  async execute(interaction) {
    await interaction.deferReply();

    const guildId = interaction.guildId;
    const guildIcon = interaction.guild?.iconURL({ dynamic: true }) || interaction.client.user.displayAvatarURL();

    // تهيئة القائمة الخاصة بالسيرفر
    if (!usedFlagsCache.has(guildId)) {
      usedFlagsCache.set(guildId, []);
    }

    let serverUsed = usedFlagsCache.get(guildId);

    // إعادة تعبئة الأعلام إذا تم استهلاك جميع الدول
    if (serverUsed.length >= ALL_FLAGS.length) {
      serverUsed = [];
      usedFlagsCache.set(guildId, serverUsed);
    }

    // فلترة الأعلام المتاحة فقط
    const availableFlags = ALL_FLAGS.filter((_, index) => !serverUsed.includes(index));
    const selectedFlagObj = availableFlags[Math.floor(Math.random() * availableFlags.length)];

    // حظر هذا العلم في السيرفر لكي لا يتكرر
    const originalIndex = ALL_FLAGS.findIndex(f => f.country === selectedFlagObj.country && f.code === selectedFlagObj.code);
    serverUsed.push(originalIndex);

    // رابط صورة العلم بجودة HD واضحة جداً وخطوط بارزة
    const flagImageUrl = `https://flagcdn.com/w640/${selectedFlagObj.code}.png`;

    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('🎮 تحدي أعلام دول العالم!')
      .setDescription(
        'ما هي الدولة التي يمثلها هذا العلم المعروض في الصورة؟\n\n' +
        '⏱️ **لديك 15 ثانية لكتابة اسم الدولة في الشات!**\n\n' +
        `📊 *(الأعلام المتبقية بدون تكرار: ${ALL_FLAGS.length - serverUsed.length} من ${ALL_FLAGS.length})*`
      )
      .setThumbnail(guildIcon) // صورة السيرفر بجانب الإمبيد
      .setImage(flagImageUrl) // صورة العلم HD كبيرة وواضحة جداً
      .setFooter({ text: 'Aurebot • Flags Game System' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

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
        const successEmbed = new EmbedBuilder()
          .setTitle('🎉 إجابة صحيحة!')
          .setColor('#00FF00')
          .setDescription(`كفو يا بطل! الإجابة الصحيحة هي بالفعل **${selectedFlagObj.country}** 🏆`)
          .setFooter({ text: 'Aurebot' });

        return await userMessage.reply({ embeds: [successEmbed] });
      } else {
        const failEmbed = new EmbedBuilder()
          .setTitle('❌ إجابة خاطئة!')
          .setColor('#FF0000')
          .setDescription(`للأسف إجابة خاطئة! الدولة الصحيحة هي **${selectedFlagObj.country}**`)
          .setFooter({ text: 'Aurebot' });

        return await userMessage.reply({ embeds: [failEmbed] });
      }

    } catch (error) {
      const timeoutEmbed = new EmbedBuilder()
        .setTitle('⏰ انتهى الوقت!')
        .setColor('#FFA500')
        .setDescription(`انتهت الـ 15 ثانية دون إجابة! الدولة كانت **${selectedFlagObj.country}**`)
        .setFooter({ text: 'Aurebot' });

      return await interaction.followUp({ embeds: [timeoutEmbed] });
    }
  }
};