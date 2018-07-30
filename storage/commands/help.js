const Discord = require("discord.js");
const botConfig = require("../botConfig.json")

module.exports.run = async (bot, message, arg) => {
    let helpEmbedHead = new Discord.RichEmbed()
    .setColor("#ffea6c")
    .addField("Help:", "Here is a list of my commands! To use my commands use the prefix: `" + botConfig.prefix + "`");

    let helpEmbedFun = new Discord.RichEmbed()
    .setColor("#ffea6c")
    .setTitle("Fun Commands:")
    .addField(`${botConfig.prefix}8ball`, "Answers your life questions that no one cares about so you turn towards a bot to find answers.")
    .addField(`${botConfig.prefix}coinflip`, "Flips a coin. What else were you expecting?")
    .addField(`${botConfig.prefix}philswift`, "**THAT'S A LOT OF DAMAGE**")
    .addField(`${botConfig.prefix}vinceoffer`, "**You're going to love my nuts**")
    .addField(`${botConfig.prefix}billymays`, "**B I L L Y  M A Y S  H E R E**")
    .addField(`${botConfig.prefix}anthonysullivan`, "*Does he even have a slogan?*");

    let helpEmbedMod = new Discord.RichEmbed()
    .setColor("#ffea6c")
    .setTitle("Moderating Commands:")
    .addField(`${botConfig.prefix}purge`, "Allows members with the `MANAGE_MESSAGES` permission to **PURGE** a certain amount of messages.")
    .addField(`${botConfig.prefix}kick`, "Allows members with the `MANAGE_MESSAGES` permission to **KICK** members. Reports will be sent to the `#logs` channel to be reviewed.")
    .addField(`${botConfig.prefix}ban`, "Allows members with the `MANAGE_MESSAGES` permission to **BAN** members. Reports will be sent to the `#logs` channel to be reviewed.");

    let helpEmbedOther = new Discord.RichEmbed()
    .setColor("#ffea6c")
    .setTitle("Other Commands:")
    .addField(`${botConfig.prefix}report`, "Allows members to **REPORT** members. Reports will be sent to the `#logs` channel to be reviewed.")
    .addField(`${botConfig.prefix}serverinfo`, "Tells you the info about the server.")
    .addField(`${botConfig.prefix}ping`, "Check the reaction time of the bot's connection.")
    .addField(`${botConfig.prefix}userinfo`, "Soon Coming!");

    message.delete().catch(O_o=>{});

    message.channel.send({embed: {
        color: 0x00FF00,
        description: `A private message has been sent to ${message.author.username}`
    }});

    message.author.send(helpEmbedHead);
    message.author.send(helpEmbedFun);
    message.author.send(helpEmbedMod);
    message.author.send(helpEmbedOther);
    
    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "help"
}