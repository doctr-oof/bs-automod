const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");

module.exports = class MetroCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "alphakey",
            group: "general",
            memberName: "alphakey",
            description: "Get Information about our upcoming game Operation Metro",
            examples: [ "alphakey" ],
            throttling: { usages: 1, duration: 600 },
            guildOnly: true,
            userPermissions: [ "SEND_MESSAGES" ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) {
        message.reply(`I'm glad to hear you're interested in our project. We're currently giving away alpha keys at random. We will not give you a key by asking us. Keep and eye out for giveaways in <#453768671232393217> <3`);
    }
}
