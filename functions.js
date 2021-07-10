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
    formatDate: function(date) {
        return new Intl.DateTimeFormat(['ban', 'id']).format(date);
    },
}