const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('go-out')
        .setDescription('Go out command'),
    async execute(interaction) {
        await interaction.reply('!تم تنفيذ الأمر بنجاح');
    },
};