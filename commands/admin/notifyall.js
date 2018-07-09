const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");

module.exports = class NotifyAllCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "notifyall",
            group: "admin",
            memberName: "notifyall",
            description: "Mass-pings Notification Squad in the channel of your choice.",
            examples: [ "notify Hello, world!" ],
            throttling: { usages: 1, duration: 60 },
            userPermissions: [ "ADMINISTRATOR" ],
            args: [
                {
                    key: "channel",
                    prompt: "What channel am I mass-pinging in?",
                    type: "channel"
                },
                {
                    key: "data",
                    prompt: "What's the message for the notification?",
                    type: "string"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {channel, data}) {
        let role = message.guild.roles.get(config.notify_role_id);
        role.setMentionable(true).then(channel.send(`<@&${config.notify_role_id}> (from ${message.author}):\n${data}\n\n${config.notify_footnote}`));

        setTimeout(() => role.setMentionable(false), 1000);

        message.delete();
    }
}
