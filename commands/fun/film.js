const { MessageEmbed } = require('discord.js');
const { owner, filmchannel } = require('../../config.json');

module.exports = {
    name: 'film',
    category: '<:DiscordController:805279366561005608> Fun',
    aliases: [],
    description: 'Gửi Embed về phim',
    usage: 'film',
    run: async(client, message, args) => {
        const Maxynn = await client.users.fetch(owner);
        message.delete();
        const filmembed = new MessageEmbed()
            .setColor('0xb076c9')
            .setAuthor('Film 🎥')
            .addField('Thông tin film', `${args.join(" ")}`)
            .setFooter(`Xem phim cùng ${Maxynn.tag}`)
            .setTimestamp();
        const filmchannels = message.guild.channels.cache.get(filmchannel);
        filmchannels.send(filmembed);
    }
}
