const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!reportedUser) return message.channel.send("Couldn't find user.");
    let reportedReason = arg.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report Log")
    .setColor("#FFFF00")
    .addField("Reported User", `${reportedUser} with ID: ${reportedUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reportedReason);

    let logChannel = message.guild.channels.find('name', 'logs');
    if(!logChannel) {
        message.channel.send('Sorry, could not find a `#logs` channel.');
        message.channel.send(reportEmbed);
        return;
    }

    message.delete().catch(O_o=>{});
    logChannel.send(reportEmbed);

    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "report"
}