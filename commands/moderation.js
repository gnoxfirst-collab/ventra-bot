const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('أوامر حماية وإدارة السيرفر المتقدمة')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        
        // 1. أمر قفل الروم الحالية (Lock)
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('قفل الروم الحالية ومنع الأعضاء من الكتابة فيها'))

        // 2. أمر فتح الروم الحالية (Unlock)
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('فتح الروم الحالية والسماح للأعضاء بالكتابة')),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const channel = interaction.channel;

        if (subCommand === 'lock') {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });

            const embed = new EmbedBuilder()
                .setTitle('🔒 | تم قفل القناة')
                .setDescription(`> تم قفل هذه القناة بواسطة: ${interaction.user}\n> لا يمكن للأعضاء الكتابة هنا حالياً.`)
                .setColor('#ED4245')
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        } 
        
        else if (subCommand === 'unlock') {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });

            const embed = new EmbedBuilder()
                .setTitle('🔓 | تم فتح القناة')
                .setDescription(`> تم فتح هذه القناة بواسطة: ${interaction.user}\n> يمكن للأعضاء الكتابة هنا الآن.`)
                .setColor('#57F287')
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }
    },
};