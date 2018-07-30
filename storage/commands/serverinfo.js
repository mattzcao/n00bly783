const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    let serverIcon = message.guild.iconURL;
    let serverInfoEmbed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setColor("#7289da")
    .setThumbnail(serverIcon)
    .addField("Server Name", message.guild.name)
    .addField("Owner", message.guild.owner)
    .addField("Total Members", message.guild.memberCount)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.guild.joinedAt);

    return message.channel.send(serverInfoEmbed);

    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "serverinfo"
}