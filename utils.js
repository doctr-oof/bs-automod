const discord = require("discord.js");
const moment = require("moment-timezone");

module.exports = {
    timestamp: function() {
        return moment(new Date()).tz("America/New_York").format("ddd MMM DD YY hh:mm:ss A") + " EST";
        //return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    },

    embed: function(color, title, message) {
        return new discord.RichEmbed()
            .setTitle(title)
            .setDescription(message)
            .setColor(color)
            .setFooter(this.timestamp());
    }
}
