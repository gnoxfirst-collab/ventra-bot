const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('randomchoice').setDescription('جعل البوت يختار بين أمرين تفصل بينهما بفاصلة')
    .addStringOption(o => o.setName('options').setDescription('اكتب الخيارات مفصولة بفاصلة مثل: تفاحة,موز').setRequired(true)),
  async execute(interaction) {
    const input = interaction.options.getString('options');
    const items = input.split(',').map(item => item.trim()).filter(Boolean);
    if (items.length < 2) return interaction.reply({ content: '❌ يجب إدخال خيارين على الأقل مفصولين بفاصلة (,)', ephemeral: true });
    const chosen = items[Math.floor(Math.random() * items.length)];
    await interaction.reply(`🎯 الاختيار العشوائي هو: **${chosen}**`);
  }
};