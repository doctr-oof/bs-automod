const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const embed = require("../../embedutil.js");

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "kick",
            group: "admin",
            memberName: "kick",
            description: "Kicks the targeted member from the server.",
            examples: [ "kick @doctr_oof <reason_here>" ],
            args: [
                {
                    key: "user",
                    prompt: "Who am I kicking?",
                    type: "user"
                },
                {
                    key: "reason",
                    prompt: "Why am I kicking them?",
                    type: "string",
                    default: "No reason specified."
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user, reason}) {
        let targetMember = message.guild.members.get(user.id)

        let log = new embed(message.author, "kick")
            .addField("Task", "Kick")
            .addField("User", `${user.username} (${user.id})`)
            .addField("Reason", reason)
            .construct();

        targetMember.send(`You were kicked from **Ballistic Studios** for the following reason: ${reason}\n\n*Do not bother rejoining if you're going to keep breaking the rules. We will ban you next time.*`)
            .then(() => {
                targetMember.kick(reason).then(() => {
                    message.guild.channels.get(config.logging_channel).send({embed: log});
                    message.delete();
                });
            })
            .catch(console.error);
    }
}
