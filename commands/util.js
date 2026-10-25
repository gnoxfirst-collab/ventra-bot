const { SlashCommandBuilder, EmbedBuilder, version: djsVersion } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('util')
        .setDescription('أوامر الخدمات والأدوات العامة للبوت')
        
        // 1. أمر قياس سرعة استجابة البوت (Ping)
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('معرفة سرعة استجابة البوت (Ping)'))

        // 2. أمر معلومات البوت (Bot Info)
        .addSubcommand(subcommand =>
            subcommand
                .setName('botinfo')
                .setDescription('معرفة معلومات عن البوت وحالة تشغيله'))),

    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'ping') {
            const sent = await interaction.reply({ content: '🏓 جاري قياس البنق...', fetchReply: true, ephemeral: true });
            const latency = sent.createdTimestamp - interaction.createdTimestamp;
            const apiPing = Math.round(interaction.client.ws.ping);

            const embed = new EmbedBuilder()
                .setTitle('🏓 | سرعة استجابة البوت (Pong!)')
                .setDescription(`> **سرعة الاستجابة:** \`${latency}ms\`\n> **بنق الـ API:** \`${apiPing}ms\``)
                .setColor('#5865F2')
                .setTimestamp();

            return interaction.editReply({ content: null, embeds: [embed] });
        } 
        
        else if (subCommand === 'botinfo') {
            const totalMembers = interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
            const totalGuilds = interaction.client.guilds.cache.size;

            const embed = new EmbedBuilder()
                .setTitle('🤖 | معلومات بوت Soluxy System')
                .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('بوت احترافي مصمم خصيصاً لإدارة وحماية السيرفرات بأعلى كفاءة.')
                .addFields(
                    { name: '🌐 عدد السيرفرات', value: `\`${totalGuilds} سيرفر\``, inline: true },
                    { name: '👥 إجمالي الأعضاء', value: `\`${totalMembers} عضو\``, inline: true },
                    { name: '⚡ إصدار Discord.js', value: `\`v${djsVersion}\``, inline: true }
                )
                .setColor('#2b2d31')
                .setFooter({ text: 'Soluxy Utilities', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        }
    },
};