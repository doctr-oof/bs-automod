const commando = require("discord.js-commando");
const config = require("../../config.json");
const util = require("../../utils.js");
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
        console.log("Updating....");
        let log = util.embed(config.log_color, "GitHub Update Pull Requested", `${message.author} requested I shut down and pull my new code from GitHub. BRB! :)`);
        message.guild.channels.get(config.logging_channel).send({ embed: log });
        message.delete().then(() => {
            this.client.destroy();
            exec('C:\\discord-bots\\bs-automod\\run.bat', (err) => {
                if (err) console.error(err);
            });
            process.exit();
        });
    }
}
