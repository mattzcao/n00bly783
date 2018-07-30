const botConfig = require("./storage/botConfig.json");
const prefix = botConfig.prefix;
const Discord = require('discord.js');
const bot = new Discord.Client();
const database = require("./storage/database.json");
const fs = require('fs');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyA1S8mhfh12jut8_goPrRaWxN-SzBQQfxg");

let warnings = JSON.parse(fs.readFileSync("./storage/warnings.json"));
function randomEpisode() {
    seasonNumer = Math.floor(Math.random()*11);
    episodeNumber = Math.floor(Math.random()*15);
}

bot.commands = new Discord.Collection();
fs.readdir("./storage/commands/", (err, files) => {
    if(err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if(jsFile.length <= 0) return console.log("Couldn't Find Commands.");

    jsFile.forEach((f, i) => {
        let props = require(`./storage/commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

bot.login(botConfig.token);
bot.on("ready", async () => {
    let seasonNumber = Math.floor(Math.random()*11);
    let episodeNumber = Math.floor(Math.random()*15);

    console.log(`${bot.user.username} is Online!\n`);
    bot.user.setActivity(`${botConfig.prefix}help | Spongebob S${seasonNumber}E${episodeNumber}`, {type: "LISTENING"});
    randomEpisode();
});
bot.on('message', async message => {

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let arg = messageArray.slice(1);
    let sender = message.author;


    if (!message.content.startsWith(prefix)) return;
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, arg)

    if(cmd === `${prefix}status`) message.reply('Fully Operational');
    else if(cmd === `${prefix}ping`) {
        const then = Date.now();
        message.channel.send('Pinging...').then(message => {
            message.edit(`:ping_pong: Pong! It took ${Date.now() - then}ms to send that message`);
        });
    }
    else if(cmd === `${prefix}coinflip` || cmd === `${prefix}cf`) {
        let coin = database.coinSides[Math.floor(Math.random()*2)];
        message.channel.send({embed: {
            color: 0x7289da,
            description: coin,
            image: {url: coin}
        }});
    }
    else if(cmd === `${prefix}rat`) {
        message.channel.send("Don't become a rat or Logan Paul is going to taser you");
    }
    else if(cmd === `${prefix}shrek`) {
        let shrek = database.shrekMemes[Math.floor(Math.random()*24)];
        message.channel.send({embed: {
            color: 0x3498db,
            description: shrek,
            image: {url: shrek}
        }});
    }
    else if(cmd === `${prefix}fortnite`) {
        message.channel.send(':rotating_light: :rotating_light: ALERT! ALERT! PLEASE PAY ATTENTION! :rotating_light: :rotating_light: LOOKS LIKE SOMEONE PLAYS FORTNITE AHAHA :rotating_light: :rotating_light: ALERT! ALERT! PLEASE STOP TALKING ABOUT FORTNITE IN PUBLIC THANK YOU! GOODBYE! ')
    }
    else if(cmd === `${prefix}lenny`) {
        message.delete(0);
        message.channel.send('( ͡° ͜ʖ ͡°)');
    }
    else if(cmd === `${prefix}annoy` ) {
        if(!message.member.roles.find("name", "Annoy")) {
            message.reply('Please make sure that you have the `Annoy` role to use this command');
            return;
        }
        message.channel.send(`${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n`);
    }
    else if(cmd === `${prefix}flexseal` || cmd === `${prefix}philswift`) {
        message.channel.send(database.philSwift[Math.floor(Math.random()*13)])
    }
    else if(cmd === `${prefix}shamwow` || cmd === `${prefix}vinceoffer`) {
        message.channel.send(database.vinceOffer[Math.floor(Math.random()*8)])
    }
    else if(cmd === `${prefix}anthonysullivan` || cmd === `${prefix}edgeofglory`) {
        message.channel.send(database.anthonySullivan[Math.floor(Math.random()*5)]);
    }
    else if(cmd === `${prefix}billymays` || cmd === `${prefix}oxeclean`) {
        message.channel.send(database.billyMays[Math.floor(Math.random()*53)]);
    }
    else if(cmd === `${prefix}oof`) {
        message.delete(0);
        message.channel.send(
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" +/
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" +
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" +
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n");
    }
    else if(cmd === `${prefix}test`) {
        if(message.guild.name !== "Bot testing") {
            message.channel.send("Yay it works");
        }
    }
    else if(cmd == `illegal`) {
        message.channel.send("Illegal activity detected! Calling the illegality-cop right away! @Phoenix#6124");
    }
});

//Martin's Token: MzgxNjk4MjY1Mjc3NTMwMTEy.DPVsKA.loS7DnMHMBCuXzPrqwTdoo23p5o
