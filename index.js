const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('dotenv')

bot.on('ready', function() {
    console.log("Pokebot est dans les places")
})

bot.login(process.env.BOT_TOKEN)
