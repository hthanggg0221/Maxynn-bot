const { MessageEmbed } = require('discord.js');
const { owner, logchannel } = require('../config.json');

module.exports = {
    name: 'messageDelete',
    on: true,
    run: async(message, client) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        const Maxynn = await client.users.fetch(owner);
        const logchannels = await client.channels.fetch(logchannel);
        const deleteembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
            .setFooter(`ID người gửi: ${message.author.id} | ID tin nhắn: ${message.id}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true})}`)
            .setDescription(`**Tin nhắn của** ${message.author} **đã bị xóa ở** ${message.channel}\nNội dung: ${message.content}`);
        logchannels.send(deleteembed);
    }
}
