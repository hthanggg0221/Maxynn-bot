const { MessageEmbed } = require('discord.js');
const { owner, logchannel } = require('../config.json');

module.exports = {
    name: 'messageDeleteBulk',
    on: true,
    run: async(messages, client)=> {
        const Maxynn = await client.users.fetch(owner);
        const logchannels = await client.channels.fetch(logchannel);
        const bulkdeleteembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
            .setAuthor(`${messages.first().guild}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`**${messages.size} tin nhắn đã được xóa ở ${messages.first().channel}.**`)
            .setFooter(`Made by ${Maxynn.tag}`);
        logchannels.send(bulkdeleteembed);
    }
}