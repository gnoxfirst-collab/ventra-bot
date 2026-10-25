const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('أوامر نظام المستويات والخبرة (XP)')
        
        // 1. أمر معرفة اللفل الحالي
        .addSubcommand(subcommand =>
            subcommand
                .setName('rank')
                .setDescription('معرفة مستواك الحالي وكمية الـ XP')
                .addUserOption(option => 
                    option.setName('user').setDescription('العضو المراد فحص مستواه (اختياري)').setRequired(false)))

        // 2. أمر لوحة الصدارة (Leaderboard)
        .addSubcommand(subcommand =>
            subcommand
                .setName('top')
                .setDescription('عرض قائمة أكثر الأعضاء تفاعلاً وصدارة المستويات'))

        // 3. أمر تعديل نقاط الـ XP (للمشرفين)
        .addSubcommand(subcommand =>
            subcommand
                .setName('give')
                .setDescription('منح نقاط خبرة XP لعضو معين')
                .addUserOption(option => 
                    option.setName('user').setDescription('العضو المراد منحه النقاط').setRequired(true))
                .addIntegerOption(option => 
                    option.setName('amount').setDescription('عدد نقاط الـ XP المراد إضافتها').setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'rank') {
            const targetUser = interaction.options.getUser('user') || interaction.user;

            const embed = new EmbedBuilder()
                .setTitle('⭐ | بطاقة المستوى (Rank)')
                .setDescription(`> **العضو:** ${targetUser}\n> **المستوى (Level):** \`15\`\n> **النقاط (XP):** \`3,450 / 5,000\`\n> **الترتيب في السيرفر:** \`#3\``)
                .setColor('#9B59B6')
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        } 
        
        else if (subCommand === 'top') {
            const embed = new EmbedBuilder()
                .setTitle('🏆 | لوحة صدارة المستويات (Leaderboard)')
                .setDescription(
                    `> **1.** 🥇 <@111111111111111111> - المستوى \`42\` (12,450 XP)\n` +
                    `> **2.** 🥈 <@222222222222222222> - المستوى \`35\` (9,800 XP)\n` +
                    `> **3.** 🥉 <@333333333333333333> - المستوى \`28\` (7,120 XP)`
                )
                .setColor('#F1C40F')
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }
        
        else if (subCommand === 'give') {
            const targetUser = interaction.options.getUser('user');
            const amount = interaction.options.getInteger('amount');

            const embed = new EmbedBuilder()
                .setTitle('✨ | تعديل نقاط الخبرة')
                .setDescription(`> تم إضافـة \`${amount} XP\` بنجاح إلى العضو ${targetUser}!`)
                .setColor('#2ECC71')
                .setTimestamp();

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};