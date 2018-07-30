const Discord = require("discord.js");

module.exports.run = async (bot, message, arg) => {
    let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bannedUser) return message.channel.send("Couldn't find user.");
    let bannedReason = arg.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: Insufficient permissions to send.");
    if(bannedUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: That person cannot be banned");
    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Log")
    .setColor("#FF0000")
    .addField("banned User", `${bannedUser} with ID ${bannedUser.id}`)
    .addField("banned By", `${message.author} with ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bannedReason);

    let logChannel = message.guild.channels.find('name', 'logs');
    if(!logChannel) {
        message.channel.send('Sorry, could not find a `#logs` channel.');
        message.channel.send(banEmbed);
        return;
    }

    message.delete().catch(O_o=>{});
    bannedUser.send(banEmbed);
    message.guild.member(bannedUser).ban(bannedReason);
    logChannel.send(banEmbed);

    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "ban"
}