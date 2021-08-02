const { MessageEmbed } = require('discord.js');
const { owner, logchannel } = require('../config.json');

module.exports = {
    name: 'guildMemberUpdate',
    on: true,
    run: async(oldMember, newMember, client) => {
        const Maxynn = await client.users.fetch(owner);
        const logchannels = await client.channels.fetch(logchannel);
        if (newMember.nickname) {
            const nicknameembed = new MessageEmbed()
            .setColor('0xe91e63')
            .setTimestamp()
            .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ dynamic: true })}`)
            .setFooter(`ID: ${newMessage.author.id}`)
            .setDescription(`${newMember} đã đổi biệt danh`)
            .addFields(
                { name: 'Biệt danh trước', value: `${oldMember.nickname ? oldMember.nickname : 'Không có'}` },
                { name: 'Biệt danh hiện tại', value: `${newMember.nickname ? newMember.nickname : 'Không có'}` },
            );
        logchannels.send(nicknameembed);
    }
}
