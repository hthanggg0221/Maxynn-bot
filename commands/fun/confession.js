const { MessageEmbed } = require('discord.js');
const { cfschannel } = require('../../config.json');
const { getMember, promptMessage } = require('../../functions');
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".mp4", ".webm", ".mov"];

module.exports = {
    name: 'confessionevent',
    category: '<:DiscordController:810683447001481226> Fun',
    aliases: ['cfs'],
    description: 'Nói một câu nào đó qua bot',
    usage: 'cfs <nội dung>',
    run: async (client, message, args) => {
        const tim = client.emojis.cache.get("810675876135829524");
        if (message.length > 1024) return message.channel.send('Confession chỉ được dưới 1024 kí tự');
        else {
            await message.react('👀');
            message.delete();
            
            const cfsChannel = client.channels.cache.get(cfschannel);
            if (!cfsChannel) return;
            const embed = new MessageEmbed()
                .setColor('0xe91e63')
                .setTimestamp()
                .setDescription(`${args.join(" ")}`)
                .setFooter(`Được gửi bởi (${message.author.id})`)
                .setTitle(`${message.guild.name} Event`);
            if (message.attachments.array().length > 0) {
                let attachment = message.attachments.array()[0];
                picExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
                });
                videoExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) cfsChannel.send(attachment);
                });
            };
            await cfsChannel.send(embed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, [tim]);
            });
        }
    }
}
