const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");

module.exports = class InviteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "invite",
            group: "general",
            memberName: "invite",
            description: "Echos back the permanent invite link for our Discord.",
            throttling: { usages: 1, duration: 30 },
            examples: [ "pinvite" ]
        });
    }

    async run(message, {user}) {
        message.reply("https://discord.gg/SwHCpt3").then(messageObject => messageObject.delete(30000));
        message.delete();
    }
}
