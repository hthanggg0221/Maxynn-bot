const { MessageEmbed } = require('discord.js');
const { owner } = require('../../config.json');

module.exports = {
    name: 'help',
    category: '<:alertNew:780310784148373514> Info',
    aliases: ['h'],
    description: 'Thống kê tất cả các lệnh hoặc thông tin của một lệnh cụ thể',
    usage: 'help [lệnh]',
    run: async (client, message, args) => {
        if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		if(!args[0]) {
			return getAll(client, message);
		}
    },
};

function getAll(client, message) {
	const embed = new MessageEmbed()
        .setAuthor('Danh sách lệnh', `${client.user.displayAvatarURL()}`)
		.setFooter(`Để biết thêm thông tin về một lệnh cụ thể, hãy nhấn lệnh ${prefix}help {lệnh}`)
		.setColor('0xb076c9');
	let categories;
	if(message.author.id !== owner) {
		categories = [...new Set(client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd =>cmd.category))];
	}
	else {
		categories = [...new Set(client.commands.map(cmd => cmd.category))];
	}

	for (const id of categories) {
		const category = client.commands.filter(cmd => cmd.category === id);

        embed.addField(`${id} (${category.size} lệnh)`, category.map(cmd => `\`${cmd.name}\``).join(', '));
        embed.setDescription(`Danh sách lệnh cho bot **${client.user.username}**\nPrefix của bot là: \`${prefix}\`\nBot có tổng số lệnh là: ${client.commands.size}`);
    }
	return message.channel.send(embed);
}

function getCMD(client, message, input) {
	const membed = new MessageEmbed();

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	const info = `Không tìm thấy lệnh tên là: **${input.toLowerCase()}**`;

	if (!cmd || (cmd.ownerOnly == true && message.author.id !== ownerID)) {
		return message.channel.send(membed.setColor('0xb076c9').setDescription(info));
	}
	else{
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		const hembed = new MessageEmbed()
			.setTitle(`Chi tiết về lệnh ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())}`)
			.setColor('0xb076c9')
			.setFooter('Cú pháp: <> = bắt buộc, [] = không bắt buộc')
			.setDescription([
				`**Tên lệnh:** \`${cmd.name}\``,
				`**Tên rút gọn:** \`${cmd.aliases.join(', ') ? cmd.aliases: 'Không có'}\``,
				`**Chi tiết về lệnh:** ${cmd.description}`,
				`**Thuộc danh mục:** ${capitalizeFirstLetter(cmd.category.toString().toLowerCase())}`,
				`**Cách sử dụng:** \`${prefix} ${cmd.usage}\``,
			]);
		message.channel.send(hembed);
	}
};