const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");

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
