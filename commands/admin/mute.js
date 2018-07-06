const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const util = require("../../utils.js");

module.exports = class MuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "mute",
            aliases: [ "silence", "shutup", "hush" ],
            group: "admin",
            memberName: "mute",
            description: "Mutes the targeted member for a set amount of minutes.",
            examples: [ "mute @doctr_oof 10" ],
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
            args: [
                {
                    key: "user",
                    prompt: "Who am I muting?",
                    type: "user"
                },
                {
                    key: "time",
                    prompt: "How long am I muting for?",
                    type: "integer",
                    validate: amount => {
                        if (amount > 0 && amount <= 60) return true;
                        return "You must provide a time between 0 and 60 minutes! Need to go higher? Try again. You should be kicking them!";
                    }
                },
                {
                    key: "reason",
                    prompt: "Why are you muting them?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user, time, reason}) {
        let targetMember = message.guild.members.get(user.id)
        let muteRole = message.guild.roles.get(config.mute_role_id);
        let log = util.embed(config.log_color, "User Muted", "")
                    .addField("User", user, true)
                    .addField("Issuer", message.author, true)
                    .addField("Length", `${time} minutes`, true)
                    .addField("Reason", reason || "No Reason Specified");

        targetMember.addRole(muteRole)
            .then(message.guild.channels.get(config.logging_channel).send({embed: log}))
            .then(message.reply(`Successfully muted ${user} for ${time} minutes!`).then(replyObject => replyObject.delete(30000)))
            .catch(console.error);

        setTimeout(() => {
            if (typeof targetMember.roles.get(config.mute_role_id) == "undefined") return;

            targetMember.removeRole(muteRole)
                .then(message.channel.send(`${user} has been unmuted after ${time} minutes!`).then(replyObject => replyObject.delete(30000)))
                .catch(console.error);
        }, time * 60 * 1000);

        message.delete();
    }
}
