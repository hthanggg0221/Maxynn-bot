module.exports = {
    name: 'join',
    category: '🎵 Music',
    description: 'Lệnh dùng để gọi bot vào kênh thoại',
    aliases: [],
    usage: 'join',
    run: async(client, message, args) => {
        if (!message.member.voice.channel) {
            return message.reply('bạn phải ở trong phòng trước khi sử dụng lệnh này!');
        }
        else {
            message.member.voice.channel.join();
            message.delete();
        }
    }
}