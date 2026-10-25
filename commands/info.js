const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('عرض معلومات السيرفر أو المستخدمين أو البوت')
        
        // 1. معلومات العضو
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('عرض معلومات عضو معين')
                .addUserOption(option => option.setName('target').setDescription('العضو المراد عرض معلوماته')))
        
        // 2. معلومات السيرفر
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('عرض معلومات السيرفر الحالية'))
        
        // 3. صورة العضو
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('عرض صورة حساب عضو')
                .addUserOption(option => option.setName('target').setDescription('العضو المراد عرض صورته'))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const target = interaction.options.getUser('target') || interaction.user;

        if (subCommand === 'user') {
            const member = await interaction.guild.members.fetch(target.id).catch(() => null);
            if (!member) return interaction.reply({ content: '❌ لم يتم العثور على العضو.', ephemeral: true });
            
            const embed = new EmbedBuilder()
                .setTitle(`👤 معلومات العضو: ${target.username}`)
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '🆔 المعرف (ID):', value: target.id, inline: true },
                    { name: '📅 انضم للسيرفر:', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true }
                )
                .setColor('Blue')
                .setTimestamp();
                
            return interaction.reply({ embeds: [embed] });
        } 
        
        else if (subCommand === 'server') {
            const guild = interaction.guild;
            const owner = await guild.fetchOwner();
            
            const embed = new EmbedBuilder()
                .setTitle(`🏰 معلومات السيرفر: ${guild.name}`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: '👥 عدد الأعضاء:', value: `${guild.memberCount}`, inline: true },
                    { name: '👑 صاحب السيرفر:', value: `<@${owner.id}>`, inline: true },
                    { name: '📅 تاريخ الإنشاء:', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
                )
                .setColor('Green')
                .setTimestamp();
                
            return interaction.reply({ embeds: [embed] });
        } 
        
        else if (subCommand === 'avatar') {
            const embed = new EmbedBuilder()
                .setTitle(`🖼️ صورة ${target.username}`)
                .setImage(target.displayAvatarURL({ size: 1024, dynamic: true }))
                .setColor('Random')
                .setTimestamp();
                
            return interaction.reply({ embeds: [embed] });
        }
    },
};