const Discord = require("discord.js");
const Config = require("./config.json");
const Token = require("./token.json");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: false});

        bot.commands = new Discord.Collection();
        
                    fs.readdir("./commands/", (err, files) =>{
                        if(err) console.log(err);
                        let jsfile = files.filter(f => f.split(".").pop() === "js");
                        if(jsfile.length <= 0){
                            console.log("couldnt find the command!");
                            return;
                    }

                    jsfile.forEach((f, i) =>{
                        let props = require(`./commands/${f}`);
                        console.log(`${f} has loaded and is working!`);
                        bot.commands.set(props.help.name , props);
                    });
                });

bot.on("ready", async () =>{
    console.log(`${bot.user.username} Sudah online! dan siap digunakan!`);
    bot.user.setActivity("Sedang Perbaikan.....", {type: "MAINTANCE"});
})


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

        let prefix = Config.prefix;
        let msgArray = message.content.split(" ");
        let cmd = msgArray[0]
        let args = msgArray.slice(1);
        let cmdFile = bot.commands.get(cmd.slice(prefix.length));
        if(cmdFile) cmdFile.run(bot, message, args);


})

bot.login(Token.token);