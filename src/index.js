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

client.on("message", async (message) => {
  if (!message.guild || message.author.id === client.user.id) return;

  if (message.content.includes("@someone")) {
    message.guild.members.fetch().then((members) => {
      const pickedMembers = chooseRandom(
        members.array(),
        parseInt(process.env.RANDOM_MENTION_COUNT) || 1
      );

      message.channel.send(
        `${message.author} mentioned @someone:\n${pickedMembers.join(", ")}`
      );
    });
  }
});

client.login();
