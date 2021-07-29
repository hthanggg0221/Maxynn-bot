const { MessageEmbed } = require('discord.js');
const { owner, JaLchannel, newmemberrole, welcomechannel ,sichannel, rolechannel, ruleschannel } = require('../config.json');
const { formatDate } = require('../functions');
const moment = require('moment');

module.exports =  {
    name: 'guildMemberAdd',
    on: true,
    run: async(member, client) => {
        const Maxynn = await client.users.fetch(owner);
        const autorole = member.guild.roles.cache.get(newmemberrole);
        member.roles.add(autorole);
        const joinedembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
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
        const sichannels = member.guild.channels.cache.get(sichannel);
        const rolechannels = member.guild.channels.cache.get(rolechannel);
        const ruleschannels = member.guild.channels.cache.get(ruleschannel);
        const welcomechannels = member.guild.channels.cache.get(welcomechannel);
        const welcomeembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setAuthor(`${member.guild}`, `${member.guild.iconURL({ dynamic: true })}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Chào mừng ${member} đã đến với server **${member.guild}**! Hãy đọc thêm thông tin về server tại ${sichannels}, đọc luật của server tại ${ruleschannels} và bạn nhớ vào ${rolechannels} để nhận role mà mình thích nhé!!!\nChúc bạn giao lưu vui vẻ tại **${member.guild}**`)
            .setFooter(`Made by ${Maxynn.tag}`, `${Maxynn.displayAvatarURL({ dynamic: true })}`);
        welcomechannels.send(`${member}\n${welcomeembed}`);
    }
}
