const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const perms = require("../../permissions.js");

module.exports = class WhoisCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "whois",
            group: "general",
            memberName: "whois",
            description: "Finds information on supplied user.",
            examples: [ "whois @doctr_oof" ],
            throttling: { usages: 1, duration: 10 },
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who am I looking up?",
                    type: "user"
                }
            ]
        });
    }

    hasPermission(message) {
        if (typeof perms[this.name] == "undefined" || perms[this.name].length == 0) return true;
        return perms[this.name].some(id => message.member.roles.has(id)) || "You don't have permission to use this command!";
    }

    async run(message, {user, time}) {
        var newUser = message.guild.members.find("id", user.id)

        const embed = new RichEmbed()
            .setThumbnail(newUser.user.avatarURL)
            .setTitle(':mag: User Information')
            .addField('User Id', user.id, true)
            .addField('Nickname', newUser.nickname, true)
            .addField('Status', newUser.presence.status, true)
            .addField('In Voice', newUser.voiceChannel, true)
            .addField('Joined Server', new Date(newUser.joinedTimestamp).toString("yyyyMMddHHmmss"))
            .addField('Joined Discord', new Date(user.createdTimestamp).toString("yyyyMMddHHmmss"))
            .setColor(0xFF8C00)

       message.channel.send({embed})      
    }
}
