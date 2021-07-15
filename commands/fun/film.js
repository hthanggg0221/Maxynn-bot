const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'film',
    category: '<:DiscordController:805279366561005608> Fun',
    aliases: [],
    description: 'Gửi Embed về phim',
    usage: 'film',
    run: async(client, message, args) => {
        message.delete();
        const filmembed = new MessageEmbed()
            .setColor('0xb076c9')
            .setAuthor('Film 🎥')
            .addField('Thông tin film', `${args.join(" ")}`)
            .setFooter('Made by Thắnggg')
        message.channel.send(filmembed);
    }
}