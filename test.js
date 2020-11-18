const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

const client = new Discord.Client();


client.on("message", function(message) { 
                                         
});                                      

client.login(config.BOT_TOKEN);

client.on("message", function(message) {
  if (message.author.bot) return;
});
