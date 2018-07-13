const commando = require("discord.js-commando");
const perms = require("../../permissions.js");

module.exports = class MassRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "massrole",
            group: "admin",
            memberName: "massrole",
            description: "Don't. Fucking. Use this.",
            examples: [ "massrole <id_here>" ],
            throttling: { usages: 1, duration: 3600 },
            userPermissions: [ "ADMINISTRATOR" ],
            args: [
                {
                    key: "roleid",
                    prompt: "What role-id am I assigning to EVERY FUCKING MEMBER OF THE FUCKING SERVER?",
                    type: "string"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {roleid}) {
        message.reply("go fuck yourself. this command is disabled. learn node.js to enable it again.");
        /*let targetRole = message.guild.roles.get(roleid);
        let guildMembers = message.guild.members;
        let count = 0

        message.channel.send(`**WARNING**: MASS-ASSIGNING ROLE ID ${roleid} (${targetRole.name})!`);

        guildMembers.forEach(member => {
            if (!member.roles.find("name", targetRole.name)) {
                console.log(`ASSIGNING ROLE TO ${member.user.username}...`);
                member.addRole(targetRole)
            }
        });

        message.channel.send(`MASS-ASSIGN COMPLETE! I assigned **${targetRole.name}** to **${guildMembers.length}** people. Fuck you for doing this...`);*/
    }
}
