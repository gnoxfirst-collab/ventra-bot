const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advancedpoll')
    .setDescription('إنشاء تصويت تفاعلي مع عدة خيارات')
    .addStringOption(option => option.setName('question').setDescription('موضوع التصويت').setRequired(true))
    .addStringOption(option => option.setName('option1').setDescription('الخيار الأول').setRequired(true))
    .addStringOption(option => option.setName('option2').setDescription('الخيار الثاني').setRequired(true))
    .addStringOption(option => option.setName('option3').setDescription('الخيار الثالث').setRequired(false)),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const opt1 = interaction.options.getString('option1');
    const opt2 = interaction.options.getString('option2');
    const opt3 = interaction.options.getString('option3');

    let desc = `**${question}**\n\n1️⃣ ${opt1}\n2️⃣ ${opt2}`;
    if (opt3) desc += `\n3️⃣ ${opt3}`;

    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle('📊 تصويت جديد')
      .setDescription(desc)
      .setTimestamp()
      .setFooter({ text: `تم بواسطة: ${interaction.user.tag}` });

    const pollMsg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await pollMsg.react('1️⃣');
    await pollMsg.react('2️⃣');
    if (opt3) await pollMsg.react('3️⃣');
  },
};