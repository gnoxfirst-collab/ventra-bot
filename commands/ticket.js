const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('أوامر نظام تذاكر الدعم الفني')
        
        // 1. أمر إنشاء رسالة فتح التذاكر
        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('إرسال رسالة فتح التذاكر في القناة الحالية')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator))
        
        // 2. أمر إغلاق التذكرة الحالية
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('إغلاق تذكرة الدعم الحالية')),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'setup') {
            const embed = new EmbedBuilder()
                .setTitle('🎫 نظام الدعم الفني - التذاكر')
                .setDescription('إذا كنت بحاجة إلى مساعدة أو لديك مشكلة، اضغط على الزر أدناه لفتح تذكرة جديدة وسيقوم الإداريون بمساعدتك.')
                .setColor('Blue')
                .setTimestamp();

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('open_ticket')
                    .setLabel('🎫 فتح تذكرة')
                    .setStyle(ButtonStyle.Primary)
            );

            await interaction.reply({ content: '✅ تم إرسال لوحة التذاكر بنجاح!', ephemeral: true });
            return interaction.channel.send({ embeds: [embed], components: [row] });
        } 
        
        else if (subCommand === 'close') {
            return interaction.reply('🔒 جاري إغلاق هذه التذكرة...');
        }
    },
};