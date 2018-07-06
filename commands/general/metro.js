const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");

module.exports = class MetroCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "metro",
            group: "general",
            memberName: "metro",
            description: "Get Information about our upcoming game Operation Metro",
            examples: [ "metro" ],
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
        message.channel.send("(More Info Soon) https://www.roblox.com/games/1938317957/Operation-Metro-CLOSED-TESTING");
    }
}
