const { MessageEmbed } = require('discord.js');
const { JaLchannel } = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    on: true,
    run (member, client) {
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter(r => r.id !== member.guild.id)
            .map(r => r);
        roles.join(", ") || 'none';
        const leaveembed = new MessageEmbed()
            .setAuthor('Thành viên rời khỏi server', `${member.user.displayAvatarURL({ dynamic: true })}`)
            .setColor('0xb076c9')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            
    }
}