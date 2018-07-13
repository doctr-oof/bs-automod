const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const embed = require("../../embedutil.js");

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ban",
            group: "admin",
            memberName: "ban",
            description: "Bans the targeted member from the server.",
            examples: [ "ban @doctr_oof <reason_here>" ],
            args: [
                {
                    key: "user",
                    prompt: "Who am I banning?",
                    type: "user"
                },
                {
                    key: "reason",
                    prompt: "Why am I banning them?",
                    type: "string"
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

        let log = new embed(message.author, "ban")
            .addField("Task", "Ban")
            .addField("User", `${user.username} (${user.id})`)
            .addField("Reason", reason)
            .construct();
        
            
         targetMember.send(`You were banned from **Ballistic Studios** for the following reason: ${reason}\n\n*This ban will not be reversed. Fuck off!*`)
            .then(() => {
                targetMember.ban({days: 7, reason: reason}).then(() => {
                    message.guild.channels.get(config.logging_channel).send({embed: log});
                    message.delete();
                });
            })
            .catch(console.error);
    }
}
