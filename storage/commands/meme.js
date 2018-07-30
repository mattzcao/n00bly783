const Discord = require("discord.js");
const database = require("../database.json");
const botConfig = require("../botConfig.json");

module.exports.run = async (bot, message, arg) => {
    let imageURL = database.memes[Math.floor(Math.random()*database.memes.length)];
    message.channel.send({embed: {
        color: 0x3498db,
        description: imageURL,
        image: {url: imageURL}
    }});
    
    console.log(module.exports.help.name + ".js run");
}

module.exports.help = {
    name: "meme"
}