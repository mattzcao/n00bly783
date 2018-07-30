const Discord = require("discord.js");
const database = require("../database.json");

module.exports.run = async (bot, message, arg) => {
    function capArg() {
        arg = arg.join(' ');
        arg = arg.split('');
        argCap = arg[0].toUpperCase();
        arg = arg.slice(1);
        arg.unshift(argCap);
        arg = arg.join('');
    }
    if(arg.length > 0) {
        capArg();
        let eightBallEmbed = new Discord.RichEmbed()
        .setColor("#7289da")
        .addField(":question: Question", arg)
        .addField(":8ball: Answer", database.eightBallMessages[Math.floor(Math.random()*19)])
        return message.channel.send(eightBallEmbed);
        arg = false;   
    } else {
        let eightBallEmbed = new Discord.RichEmbed()
        .setColor("#7289da")
        .addField(":8ball: Answer", database.eightBallMessages[Math.floor(Math.random()*19)])
        return message.channel.send(eightBallEmbed);
        arg = false;
    }
    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "8ball"
}