module.exports = {
    name: 'ready',
    once: true,
    run(client) {
        client.user.setPresence({
            activity: {
                name: `Prefix của bot: ${process.env.PREFIX}`,
                type: 'PLAYING',
            },
            status: 'dnd',
        });
        console.log(`${client.user.tag} đã hoạt động!`)
    }
}