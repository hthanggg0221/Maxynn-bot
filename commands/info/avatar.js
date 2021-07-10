const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../functions')

module.exports = {
    name: 'avatar',
    category: '<:alertNew:780310784148373514> Info',
    aliases: ['ava', 'avt'],
    description: 'Gửi hình đại diện của người sử dụng lệnh hoặc một người dùng được chỉ định.',
    usage: 'avatar [tag/id người dùng]',
    cooldown: 10,
    guildOnly: true,
    run: async (client, message, args) => {
        const member = await getMember(message, args.join(' '));
        const avatar = member.user.displayAvatarURL({ format:'jpg', size: 1024, dynamic: true });
		const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setDescription(`Nhấn [vào đây](${avatar}) để có thể xem ảnh gốc ❤️`)
            .setImage(avatar)
            .setFooter(`Được yêu cầu bởi: ${message.author.tag}`, `${message.author.displayAvatarURL({ size: 1024, dynamic: true })}`)
            .setTimestamp()
            .setColor('0xb076c9');
		message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 });
        });
	}
}