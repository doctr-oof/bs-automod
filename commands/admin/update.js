const commando = require("discord.js-commando");
const config = require("../../config.json");
const { exec } = require("child_process");

module.exports = class UpdateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "update",
            group: "admin",
            memberName: "update",
            description: "Forces the bot to pull from git and update.",
            examples: [ "update" ]
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author) || "You don't have permission to use this command!";
    }

    async run(message) {
        message.guild.channels.get(config.logging_channel).send(`[${new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")}] **BOT UPDATE** - I'm updating.... hopefully this doesn't break. BRB!`);
        message.delete().then(() => {
            this.client.destroy();
            exec('C:\discord-bots\bs-automod', (err) => {
                if (err) console.error(err);
            });
        });
    }
}
