const commando = require("discord.js-commando");
const perms = require("../../permissions.js");
const config = require("../../config.json");
const { RichEmbed } = require('discord.js');

module.exports = class PrintRolesCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "proles",
            aliases: [ "roles" ],
            group: "admin",
            memberName: "proles",
            description: "Outputs all roles [name->id].",
            examples: [ "proles" ],
            userPermissions: [ "MANAGE_ROLES", "MUTE_MEMBERS" ],
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user}) {
        let guild = message.guild;
        let roleMsg = "**ROLES**-\n";

        guild.roles.forEach((role) => {
            roleMsg += `**${role.name}** :: ${role.id} \n`
        })

        message.channel.send(roleMsg);
    }
}
