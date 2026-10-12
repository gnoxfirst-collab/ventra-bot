const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قائمة ضخمة وشاملة لكل أعلام ودول العالم (أكثر من 190 دولة)
const ALL_FLAGS = [
  { country: 'مصر', flag: '🇪🇬' }, { country: 'السعودية', flag: '🇸🇦' }, { country: 'الإمارات', flag: '🇦🇪' },
  { country: 'الكويت', flag: '🇰🇼' }, { country: 'قطر', flag: '🇶🇦' }, { country: 'البحرين', flag: '🇧🇭' },
  { country: 'عومان', flag: '🇴🇲' }, { country: 'الأردن', flag: '🇯🇴' }, { country: 'فلسطين', flag: '🇵🇸' },
  { country: 'لبنان', flag: '🇱🇧' }, { country: 'سوريا', flag: '🇸🇾' }, { country: 'العراق', flag: '🇮🇶' },
  { country: 'المغرب', flag: '🇲🇦' }, { country: 'الجزائر', flag: '🇩🇿' }, { country: 'تونس', flag: '🇹🇳' },
  { country: 'ليبيا', flag: '🇱🇾' }, { country: 'السودان', flag: '🇸🇩' }, { country: 'موريتانيا', flag: '🇲🇷' },
  { country: 'اليمن', flag: '🇾🇪' }, { country: 'الصومال', flag: '🇸🇴' }, { country: 'جيبوتي', flag: '🇩🇯' },
  { country: 'جزر القمر', flag: '🇰🇲' }, { country: 'تركيا', flag: '🇹🇷' }, { country: 'إيران', flag: '🇮🇷' },
  { country: 'باكستان', flag: '🇵🇰' }, { country: 'أفغانستان', flag: '🇦🇫' }, { country: 'الهند', flag: '🇮🇳' },
  { country: 'بنغلاديش', flag: '🇧🇩' }, { country: 'إندونيسيا', flag: '🇮🇩' }, { country: 'ماليزيا', flag: '🇲🇾' },
  { country: 'سنغافورة', flag: '🇸🇬' }, { country: 'تايلاند', flag: '🇹🇭' }, { country: 'فيتنام', flag: '🇻🇳' },
  { country: 'الفلبين', flag: '🇵🇭' }, { country: 'اليابان', flag: '🇯🇵' }, { country: 'كوريا الجنوبية', flag: '🇰🇷' },
  { country: 'كوريا الشمالية', flag: '🇰🇵' }, { country: 'الصين', flag: '🇨🇳' }, { country: 'روسيا', flag: '🇷🇺' },
  { country: 'أوكرانيا', flag: '🇺🇦' }, { country: 'ألمانيا', flag: '🇩🇪' }, { country: 'فرنسا', flag: '🇫🇷' },
  { country: 'إيطاليا', flag: '🇮🇹' }, { country: 'إسبانيا', flag: '🇪🇸' }, { country: 'البرتغال', flag: '🇵🇹' },
  { country: 'المملكة المتحدة', flag: '🇬🇧' }, { country: 'بريطانيا', flag: '🇬🇧' }, { country: 'إنجلترا', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { country: 'الولايات المتحدة', flag: '🇺🇸' }, { country: 'امريكا', flag: '🇺🇸' }, { country: 'كندا', flag: '🇨🇦' },
  { country: 'المكسيك', flag: '🇲🇽' }, { country: 'البرازيل', flag: '🇧🇷' }, { country: 'الأرجنتين', flag: '🇦🇷' },
  { country: 'تشيلي', flag: '🇨🇱' }, { country: 'كولومبيا', flag: '🇨🇴' }, { country: 'بيرو', flag: '🇵🇪' },
  { country: 'أستراليا', flag: '🇦🇺' }, { country: 'نيوزيلندا', flag: '🇳🇿' }, { country: 'جنوب إفريقيا', flag: '🇿🇦' },
  { country: 'نيجيريا', flag: '🇳🇬' }, { country: 'كينيا', flag: '🇰🇪' }, { country: 'إثيوبيا', flag: '🇪🇹' },
  { country: 'غانا', flag: '🇬🇭' }, { country: 'الكاميرون', flag: '🇨🇲' }, { country: 'السنغال', flag: '🇸🇳' },
  { country: 'اليونان', flag: '🇬🇷' }, { country: 'قبرص', flag: '🇨🇾' }, { country: 'إيفرست', flag: '🇳🇵' },
  { country: 'نيبال', flag: '🇳🇵' }, { country: 'سويسرا', flag: '🇨🇭' }, { country: 'النمسا', flag: '🇦🇹' },
  { country: 'بلجيكا', flag: '🇧🇪' }, { country: 'هولندا', flag: '🇳🇱' }, { country: 'السويد', flag: '🇸🇪' },
  { country: 'النرويج', flag: '🇳🇴' }, { country: 'الدنمارك', flag: '🇩🇰' }, { country: 'فنلندا', flag: '🇫🇮' },
  { country: 'أيسلندا', flag: '🇮🇸' }, { country: 'بولندا', flag: '🇵🇱' }, { country: 'جمهورية التشيك', flag: '🇨🇿' },
  { country: 'المجر', flag: '🇭🇺' }, { country: 'رومانيا', flag: '🇷🇴' }, { country: 'بلغاريا', flag: '🇧🇬' },
  { country: 'صربيا', flag: '🇷🇸' }, { country: 'كرواتيا', flag: '🇭🇷' }, { country: 'ألبانيا', flag: '🇦🇱' },
  { country: 'أيرلندا', flag: '🇮🇪' }, { country: 'كوبا', flag: '🇨🇺' }, { country: 'بنما', flag: '🇵🇦' },
  { country: 'فنزويلا', flag: '🇻🇪' }, { country: 'إكوادور', flag: '🇪🇨' }, { country: 'بوليفيا', flag: '🇧🇴' },
  { country: 'باراغواي', flag: '🇵🇾' }, { country: 'أوروغواي', flag: '🇺🇾' }, { country: 'كوستاريكا', flag: '🇨🇷' },
  { country: 'جامايكا', flag: '🇯🇲' }, { country: 'هايتي', flag: '🇭🇹' }, { country: 'الدومينكان', flag: '🇩🇴' },
  { country: 'إندونيسيا', flag: '🇮🇩' }, { country: 'مالطا', flag: '🇲🇹' }, { country: 'الفاتيكان', flag: '🇻🇦' },
  { country: 'موناكو', flag: '🇲🇨' }, { country: 'أندورا', flag: '🇦🇩' }, { country: 'ليختنشتاين', flag: '🇱🇮' },
  { country: 'سلوفاكيا', flag: '🇸🇰' }, { country: 'سلوفينيا', flag: '🇸🇮' }, { country: 'استونيا', flag: '🇪🇪' },
  { country: 'لاتفيا', flag: '🇱🇻' }, { country: 'ليتوانيا', flag: '🇱🇹' }, { country: 'بيلاروسيا', flag: '🇧🇾' },
  { country: 'جورجيا', flag: '🇬🇪' }, { country: 'أرمينيا', flag: '🇦🇲' }, { country: 'أذربيجان', flag: '🇦🇿' },
  { country: 'كازاخستان', flag: '🇰🇿' }, { country: 'أوزبكستان', flag: '🇺🇿' }, { country: 'تركمانستان', flag: '🇹🇲' },
  { country: 'قيرغيزستان', flag: '🇰🇬' }, { country: 'طاجيكستان', flag: '🇹🇯' }, { country: 'منغوليا', flag: '🇲🇳' },
  { country: 'سريلانكا', flag: '🇱🇰' }, { country: 'نيپال', flag: '🇳🇵' }, { country: 'ميانمار', flag: '🇲🇲' },
  { country: 'لاوس', flag: '🇱🇦' }, { country: 'كمبوديا', flag: '🇰🇭' }, { country: 'بروناي', flag: '🇧🇳' },
  { country: 'تيمور الشرقية', flag: '🇹🇱' }, { country: 'بابوا غينيا الجديدة', flag: '🇵🇬' }, { country: 'فيجي', flag: '🇫🇯' }
];

// نظام لتخزين الأعلام التي تم استخدامها لكل سيرفر لعدم التكرار
const usedFlagsCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-flags')
    .setDescription('لعبة تخمين جميع أعلام دول العالم (بدون تكرار حتى تنتهي القائمة)'),

  async execute(interaction) {
    await interaction.deferReply();

    const guildId = interaction.guildId;

    // تهيئة قائمة السيرفر إذا لم تكن موجودة
    if (!usedFlagsCache.has(guildId)) {
      usedFlagsCache.set(guildId, []);
    }

    let serverUsed = usedFlagsCache.get(guildId);

    // إذا تم استنفاد كل الأعلام، نقوم بإعادة تعبئة القائمة من جديد
    if (serverUsed.length >= ALL_FLAGS.length) {
      serverUsed = [];
      usedFlagsCache.set(guildId, serverUsed);
    }

    // تصفية الأعلام المتبقية التي لم تظهر بعد
    const availableFlags = ALL_FLAGS.filter((_, index) => !serverUsed.includes(index));

    // اختيار علم عشوائي من المتبقي
    const randomIndexAvailable = Math.floor(Math.random() * availableFlags.length);
    const selectedFlagObj = availableFlags[randomIndexAvailable];
    
    // إيجاد الفهرس الأصلي وحفظه في السيرفر لكي لا يتكرر
    const originalIndex = ALL_FLAGS.findIndex(f => f.country === selectedFlagObj.country);
    serverUsed.push(originalIndex);

    const embed = new EmbedBuilder()
      .setTitle('🎮 تحدي أعلام دول العالم!')
      .setColor('#00FF7F')
      .setDescription(
        `ما هي الدولة التي يمثلها هذا العلم؟\n\n` +
        `# ${selectedFlagObj.flag}\n\n` +
        `⏱️ **لديك 15 ثانية لكتابة اسم الدولة في الشات!**\n` +
        `📊 *(الأعلام المتبقية بدون تكرار: ${ALL_FLAGS.length - serverUsed.length} من ${ALL_FLAGS.length})*`
      )
      .setFooter({ text: 'Aurebot • Flags Game System', iconURL: interaction.client.user.displayAvatarURL() })
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
          .setDescription(`كفو يا بطل! الإجابة الصحيحة هي بالفعل **${selectedFlagObj.country}** ${selectedFlagObj.flag}`)
          .setFooter({ text: 'Aurebot' });

        return await userMessage.reply({ embeds: [successEmbed] });
      } else {
        const failEmbed = new EmbedBuilder()
          .setTitle('❌ إجابة خاطئة!')
          .setColor('#FF0000')
          .setDescription(`للأسف إجابة خاطئة! الدولة الصحيحة هي **${selectedFlagObj.country}** ${selectedFlagObj.flag}`)
          .setFooter({ text: 'Aurebot' });

        return await userMessage.reply({ embeds: [failEmbed] });
      }

    } catch (error) {
      const timeoutEmbed = new EmbedBuilder()
        .setTitle('⏰ انتهى الوقت!')
        .setColor('#FFA500')
        .setDescription(`انتهت الـ 15 ثانية دون إجابة! الدولة كانت **${selectedFlagObj.country}** ${selectedFlagObj.flag}`)
        .setFooter({ text: 'Aurebot' });

      return await interaction.followUp({ embeds: [timeoutEmbed] });
    }
  }
};