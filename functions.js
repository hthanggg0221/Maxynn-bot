module.exports = {
    getMember: async function(message, toFind = '', authorReturn = true) {
        if (!toFind) return authorReturn ? message.member : null;
        toFind = toFind.toLowerCase();
        let target = await message.guild.members.fetch({ user: toFind }).catch(() => undefined);
        if (!target && message.mentions.members) target = message.mentions.members.first();
        if (!target && toFind) {
            target = await message.guild.members.fetch({ query: toFind, limit: 1 });
            target = target[0];
        }
        if (!target) target = authorReturn ? message.member : null;
        return target;
    },
    promptMessage: async function (message, author, time, validReactions) {
	    time *= 1000;
	    for (const reaction of validReactions) await message.react(reaction);
	    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
	    
	    return message
	        .awaitReactions(filter, { max: 1, time: time})
	        .then(collected => collected.first() && collected.first().emoji.name);
	},
    formatDate: function(date) {
        return new Intl.DateTimeFormat(['ban', 'id']).format(date);
    },
}
