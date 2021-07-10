const { MessageEmbed } = require('discord.js');
const { JaLchannel, newmemberrole } = require('../config.json');
const { formatDate } = require('../functions');
const moment = require('moment');

module.exports =  {
    name: 'guildMemberAdd',
    on: true,
    run (member, client) {
        const autorole = member.guild.roles.cache.get(newmemberrole);
        member.roles.add(autorole);
        const joinedembed = new MessageEmbed()
            .setColor('0xb076c9')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`ID: ${member.id}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
            .setAuthor('Thành viên tham gia server', `${member.user.displayAvatarURL({ dynamic: true })}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512, format: "jpg" }))
            .setDescription(`${member.user} ${member.user.tag}`)
            .addField(`Thông tin thời gian`, [
                `**Ngày tạo:** ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${formatDate(member.user.createdAt)})`,
                `**Ngày tham gia server:** ${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${formatDate(member.user.joinedAt)})`
            ]);
        const jalchannel = member.guild.channels.cache.get(JaLchannel);
        jalchannel.send(joinedembed);
    }
}