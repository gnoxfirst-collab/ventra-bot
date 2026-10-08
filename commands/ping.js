const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('nuke').setDescription('إعادة إنشاء الروم لتنظيفه بالكامل')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channel = interaction.channel;
    const position = channel.position;
    const newChannel = await channel.clone();
    await channel.delete();
    await newChannel.setPosition(position);
    await newChannel.send('💥 تم تنظيف الروم وإعادة إنشائه بنجاح!');
  }
};