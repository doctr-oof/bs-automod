const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");

module.exports = class UnmuteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            aliases: [ "unsilence" ],
            group: "admin",
            memberName: "unmute",
            description: "Unmutes the targeted member if they're already muted.",
            examples: [ "unmute @doctr_oof 10" ],
            guildOnly: true,
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
            args: [
                {
                    key: "user",
                    prompt: "Who am I unmuting?",
                    type: "user"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) { //TODO: add support for unmuting and tiered mutes for mods
        let targetMember = message.guild.members.get(user.id)
        let muteRole = message.guild.roles.get(config.mute_role_id);
        
        targetMember.removeRole(muteRole)
            .then(message.channel.send(`<@${user.id}> has been manually unmuted!`).then(replyObject => replyObject.delete(30000)))
            .catch(console.error);

        message.delete();
    }
}
