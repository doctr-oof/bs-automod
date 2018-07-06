const commando = require("discord.js-commando");
const config = require("../../config.json");
const util = require("../../utils.js");

module.exports = class UpdateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "shutdown",
            group: "admin",
            memberName: "shutdown",
            description: "Forces the bot to shut down for local testing.",
            examples: [ "shutdown" ]
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author) || "You don't have permission to use this command!";
    }

    async run(message) {
        console.log("Updating....");
        let log = util.embed(config.log_color, "Buh-bye", `${message.author} requested I shut down for testing reasons (I hope...)`);
        message.guild.channels.get(config.logging_channel).send({ embed: log });
        message.delete().then(() => {
            this.client.destroy();
            process.exit();
        });
    }
}
