const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");

module.exports = class MessageAllCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "messageall",
            group: "admin",
            memberName: "messageall",
            description: "Mass-messages every channel in the discord..... why?",
            examples: [ "messageall Hello, world!" ],
            throttling: { usages: 1, duration: 60 },
            userPermissions: [ "ADMINISTRATOR" ],
            args: [
                {
                    key: "time",
                    prompt: "How long should I show the message in seconds? (0 = infinite)",
                    type: "integer"
                },
                {
                    key: "data",
                    prompt: "What's the message?",
                    type: "string"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {data, time}) {
        let ignoreIDs = [ "453767413331394571", "454123701122760705" ];

        message.guild.channels.forEach(channel => {
            let ignoreMessage = ignoreIDs.some(id => channel.parentID == id);

            if (channel.type == "text" && !ignoreMessage) {
                channel.send(`**Global Message from <@${message.author.id}>:** ${data}`).then(msg => {
                    if (time > 0) {
                        msg.delete(time * 1000);
                    }
                });
            }
        });

        message.delete();
    }
}
