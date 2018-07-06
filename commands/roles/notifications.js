const commando = require("discord.js-commando");
const config = require("../../config.json");

module.exports = class NotifyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "notifications",
            aliases: [ "notify" ],
            group: "roles",
            memberName: "notifications",
            description: "Opt-in or out for the notification role that we ping when we post updates.",
            examples: [ "notifications on", "notify on" ],
            guildOnly: true,
            throttling: { usages: 2, duration: 30 },
            args: [
                {
                    key: "choice",
                    prompt: "Do you want notifications `on` or `off`?",
                    type: "string",
                    validate: input => {
                        if (input.toLowerCase() === "on" || input.toLowerCase() == "off") return true;
                        return "You must set your notifications to be either `on` or `off`.";
                    }
                }
            ]
        });
    }

    async run(message, {choice}) {
        if (message.channel.id != config.role_channel) return;
        
        let result = choice.toLowerCase() === "on" ? true : false;
        let role = message.guild.roles.get(config.notify_role_id);

        if (result) {
            if (typeof message.member.roles.get(config.notify_role_id) == "undefined") {
                message.member.addRole(role);
                message.reply("Your notifications have been **enabled**!").then(replyObject => replyObject.delete(10000));
            } else {
                message.reply("You already have your notifications on!").then(replyObject => replyObject.delete(5000));
            }
        } else {
            if (typeof message.member.roles.get(config.notify_role_id) != "undefined") {
                message.member.removeRole(role);
                message.reply("Your notifications have been **disabled**!").then(replyObject => replyObject.delete(10000));
            } else {
                message.reply("You already have your notifications off!").then(replyObject => replyObject.delete(5000));
            }
        }

        message.delete();
    }
}
