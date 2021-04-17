const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvas = require("canvas")
require("dotenv").config();

bot.on("ready", function () {
  console.log("Pokebot est dans les places");
});

bot.on("message", (message) => {
  if (message.content === "!ping") {
    message.channel.send("Pokepong");
  }
  if (message.content === "!pokebonjour") {
    message.reply("Bonjour a toi");
    message.react("😁");
  }
  if (message.content.startsWith("!pin")) {
    message.pin();
  }
  if (message.content === "!pokehelp") {
    message.channel.send({
      embed: {
        color: 3447003,
        description: "__**Les différentes commandes**__",
        fields: [
          {
            name: "!carahelp",
            value: "Pour afficher cette aide",
          },
          {
            name: "!ping",
            value: "Pong !",
          },
          {
            name: "!pin",
            value: "Epigne le message qui commence par cette commande",
          },
        ],
      },
    });
  }
  if (message.content === "!pokemoji") {
    const pokemoji = message.guild.emojis.cache.map((e) => e);
    message.channel.send(pokemoji);
  }
  if (message.content === "!pokequizz") {
    let point = 0;
    let filter = (m) => m.author.id === message.author.id;
    message.reply("nous allons jouer au Pokéquizz");
    message.channel.send(
      "Pour ce faire, tu répondras par la lettre coresspondante à ce que tu pense être la bonne réponse"
    );
    message.channel.send("C'est parti !");
    message.channel.send({
      embed: {
        title: "Voilà la première question",
        color: 3447003,
        description: "Je m'appelle Pokébot",
        fields: [
          {
            name: "A",
            value: "Vrai",
            inline: true,
          },
          {
            name: "B",
            value: "Faux",
            inline: true,
          },
        ],
      },
    });
    message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ["time"],
      })
      .then((message) => {
        message = message.first();
        if (message.content === "A") {
          message.channel.send("Bien joué");
          point += 1;
          message.channel.send("Tu as maintenant 1 point");
          message.channel.send("Allez, on passe à la deuxième question");
          message.channel.send({
            embed: {
              title: "Voilà la deuxième question",
              color: 3447003,
              description: "Qui est mon pokémon préféré ?",
              fields: [
                {
                  name: "A",
                  value: "Pikachu",
                  inline: true,
                },
                {
                  name: "B",
                  value: "Dracofeu",
                  inline: true,
                },
              ],
            },
          });
          message.channel
            .awaitMessages(filter, { max: 1, time: 3000, errors: ["time"] })
            .then((message) => {
              message = message.first();
              if (message.content === "B") {
                point += message.channel.send(
                  `Bien joué, tu as ${point} points, félication !!`
                );
                message.channel.send("Le quizz est maintenant terminé ");
              } else {
                message.channel.send(
                  `Dommage, tu t'es trompé, tu as ${points} points`
                );
              }
            });
        }
      })
      .catch((collected) => {
        message.channel.send(
          "Dommage, tu n'as pas répondu attends. Tu peux quand même retenter le quizz en refaisant la commande !!"
        );
      });
  }
});

bot.on("guildMemberAdd", async member => {
  const canvas = Canvas.createCanvas(1024, 700)
  const ctx = canvas.getContext('2d')
  const background = await Canvas.loadImage('./welcome.png')
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d')
    let fontSize = 70;
    do {
      ctx.font = `${fontSize -= 10}px sans-serif`
    } while (ctx.measureText(text).width > canvas.width - 300)
    return ctx.font
  }
  ctx.fillText(member.displayName, 20, 685)
  ctx.beginPath()
  ctx.arc(825, 175, 125, 0, Math.PI * 2, true)
})

bot.login(process.env.BOT_TOKEN);
