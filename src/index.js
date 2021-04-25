const { Client, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({ ws: { intents: [Intents.ALL] } });

function chooseRandom(arr, num) {
  const res = [];

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) continue;

    res.push(arr[random]);
  }

  return res;
}

client.on("ready", () => {
  console.log(`${client.user.tag} is ready.`);
});

function searchWord(text, word) {
  var x = 0,
    y = 0;

  for (i = 0; i < text.length; i++) {
    if (text[i] == word[0]) {
      for (j = i; j < i + word.length; j++) {
        if (text[j] == word[j - i]) {
          y++;
        }
        if (y == word.length) {
          x++;
        }
      }
      y = 0;
    }
  }

  return x;
}

client.on("message", async (message) => {
  if (!message.guild || message.author.id === client.user.id) return;

  const someone = searchWord(message.content.toLocaleLowerCase(), "@someone");

  if (someone > 0) {
    message.guild.members.fetch().then((members) => {
      const pickedMembers = chooseRandom(members.array(), someone);

      message.channel.send(
        `${message.author} mentioned @someone${
          someone > 1 ? ` ${someone} times` : ""
        }:\n${pickedMembers.join(", ")}`.substr(0, 2000)
      );
    });
  }
});

client.login();
