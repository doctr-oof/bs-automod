const discord = require("discord.js");

module.exports = {
    timestamp: function() {
        return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    },

    embed: function(color, title, message) {
        return new discord.RichEmbed()
            .setTitle(title)
            .setDescription(message)
            .setColor(color)
            .setFooter(this.timestamp());
    }
}
