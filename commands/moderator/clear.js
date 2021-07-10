module.exports = {
    name: 'clear',
    category: '<:DiscordEmployee:862981033354592267> Moderator',
    description: 'Xóa nhiều tin nhắn của 1 hay nhiều người cùng 1 lúc (tối đa 100 tin nhắn)',
    aliases: ["prune"],
    usage: 'clean [@tag] số tin nhắn',
    run: async(client, message, args) => {
        if (message.deletable) await message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply('bạn không có quyền **Quản lý tin nhắn**!').then(m => m.delete({ timeout: 5000 }));
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("tôi không có quyền **Quản lý tin nhắn**, hãy cấp quyền để có thể sử dụng lệnh này").then(m => m.delete({ timeout: 5000 }));
        }
        const user = message.mentions.users.first();
        const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
        if (!amount) return message.reply('vui lòng nhập số lượng tin nhắn để xoá!').then(m => m.delete({ timeout: 5000 }));
        if (amount < 1) return message.reply('vui lòng nhập số lớn hơn 1!').then(m => m.delete({ timeout: 5000 }));
        if (amount > 100) return message.reply('vui lòng nhập số nhỏ hơn 100!').then(m => m.delete({ timeout: 5000 }));
        if (!amount && !user) return message.channel.send(`Sử dụng lệnh \`${db.get(`${message.guild.id}.prefix`)}help clear\` để biết thêm thông tin.`).then(m => m.delete({ timeout: 5000 }));
        if (!user) {
            message.channel.bulkDelete(amount, true).then(delmsg => {
                message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({ timeout: 3000 }));
            });
        } else {
            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                messages = messages.filter(m => m.author.id === user.id).array().slice(0, amount);
                message.channel.bulkDelete(messages, true).then(delmsg => {
                    message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({ timeout: 3000 }));
                });
            });
        }
    }
}