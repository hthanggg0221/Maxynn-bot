const { MessageEmbed } = require('discord.js');
const { owner } = require('../../config.json');

module.exports = {
    name: 'ping',
    category: '<:alertNew:780310784148373514> Info',
    description: 'Gửi ping của bot và ping của Discord API',
    aliases: [],
    usage: 'ping',
    cooldown: 10,
    run: async (client, message, args) => {
        const Maxynn = await client.users.fetch(owner);
        const msg = await message.channel.send(`<a:loading:778148997176360971> Đang chờ xử lí`);
        const pingembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTitle(`<a:docthongbaodi:779853162793926666> **| Ping**`)
            .setDescription(`Dưới đây là độ trễ của bot và độ trễ của Discord API ❤️`)
            .addField('Độ trễ của bot: ',`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)
            .addField('Độ trễ của Discord API: ',`${client.ws.ping}ms`)
            .setFooter(`Made by ${Maxynn.tag}`, `https://media.discordapp.net/attachments/700265445638406195/722705498885062696/image0.jpg?width=468&height=468`)
            .setTimestamp();
        msg.delete();
        message.channel.send(pingembed);
    }
}