
const botConfig = require("./storage/botConfig.json");
const prefix = botConfig.prefix;    
const Discord = require('discord.js');
const bot = new Discord.Client();
const database = require("./storage/database.json");
const fs = require('fs');

function randomEpisode() {
    seasonNumber = Math.floor(Math.random()*11);
    episodeNumber = Math.floor(Math.random()*15);
} 

bot.commands = new Discord.Collection();
bot.login(botConfig.token);

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

bot.on("ready", async () => {
    let seasonNumer = Math.floor(Math.random()*11);
    let episodeNumber = Math.floor(Math.random()*15);

    console.log(`${bot.user.username} is Online!\n`);
    //bot.user.setActivity(`${botConfig.prefix}help | Spongebob S${seasonNumer}E${episodeNumber}`, {type: "LISTENING"});
    bot.user.setActivity("your conversations", {type: "LISTENING"});
    randomEpisode();
});
bot.on('message', async message => {
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let arg = messageArray.slice(1);

    /*if (cmd.includes("@") || arg.includes("@")) {
        if (message.author.id === "350816515727032321") {
            message.channel.send("No Pinging!");
        }
    }*/ 
    if (message.content) {
        if (message.channel.name=="advertising"||message.channel.name=="cockfighting"||message.channel.name=="spamming-slums"||message.channel.name=="pls-meme-dumpster"||message.channel.name=="fake-stuff"||message.channel.name=="tatsugotchi-ghetto") {
            return;
        } else {
            let spyInfo = `(${message.guild.name}: ${message.channel.name}) ${message.author.username} [${message.author.id}] - ${message.content}`
            console.log(spyInfo);
        }
    }
    /*if (message.content.toLowerCase().includes("illegal") || message.content.toLowerCase().includes("illegal")) {
        message.channel.send("<@350816515727032321>");
    }*/
    if (message.content.toLowerCase().includes("loss")) {
        message.channel.send("~~:.|:;~~");
    }
    if (message.content.toLowerCase().includes("lenny")) {
        message.channel.send(database.lennyFaces[Math.floor(Math.random()*database.lennyFaces.length)]);
    }

    
    if (!message.content.startsWith(prefix)) return;
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, arg)

    if(cmd === `${prefix}status`) {
        let date = new Date();
        let statusSeconds = date.getSeconds();
        let statusMinutes = date.getMinutes();
        let statusHour = date.getHours();
        let statusDay = date.getDate();
        let statusMonth = date.getMonth();
        let statusYear = date.getFullYear();
        message.reply(`Fully Operational. The date is ${statusDay}/${statusMonth + 1}/${statusYear} and the time is ${statusHour}:${statusMinutes}:${statusSeconds}`);
    }
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
        /*if(!message.member.roles.find("name", "Annoy")) {
            message.reply('Please make sure that you have the `Annoy` role to use this command');
            return;
        }*/
        if(!message.member.id === 233850949142183936) {return;}
        message.channel.send(`${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n${arg} ${arg} ${arg} ${arg} ${arg}\n`);
    }
    else if(cmd === `${prefix}flexseal` || cmd === `${prefix}philswift`) {
        message.channel.send(database.philSwift[Math.floor(Math.random()*database.philSwift.length)])
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
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" +
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" + 
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n" + 
        ":egg::egg::egg::egg::egg::egg::egg::egg::egg::egg:\n");
    }
    else if(cmd === `${prefix}send`) { 
        message.delete(); 
        let mention = message.mentions.users.first(); 
        let mentionMessage = message.content.slice(27);
        mention.send(mentionMessage); 
        console.log("message sent");
    }
    else if (cmd === `${prefix}banhelp`) {
        let banHelpEmbed = new Discord.RichEmbed()
        .setColor(3447003)
        .setTitle("**Command:** ", `${prefix}ban`)
        .setDescription("A command used to ban members.", "Ban report will be send to #logs")
        .addField("**Usage:**", `${prefix}ban [user] [reason]`)
        .addField("Example: ", `${prefix}ban @Noobly Get out!`)
        .addField("**Permissions:**", "User must have the `MANAGE_MESSAGES` permission. If the member being banned has the `MANAGE_MEMBERS permission they cannot be banned.`");
        return message.channel.send(banHelpEmbed);
    }
});