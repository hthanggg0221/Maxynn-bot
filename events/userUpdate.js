const { MessageEmbed } = require('discord.js');
const { owner, logchannel } = require('../config.json');

module.exports = {
    name: 'userUpdate',
    on: true,
    run: async(oldUser, newUser, client) => {
        const Maxynn = await client.users.fetch(owner);
        const logchannels = await client.channels.fetch(logchannel);
        const updateembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
            .setAuthor(`${newUser.tag}`, `${newUser.displayAvatarURL({ dynamic: true })}`)
            .setFooter(`ID người gửi: ${newUser.id}`)
            .setDescription(`${newUser} đã đổi tên`)
            .addFields(
                { name: 'Tên trước', value: `${oldUser.username}` },
                { name: 'Tên hiện tại', value: `${newUser.username}` },
            );
        logchannels.send(updateembed);
    }
}