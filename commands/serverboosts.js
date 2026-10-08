const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('serverboosts').setDescription('معرفة عدد بوستات السيرفر الحالية'),
  async execute(interaction) {
    const boostCount = interaction.guild.premiumSubscriptionCount || 0;
    const boostTier = interaction.guild.premiumTier;
    await interaction.reply(`🚀 مستوى البوستات: Tier ${boostTier}\n💎 عدد البوستات الحالية: **${boostCount}**`);
  }
};