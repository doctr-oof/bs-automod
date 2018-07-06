const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");

module.exports = class MetroCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "alphakey",
            group: "general",
            memberName: "alphakey",
            description: "Get Information about our upcoming game Operation Metro",
            examples: [ "alphakey" ],
            throttling: { usages: 1, duration: 600 },
            guildOnly: true,
            userPermissions: [ "SEND_MESSAGES" ]
        });
    }

    async run(message, {user}) {
        message.reply(`I'm glad to hear you're interested in our project. We're currently giving away alpha keys at random. We will not give you a key by asking us. Keep an eye out for giveaways in <#453768671232393217> <3`);
    }
}
