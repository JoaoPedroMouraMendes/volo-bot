const { EmbedBuilder } = require("discord.js");
const pallete = require("../../settings.json").palette;

class GuildMemberAdd {
    //* Manda boas vindas no primeiro canal de texto
    async memberJoin(member) {
        // Não aceita bots
        if (member.user.bot) return;
        // Busca o primeiro canal de texto
        const channel = member.guild.channels.cache.find(channel => channel.type === 0 &&
            channel.rawPosition === 0);
        if (channel) {
            // Avartar do usuário
            const userURL = await member.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096
            });
            // Resposta
            const notificationEmbed = new EmbedBuilder()
                .setColor(pallete.warning)
                .setDescription(`${member.user.username} acabou de chegar no ${member.guild.name}. Agora temos um total de ${member.guild.members.cache.size}!!!`)
                .setAuthor({
                    name: member.user.username,
                    iconURL: userURL,
                });
            await channel.send({ embeds: [notificationEmbed] });
        }
    }

    async botJoin(member) {
        // Não aceita usuários
        if (!member.user.bot) return;
        // Busca o primeiro canal de texto
        const channel = member.guild.channels.cache.find(channel => channel.type === 0 &&
            channel.rawPosition === 0);

        if (channel) {
            // Avartar do bot
            const userURL = await member.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096
            });
            // Resposta
            const notificationEmbed = new EmbedBuilder()
                .setColor(pallete.warning)
                .setDescription(`O bot ${member.user.username} acabou de entrar no ${member.guild.name}! O que será que ele faz?`)
                .setAuthor({
                    name: member.user.username,
                    iconURL: userURL,
                });
            await channel.send({ embeds: [notificationEmbed] });
        }
    }

    main({ client, member }) {
        this.memberJoin(member);
        this.botJoin(member);
    }
}

module.exports = new GuildMemberAdd();