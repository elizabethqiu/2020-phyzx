//require('dotenv').config(); 
import Pageclip from 'pageclip'
const pageclipAPIKey = 'api_NB79IZZS221eWFO5EMryrNIWcF69d4k3'
const Discord = require("discord.js");
const client = new Discord.Client();
const pageclip = new Pageclip(api_NB79IZZS221eWFO5EMryrNIWcF69d4k3)
//client.login(process.env.DISCORD_BOT_TOKEN);

/*
const Pool = require('pg').Pool; // pool connects to database via databaseurl stored on heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
*/
client.on("ready", () => {
  /*
  pgsql stuff
  pool.connect((err, client, release) => { 
    if (err) { 
        return console.error( 
            'Error acquiring client', err.stack) 
    } 
    client.query('SELECT NOW()', (err, result) => { 
        release() 
        if (err) { 
            return console.error( 
                'Error executing query', err.stack) 
        } 
        console.log("Connected to Database!") 
    }); 
  });
  */
  console.log("I am ready!"); 
});

client.on("message", message => {
  
  if (message.author.bot) return;
  // The process.env.PREFIX is your bot's prefix in this case.
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  // This is the usual argument parsing we love to use.
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //2020-11-26T15:35:09.475197+00:00 app[web.1]: Error: Cannot find module 'dotenv'

  if(message.channel.type === 'dm') {    

    //The command is ask (for us +ask)
    if(command === 'ask'){

        //Set values
        // need to connect to database here!!!!
        var arrayLength = args.length;
        // If you don't have atleast 2 arguments do nothing
        if (!arrayLength >= 2) {
          message.channel.send("Not enough arguments");
          return;
        }
        var type = args[0];
        var question = "";
        // Iterate over the arguments to form the question string
        for (var i = 1; i < arrayLength; i++) {
          question += args[i] + " ";
        }
        // Store our values in a data object
        var data = {  
          userid : message.author.id,
          question : question,
          subject :  type,
        }
      
      // Attempt to find the room the user wants to send the message to
      if (type === "em") {
        // Send the message to that room
          const channel = client.channels.cache.get('766400711596048474');
          
          //save data to a form
          dat = [{user: message.author.id},{mes: question}]
          pageclip.send(dat).then((response) => {
            console.log(response.status, response.data) // => 200, [Item, Item]
          }).then(() => {
            return pageclip.fetch()
          }).then((response) => {
            console.log(response.status, response.data) 
          })

          //send message to channel
          channel.send(question);
          var emojis = ['🎉','🧲','⚛️','🛠️','👌','🙊','👏','🙌','✌','🙏','👀','🤩','😎','😄','😳','😩','🥺','😀','😏','😤','🤔','😅','🤣','😁','😋','🥰','🥵','😱','👍','💯','✅','💬'];
          
          var text = "Message sent ";
          var choose = Math.floor(Math.random() * Math.floor(emojis.length));
          //console.log("Random number: " + choose);
          message.channel.send(text + emojis[choose]);
          
        //Start the upload process
        /*
          var sql = 'INSERT INTO questions (subject, question, userid) VALUES ($1,$2,$3)'
          var values = [data.subject,data.question,data.userid]
        // upload the message into the db
          pool.query(sql,values, (err,results) => {
            if (err){
              message.channel.send("error" +err.message)
            }
            message.channel.send("Your message was sent successfully");
          });
        */
      } else{
          message.channel.send('Channel not found: possible ones include em, mech, p1');
      }
    } else {
        message.channel.send('Command not found. Use /help for more info');
    }
  } else {
      message.channel.send('I\'m sorry, thats not very anon of you');
  }
  
});
client.login(process.env.DISCORD_BOT_TOKEN);