const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    let sender = message.author;
    if(arg.length === 0) {
        let userInfoEmbed = new Discord.RichEmbed()
        .setTitle("User Information")
        .setColor(sender.displayHexColor)
        .setThumbnail(sender.avatarURL)
        .addField("User Name", sender.username)
        .addField("User ID", sender.id)
        .addField("Status", sender.presence.status)
        .addField("User Joined", message.guild.joinedAt)

        message.channel.send(userInfoEmbed); 
    } else {
        let useruser = arg[0];
        let userIcon = useruser.avatarURL;
        let userInfoEmbed = new Discord.RichEmbed()
        .setTitle("User Information")
        .setColor("#7289da")
        .setThumbnail(userIcon)
        .addField("User Name", useruser.username)
        .addField("User ID", useruser.id)
        .addField("Status", useruser.presence.status)
        .addField("User Joined", useruser.joinedAt)
        return message.channel.send(userInfoEmbed);
    }
}

module.exports.help = {
    name: "userinfo"
}