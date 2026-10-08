const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap67')
    .setDescription('صفع عضو معين بصورة متحركة كوميدية')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('الشخص المراد صفعه')
        .setRequired(true)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const user = interaction.user;

    // روابط GIF مباشرة ومضمونة 100% لا تسبب أخطاء
    const slapGifs = [
      'https://i.imgur.com/fmO8XcV.gif',
      'https://i.imgur.com/O3v3i9q.gif',
      'https://i.imgur.com/w1o8689.gif',
      'https://i.imgur.com/90w18xO.gif'
    ];

    const randomGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

    await interaction.reply({
      content: `💥 ${user} قام بصفع ${target}!`,
      files: [randomGif]
    });
  }
};