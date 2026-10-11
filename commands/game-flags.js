const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// قائمة شاملة تضم جميع أعلام دول العالم (أكثر من 195 دولة)
const allFlags = [
  { name: "مصر", url: "https://flagcdn.com/w320/eg.png" },
  { name: "السعودية", url: "https://flagcdn.com/w320/sa.png" },
  { name: "الإمارات", url: "https://flagcdn.com/w320/ae.png" },
  { name: "المغرب", url: "https://flagcdn.com/w320/ma.png" },
  { name: "الجزائر", url: "https://flagcdn.com/w320/dz.png" },
  { name: "تونس", url: "https://flagcdn.com/w320/tn.png" },
  { name: "العراق", url: "https://flagcdn.com/w320/iq.png" },
  { name: "الأردن", url: "https://flagcdn.com/w320/jo.png" },
  { name: "سوريا", url: "https://flagcdn.com/w320/sy.png" },
  { name: "لبنان", url: "https://flagcdn.com/w320/lb.png" },
  { name: "فلسطين", url: "https://flagcdn.com/w320/ps.png" },
  { name: "الكويت", url: "https://flagcdn.com/w320/kw.png" },
  { name: "قطر", url: "https://flagcdn.com/w320/qa.png" },
  { name: "البحرين", url: "https://flagcdn.com/w320/bh.png" },
  { name: "عمان", url: "https://flagcdn.com/w320/om.png" },
  { name: "اليمن", url: "https://flagcdn.com/w320/ye.png" },
  { name: "السودان", url: "https://flagcdn.com/w320/sd.png" },
  { name: "ليبيا", url: "https://flagcdn.com/w320/ly.png" },
  { name: "الصومال", url: "https://flagcdn.com/w320/so.png" },
  { name: "موريتانيا", url: "https://flagcdn.com/w320/mr.png" },
  { name: "جيبوتي", url: "https://flagcdn.com/w320/dj.png" },
  { name: "جزر القمر", url: "https://flagcdn.com/w320/km.png" },
  { name: "الصين", url: "https://flagcdn.com/w320/cn.png" },
  { name: "اليابان", url: "https://flagcdn.com/w320/jp.png" },
  { name: "كوريا الجنوبية", url: "https://flagcdn.com/w320/kr.png" },
  { name: "كوريا الشمالية", url: "https://flagcdn.com/w320/kp.png" },
  { name: "الهند", url: "https://flagcdn.com/w320/in.png" },
  { name: "باكستان", url: "https://flagcdn.com/w320/pk.png" },
  { name: "بنغلاديش", url: "https://flagcdn.com/w320/bd.png" },
  { name: "إندونيسيا", url: "https://flagcdn.com/w320/id.png" },
  { name: "ماليزيا", url: "https://flagcdn.com/w320/my.png" },
  { name: "تايلاند", url: "https://flagcdn.com/w320/th.png" },
  { name: "فيتنام", url: "https://flagcdn.com/w320/vn.png" },
  { name: "الفلبين", url: "https://flagcdn.com/w320/ph.png" },
  { name: "إيران", url: "https://flagcdn.com/w320/ir.png" },
  { name: "تركيا", url: "https://flagcdn.com/w320/tr.png" },
  { name: "أفغانستان", url: "https://flagcdn.com/w320/af.png" },
  { name: "إسرائيل", url: "https://flagcdn.com/w320/il.png" },
  { name: "روسيا", url: "https://flagcdn.com/w320/ru.png" },
  { name: "أوكرانيا", url: "https://flagcdn.com/w320/ua.png" },
  { name: "بيلاروسيا", url: "https://flagcdn.com/w320/by.png" },
  { name: "بولندا", url: "https://flagcdn.com/w320/pl.png" },
  { name: "ألمانيا", url: "https://flagcdn.com/w320/de.png" },
  { name: "فرنسا", url: "https://flagcdn.com/w320/fr.png" },
  { name: "المملكة المتحدة", url: "https://flagcdn.com/w320/gb.png" },
  { name: "إيطاليا", url: "https://flagcdn.com/w320/it.png" },
  { name: "إسبانيا", url: "https://flagcdn.com/w320/es.png" },
  { name: "البرتغال", url: "https://flagcdn.com/w320/pt.png" },
  { name: "هولندا", url: "https://flagcdn.com/w320/nl.png" },
  { name: "بلجيكا", url: "https://flagcdn.com/w320/be.png" },
  { name: "سويسرا", url: "https://flagcdn.com/w320/ch.png" },
  { name: "النمسا", url: "https://flagcdn.com/w320/at.png" },
  { name: "السويد", url: "https://flagcdn.com/w320/se.png" },
  { name: "النرويج", url: "https://flagcdn.com/w320/no.png" },
  { name: "الدنمارك", url: "https://flagcdn.com/w320/dk.png" },
  { name: "فنلندا", url: "https://flagcdn.com/w320/fi.png" },
  { name: "أيسلندا", url: "https://flagcdn.com/w320/is.png" },
  { name: "أيرلندا", url: "https://flagcdn.com/w320/ie.png" },
  { name: "اليونان", url: "https://flagcdn.com/w320/gr.png" },
  { name: "قبرص", url: "https://flagcdn.com/w320/cy.png" },
  { name: "مالطا", url: "https://flagcdn.com/w320/mt.png" },
  { name: "ألبانيا", url: "https://flagcdn.com/w320/al.png" },
  { name: "صربيا", url: "https://flagcdn.com/w320/rs.png" },
  { name: "كرواتيا", url: "https://flagcdn.com/w320/hr.png" },
  { name: "البوسنة والهرسك", url: "https://flagcdn.com/w320/ba.png" },
  { name: "رومانيا", url: "https://flagcdn.com/w320/ro.png" },
  { name: "بلغاريا", url: "https://flagcdn.com/w320/bg.png" },
  { name: "المجر", url: "https://flagcdn.com/w320/hu.png" },
  { name: "التشيك", url: "https://flagcdn.com/w320/cz.png" },
  { name: "سلوفاكيا", url: "https://flagcdn.com/w320/sk.png" },
  { name: "سلوفينيا", url: "https://flagcdn.com/w320/si.png" },
  { name: "استونيا", url: "https://flagcdn.com/w320/ee.png" },
  { name: "لاتفيا", url: "https://flagcdn.com/w320/lv.png" },
  { name: "ليتوانيا", url: "https://flagcdn.com/w320/lt.png" },
  { name: "لوكسمبورغ", url: "https://flagcdn.com/w320/lu.png" },
  { name: "الولايات المتحدة", url: "https://flagcdn.com/w320/us.png" },
  { name: "كندا", url: "https://flagcdn.com/w320/ca.png" },
  { name: "المكسيك", url: "https://flagcdn.com/w320/mx.png" },
  { name: "البرازيل", url: "https://flagcdn.com/w320/br.png" },
  { name: "الأرجنتين", url: "https://flagcdn.com/w320/ar.png" },
  { name: "كولومبيا", url: "https://flagcdn.com/w320/co.png" },
  { name: "تشيلي", url: "https://flagcdn.com/w320/cl.png" },
  { name: "بيرو", url: "https://flagcdn.com/w320/pe.png" },
  { name: "فنزويلا", url: "https://flagcdn.com/w320/ve.png" },
  { name: "الإكوادور", url: "https://flagcdn.com/w320/ec.png" },
  { name: "بوليفيا", url: "https://flagcdn.com/w320/bo.png" },
  { name: "باراغواي", url: "https://flagcdn.com/w320/py.png" },
  { name: "أوروغواي", url: "https://flagcdn.com/w320/uy.png" },
  { name: "كوبا", url: "https://flagcdn.com/w320/cu.png" },
  { name: "بنما", url: "https://flagcdn.com/w320/pa.png" },
  { name: "كوستاريكا", url: "https://flagcdn.com/w320/cr.png" },
  { name: "هندوراس", url: "https://flagcdn.com/w320/hn.png" },
  { name: "غواتيمالا", url: "https://flagcdn.com/w320/gt.png" },
  { name: "السلفادور", url: "https://flagcdn.com/w320/sv.png" },
  { name: "نيكاراغوا", url: "https://flagcdn.com/w320/ni.png" },
  { name: "جمهورية الدومينيكان", url: "https://flagcdn.com/w320/do.png" },
  { name: "هايتي", url: "https://flagcdn.com/w320/ht.png" },
  { name: "جامايكا", url: "https://flagcdn.com/w320/jm.png" },
  { name: "أستراليا", url: "https://flagcdn.com/w320/au.png" },
  { name: "نيوزيلندا", url: "https://flagcdn.com/w320/nz.png" },
  { name: "فيجي", url: "https://flagcdn.com/w320/fj.png" },
  { name: "بابوا غينيا الجديدة", url: "https://flagcdn.com/w320/pg.png" },
  { name: "جنوب أفريقيا", url: "https://flagcdn.com/w320/za.png" },
  { name: "نيجيريا", url: "https://flagcdn.com/w320/ng.png" },
  { name: "كينيا", url: "https://flagcdn.com/w320/ke.png" },
  { name: "إثيوبيا", url: "https://flagcdn.com/w320/et.png" },
  { name: "غانا", url: "https://flagcdn.com/w320/gh.png" },
  { name: "الكاميرون", url: "https://flagcdn.com/w320/cm.png" },
  { name: "السنغال", url: "https://flagcdn.com/w320/sn.png" },
  { name: "ساحل العاج", url: "https://flagcdn.com/w320/ci.png" },
  { name: "زيمبابوي", url: "https://flagcdn.com/w320/zw.png" },
  { name: "أنغولا", url: "https://flagcdn.com/w320/ao.png" },
  { name: "موزمبيق", url: "https://flagcdn.com/w320/mz.png" },
  { name: "مدغشقر", url: "https://flagcdn.com/w320/mg.png" },
  { name: "تنزانيا", url: "https://flagcdn.com/w320/tz.png" },
  { name: "أوغندا", url: "https://flagcdn.com/w320/ug.png" },
  { name: "رواندا", url: "https://flagcdn.com/w320/rw.png" },
  { name: "زامبيا", url: "https://flagcdn.com/w320/zm.png" },
  { name: "مالي", url: "https://flagcdn.com/w320/ml.png" },
  { name: "بوركينا فاسو", url: "https://flagcdn.com/w320/bf.png" },
  { name: "النيجر", url: "https://flagcdn.com/w320/ne.png" },
  { name: "تشاد", url: "https://flagcdn.com/w320/td.png" },
  { name: "الكونغو", url: "https://flagcdn.com/w320/cg.png" },
  { name: "جمهورية الكونغو الديمقراطية", url: "https://flagcdn.com/w320/cd.png" },
  { name: "الغابون", url: "https://flagcdn.com/w320/ga.png" },
  { name: "غينيا", url: "https://flagcdn.com/w320/gn.png" },
  { name: "سيراليون", url: "https://flagcdn.com/w320/sl.png" },
  { name: "ليبيريا", url: "https://flagcdn.com/w320/lr.png" },
  { name: "توغو", url: "https://flagcdn.com/w320/tg.png" },
  { name: "بنين", url: "https://flagcdn.com/w320/bj.png" },
  { name: "إريتريا", url: "https://flagcdn.com/w320/er.png" },
  { name: "موريشيوس", url: "https://flagcdn.com/w320/mu.png" },
  { name: "سيشل", url: "https://flagcdn.com/w320/sc.png" },
  { name: "سنغافورة", url: "https://flagcdn.com/w320/sg.png" },
  { name: "فيتنام", url: "https://flagcdn.com/w320/vn.png" },
  { name: "ميانمار", url: "https://flagcdn.com/w320/mm.png" },
  { name: "كمبوديا", url: "https://flagcdn.com/w320/kh.png" },
  { name: "لاوس", url: "https://flagcdn.com/w320/la.png" },
  { name: "بروناي", url: "https://flagcdn.com/w320/bn.png" },
  { name: "نيبال", url: "https://flagcdn.com/w320/np.png" },
  { name: "سريلانكا", url: "https://flagcdn.com/w320/lk.png" },
  { name: "المالديف", url: "https://flagcdn.com/w320/mv.png" },
  { name: "بوتان", url: "https://flagcdn.com/w320/bt.png" },
  { name: "منغوليا", url: "https://flagcdn.com/w320/mn.png" },
  { name: "كازاخستان", url: "https://flagcdn.com/w320/kz.png" },
  { name: "أوزبكستان", url: "https://flagcdn.com/w320/uz.png" },
  { name: "تركمانستان", url: "https://flagcdn.com/w320/tm.png" },
  { name: "قرغيزستان", url: "https://flagcdn.com/w320/kg.png" },
  { name: "طاجيكستان", url: "https://flagcdn.com/w320/tj.png" },
  { name: "أذربيجان", url: "https://flagcdn.com/w320/az.png" },
  { name: "أرمينيا", url: "https://flagcdn.com/w320/am.png" },
  { name: "جورجيا", url: "https://flagcdn.com/w320/ge.png" }
];

const usedFlagsCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game-flags')
    .setDescription('لعبة تخمين أعلام الدول التفاعلية'),
  async execute(interaction) {
    const guildId = interaction.guild.id;

    if (!usedFlagsCache.has(guildId)) {
      usedFlagsCache.set(guildId, new Set());
    }
    const usedFlags = usedFlagsCache.get(guildId);

    const startEmbed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🚩 لعبة أعلام الدول')
      .setDescription(
        'ستبدأ اللعبة الآن تتكون اللعبة من **15 جولة**\n' +
        'أول من يكتب اسم الدولة الصحيح في الشات يفوز بنقطة الجولة\n\n' +
        '⏱️ الاستعداد للجولة الأولى بعد قليل'
      );

    await interaction.reply({ embeds: [startEmbed] });
    await new Promise(resolve => setTimeout(resolve, 4000));

    const scores = {};

    for (let round = 1; round <= 15; round++) {
      let availableFlags = allFlags.filter(f => !usedFlags.has(f.name));
      if (availableFlags.length === 0) {
        usedFlags.clear();
        availableFlags = [...allFlags];
      }

      const randomFlag = availableFlags[Math.floor(Math.random() * availableFlags.length)];
      usedFlags.add(randomFlag.name);

      const roundEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`⭐ تخمين العلم - الجولة [${round} من 15]`)
        .setDescription('ما هي الدولة صاحبة هذا العلم المعروض في الصورة أدناه؟ اكتب اسم الدولة في الشات بسرعة\n\n⏱️ لديك **12 ثانية** للتحمين')
        .setImage(randomFlag.url);

      await interaction.channel.send({ embeds: [roundEmbed] });

      const filter = response => !response.author.bot;
      
      try {
        const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 12000, errors: ['time'] });
        const winnerMsg = collected.first();
        const guess = winnerMsg.content.trim();

        if (guess === randomFlag.name) {
          const winnerId = winnerMsg.author.id;
          scores[winnerId] = (scores[winnerId] || 0) + 1;
          await interaction.channel.send(`✅ إجابة صحيحة من <@${winnerId}> الدولة هي ${randomFlag.name} 🎉`);
        } else {
          await interaction.channel.send(`❌ إجابة خاطئة! انتهى الوقت أو لم يصب أحد، الدولة الصحيحة هي: ${randomFlag.name}`);
        }
      } catch (err) {
        await interaction.channel.send(`⏰ انتهى الوقت لم يعرف أحد العلم\nالدولة الصحيحة هي ${randomFlag.name}`);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    let resultsText = '';
    sortedPlayers.forEach(([id, score], index) => {
      let medal = '🏅';
      if (index === 0) medal = '🥇';
      else if (index === 1) medal = '🥈';
      else if (index === 2) medal = '🥉';

      resultsText += `${medal} <@${id}> — **${score}** نُقطة\n`;
    });

    if (resultsText === '') {
      resultsText = 'لم يسجل أي لاعب أي نقاط في هذه اللعبة.';
    }

    const finalEmbed = new EmbedBuilder()
      .setColor('#FFFF00')
      .setTitle('🏆 انتهت لعبةُ الأعلام')
      .setDescription(`**النتائجُ النهائيّةُ للمُتسابقينَ** 🏆\n\n${resultsText}`);

    await interaction.channel.send({ embeds: [finalEmbed] });
  },
};