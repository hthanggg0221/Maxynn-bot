const { MessageEmbed } = require('discord.js');
const { owner, logchannel } = require('../config.json');

module.exports = {
    name: 'messageUpdate',
    on: true,
    run: async(oldMessage, newMessage, client) => {
        const Maxynn = await client.users.fetch(owner);
        const logchannels = await client.channels.fetch(logchannel);
        const updateembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
            .setFooter(`ID người gửi: ${newMessage.author.id}`)
            .setAuthor(`${newMessage.author.tag}`, `${newMessage.author.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Tin nhắn đã được chỉnh sửa ở kênh ${newMessage.channel}`)
            .addFields(
                { name: 'Nguyên gốc', value: `${oldMessage.content}` },
                { name: 'Sau chỉnh sửa', value: `${newMessage.content}` },
            );
        logchannels.send(updateembed);
    }
}