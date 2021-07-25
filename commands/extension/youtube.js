const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'youtube',
    category: '<:Extension:868660497795395624> Extension',
    aliases: ["ytb"],
    description: 'Tạo 1 Rich Presence về ứng dụng Youtube Together',
    usage: 'youtube',
    run: (client, message, args) => {
        if (!message.content.startsWith(process.env.PREFIX)) return;

        let channel = message.member.voice.channel;
        if(!channel) return message.reply('Bạn phải ở trong phòng trước khi sử dụng lệnh này!');

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send('Đáng buồn thay, tôi không thể bắt đầu Rich Presence Youtube Together')
            const ytbembed = new MessageEmbed()
                .setAuthor('Lời mời sử dụng Youtube Together')
                .setColor('0xe91e63')
                .setDescription(`Nhấn vào [link này](https://discord.com/invite/${invite.code}) để bắt đầu xem Youtube cùng nhau tại phòng ${channel}`)
            message.channel.send(ytbembed);
        })
    }
}