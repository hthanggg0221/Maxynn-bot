const Discord = require('discord.js');
const fs = require('fs');
const { welcome } = require('./config.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const dotenv = require('dotenv');
dotenv.config();

const RPC = require('discord-rpc');
const rpc = new RPC.Client({
    transport: 'ipc'
})

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Chào mừng bạn đến với F Supporter",
        state: "https://discord.gg/d7v4urK",
        startTimestamp: new Date(),
        largeImageKey: "f",
        largeImageKey: "F Logo",
        smallImageKey: "heroku",
        smallImageText: "Hosted by Heroku"
    })

    console.log("Rich Embed đã hoạt động");
})

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args, client));
    } else {
        client.on(event.name, (...args) => event.run(...args, client));
    }
}

client.login(process.env.TOKEN)