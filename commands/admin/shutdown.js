const commando = require("discord.js-commando");
const config = require("../../config.json");
const embed = require("../../embedutil.js");

module.exports = class UpdateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "shutdown",
            group: "admin",
            memberName: "shutdown",
            description: "Forces the bot to shut down for local testing.",
            examples: [ "shutdown <reason_here>" ],
            args: [
                {
                    key: "reason",
                    prompt: "Why are you shutting down the bot?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author) || "You don't have permission to use this command!";
    }

    async run(message, {reason}) {
        console.log("Updating....");
      //  let log = util.embed(config.log_color, "Buh-bye", `${message.author} requested I shut down for testing reasons (I hope...)`);
      let log = new embed(message.author, "general")
        .addField("Task", "Shutdown")
        .addField("Reason", reason || "No reason supplied.")
        .construct()
        
        message.guild.channels.get(config.logging_channel).send({ embed: log });
        message.delete().then(() => {
            this.client.destroy();
            process.exit();
        });
    }
}
