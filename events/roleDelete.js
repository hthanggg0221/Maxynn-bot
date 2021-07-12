const { MessageEmbed } = require('discord.js');
const { logchannel } = require('../config.json');

module.exports = {
    name: 'roleDelete',
    on: true,
    run (role) {
        const rdembed = new MessageEmbed()
            .setColor('0xb076c9')
            .setAuthor(`${role.guild.name}`, `${role.guild.iconURL({ dynamic: true})}`)
            .setDescription(`**Đã xóa vai trò: ${role.name}**`)
            .setFooter(`ID: ${role.id}`)
            .setTimestamp();
        const logchannels = role.guild.channels.cache.get(logchannel);
        logchannels.send(rdembed);
    }
}