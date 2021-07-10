const Discord = require('discord.js');

module.exports = {
    name: 'message',
    on: true,
    run: async(message, client) => {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
        if (!message.guild) return;
        if (!message.member) {
            message.member = await message.guild.fetchMember(message);
        }

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const cmd = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

        if(!cmd) return;

        if (cmd.guildOnly && message.channel.type === 'dm') {
            return message.reply('Tôi không thể thực hiện lệnh đó bên trong DM!');
        }

        if (cmd.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || authorPerms.has(cmd.permissions)) {
                return message.reply('Bạn không có quyền để sử dụng lệnh này!');
            };
        };
    
        if (cmd.args && !args.length) {
            let reply = `Bạn chưa cung cấp bất kỳ đối số nào cả, ${message.author}!`;
            if (cmd.usage) {
                reply += `\nCách sử dụng thích hợp sẽ là: \`${prefix}${cmd.name}\` hoặc \`${cmd.usage}\``;
            };
            return message.channel.send(reply);
        }

        const { cooldowns } = client;

        if (!cooldowns.has(cmd.name)) {
            cooldowns.set(cmd.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = (cmd.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Vui lòng đợi thêm ${timeLeft.toFixed(1)} giây trước khi sử dụng lại lệnh \`${cmd.name}\`.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                });
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

        try {
            cmd.run(client, message, args);
        } catch (error) {
            console.log(error);
            message.reply('đã xảy ra lỗi khi cố gắng sử dụng lệnh đó!');
        }
    }
}