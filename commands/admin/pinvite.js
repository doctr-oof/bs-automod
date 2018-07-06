const { RichEmbed } = require("discord.js");
const commando = require("discord.js-commando");
const config = require("../../config.json");
const perms = require("../../permissions.js");

module.exports = class PInviteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pinvite",
            group: "admin",
            memberName: "pinvite",
            description: "Echos back the permanent invite link for our Discord.",
            examples: [ "pinvite" ]
        });
    }

    async run(message, {user}) {
        message.channel.send("https://discord.gg/SwHCpt3")
            .then(messageObject => {
                message.delete();
                messageObject.delete(30000)
            });
    }
}
