const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const { owner } = require('../../config.json');

module.exports = {
	name: 'math',
	category: '<:Utility1:869050581333991455> Utility',
	description: 'Giúp bạn giải một phép tính toán học.',
	aliases: ['calculator', 'calc'],
    usage: 'math <giá trị 1> <phép tính> <giá trị 2>',
    run: async (client, message, args) => {
	    const Maxynn = await client.users.fetch(owner);
		if (!args[0]) return message.channel.send('Vui lòng nhập một phép tính');
		try {
            const resp = math.evaluate(args.join(' '));
            const embed = new MessageEmbed()
                .setColor(0xb076c9)
                .setTitle(`Câu hỏi của ${message.author.username}`)
                .setDescription('Bot chỉ có thể trả lời một số phép tính đơn giản, tính căn bậc hai của 1 số và đổi đơn vị thui nhaa ❤️')
                .addField(`<a:naruhodo:746988585730965515> Kết quả của phép toán trên là: ` ,`${args.join(' ')} = ${resp}`, true)
                .setFooter(`Made by ${Maxynn.tag}`, `${Maxynn.displayAvatarURL({ size: 1024, dynamic: true })}`)
                .setTimestamp();
            message.channel.send(embed)
		} catch (e) {
			return message.channel.send('Vui lòng nhập một phép tính hợp lệ');
		}
	}
}
