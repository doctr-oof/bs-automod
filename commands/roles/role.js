const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");

module.exports = class RoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "role",
            aliases: [ "requestrole", "r" ],
            group: "roles",
            memberName: "role",
            description: "Requests a Creator Role.",
            examples: [ "role ui clothing" ],
            guildOnly: true,
            throttling: { usages: 1, duration: 3 },
            args: [
                {
                    key: "roles",
                    prompt: "What role(s) are you requesting?",
                    type: "string"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {roles}) {
        if (message.channel.id != config.role_channel) return;
        
        let roleStr = "";
        let roleArr = [ ];

        roles.split(" ").forEach(role => {
            let result = config.valid_roles[role.toLowerCase()];

            if (typeof result != "undefined" && !roleArr.find(item => item.name === result)) {
                roleArr.push(message.guild.roles.find("name", result));
                roleStr += `${result}, `;
            }
        });

        roleArr.push(message.guild.roles.find("name", "Creator"));
        roleStr = roleStr.substr(0, roleStr.length - 2);

        if (roleStr === "" || roleArr.length === 0) {
            message.reply("The role(s) you requested don't exist! Please double-check <#459196389793071116> for instructions on how to request roles!")
                .then(replyObject => replyObject.delete(10000));
        } else {
            roleArr.forEach(role => {
                if (message.member.roles.find("name", role.name)) {
                    roleArr.splice(roleArr.indexOf(role), 1);
                }
            });

            message.member.addRoles(roleArr).catch(console.error);

            message.reply(`I have assigned your requested role(s): **${roleStr}**. Our Moderation team may verify your request, and reserves the right to remove them if needed.`)
                .then(replyObject => replyObject.delete(30000));
        }
    }
}
