const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kickedUser) return message.channel.send("Couldn't find user.");
    let kickedReason = arg.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: Insufficient permissions to send.");
    if(kickedUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: That person cannot be kicked");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick Log")
    .setColor("#FFA500")
    .addField("Kicked User", `${kickedUser} with ID ${kickedUser.id}`)
    .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kickedReason);

    let logChannel = message.guild.channels.find('name', 'logs');
    if(!logChannel) {
        message.channel.send('Sorry, could not find a `#logs` channel.');
        message.channel.send(kickEmbed);
        return;
    }

    message.delete().catch(O_o=>{});
    kickedUser.send(kickEmbed);
    message.guild.member(kickedUser).kick(kickedReason);
    logChannel.send(kickEmbed);

    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "kick"
}