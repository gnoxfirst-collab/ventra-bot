const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('أوامر إعدادات وتخصيص السيرفر')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        
        // 1. تحديد قناة اللوج (Logs)
        .addSubcommand(subcommand =>
            subcommand
                .setName('log-channel')
                .setDescription('تحديد القناة الخاصة بسجلات السيرفر')
                .addChannelOption(option => 
                    option.setName('channel').setDescription('اختار القناة').setRequired(true)))
        
        // 2. تحديد رتبة التلقائية (AutoRole)
        .addSubcommand(subcommand =>
            subcommand
                .setName('autorole')
                .setDescription('تحديد رتبة تلقائية للأعضاء الجدد')
                .addRoleOption(option => 
                    option.setName('role').setDescription('اختار الرتبة').setRequired(true))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'log-channel') {
            const channel = interaction.options.getChannel('channel');
            return interaction.reply({ content: `✅ تم تعيين قناة السجلات بنجاح إلى: ${channel}`, ephemeral: true });
        } 
        
        else if (subCommand === 'autorole') {
            const role = interaction.options.getRole('role');
            return interaction.reply({ content: `✅ تم تعيين الرتبة التلقائية بنجاح إلى: ${role.name}`, ephemeral: true });
        }
    },
};