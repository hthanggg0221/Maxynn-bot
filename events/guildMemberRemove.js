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
        roles.join(", ");
        const leaveembed = new MessageEmbed()
            .setAuthor('Thành viên rời khỏi server', `${member.user.displayAvatarURL({ dynamic: true })}`)
            .setColor('0xe91e63')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user} ${member.user.tag}`)
            .setFooter(`ID: ${member.user.id}`, `${client.user.displayAvatarURL({ dynamic: true })}`);
        if (roles.length > 0) {
            leaveembed.addField('Roles', `${roles.join(', ')}`);
        }
        const jalchannel = member.guild.channels.cache.get(JaLchannel);
        jalchannel.send(leaveembed);            
    }
}