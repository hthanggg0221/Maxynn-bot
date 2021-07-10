module.exports = {
    name: 'say',
    category: '<:DiscordController:805279366561005608> Fun',
    aliases: [],
    description: 'Nói một câu nào đó qua bot',
    usage: 'say <nội dung>',
    run: (client, message, args) => {
        message.delete();
        message.channel.send(args.join(" "));
    }
}