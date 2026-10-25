const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('أوامر نظام رتب الأزرار التفاعلية (Reaction Roles)')
        
        // 1. أمر إنشاء لوحة الأزرار وإرسالها
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('إنشاء وإرسال لوحة رتب التفاعل للأعضاء')
                .addStringOption(option => 
                    option.setName('title').setDescription('عنوان لوحة الرتب').setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'create') {
            const title = interaction.options.getString('title');

            const embed = new EmbedBuilder()
                .setTitle(`✨ | ${title}`)
                .setDescription('> اضغط على الأزرار أدناه للحصول على الرتب الخاصة بك فوراً ودون انتظار!')
                .setColor('#5865F2')
                .setTimestamp();

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('role_notification')
                    .setLabel('إشعارات التحديثات')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('🔔'),
                
                new ButtonBuilder()
                    .setCustomId('role_giveaway')
                    .setLabel('قسم الجوائز')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🎁'),

                new ButtonBuilder()
                    .setCustomId('role_events')
                    .setLabel('الفعاليات')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎉')
            );

            await interaction.reply({ content: '✅ **تم إنشاء لوحة رتب التفاعل بنجاح!**', ephemeral: true });
            return interaction.channel.send({ embeds: [embed], components: [row] });
        }
    }