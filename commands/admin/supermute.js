const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");

module.exports = class SuperMuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "supermute",
            aliases: [ "smute" ],
            group: "admin",
            memberName: "supermute",
            description: "Mutes the targeted member for a set amount of minutes.",
            examples: [ "supermute @doctr_oof 10" ],
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
            args: [
                {
                    key: "user",
                    prompt: "Who am I super-muting?",
                    type: "user"
                },
                {
                    key: "time",
                    prompt: "How long am I super-muting for?",
                    type: "integer"
                },
                {
                    key: "reason",
                    prompt: "Why are you muting them?",
                    type: "string"
                } // made this 100% non-optional if someone is super muted you MUST supply a reason.
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

        targetMember.addRole(muteRole)
             .then(message.guild.channels.get(config.logging_channel).send(`[${new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")}] **USER SUPER-MUTED**- <@${user.id}> for ${time} minutes. [ISSUED BY: <@${message.author.id}>, REASON: ${reason || "No reason specified."} ]`))
            .then(message.channel.send(`Successfully super-muted <@${user.id}> for ${time} minutes!`).then(replyObject => replyObject.delete(30000)))
            .catch(console.error);

        setTimeout(() => {
            if (typeof targetMember.roles.get(config.mute_role_id) == "undefined") return;

            targetMember.removeRole(muteRole)
                .then(message.channel.send(`<@${user.id}> has been unmuted after ${time} minutes!`).then(replyObject => replyObject.delete(30000)))
                .catch(console.error);
        }, time * 60 * 1000);

        message.delete();
    }
}
