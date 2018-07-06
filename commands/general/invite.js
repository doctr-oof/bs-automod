const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");

module.exports = class InviteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "invite",
            group: "general",
            memberName: "invite",
            description: "Get an invite to this channel.",
            examples: [ "invite" ],
            throttling: { usages: 1, duration: 600 },
            guildOnly: true,
            userPermissions: [ "CREATE_INSTANT_INVITE" ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) {
        message.channel.createInvite()
            .then((invite) => {
                message.channel.send(`${invite}`)
                    .then(messageObject => {
                        message.delete();
                        messageObject.delete(60 * 1000);
                    }).catch(console.error);
            })
            .catch((reason) => {
                message.reply('Sorry bud, I failed to create that invite URL. Try again later, if the problem keeps occuring contact the server owner.');
            })
    }
}
