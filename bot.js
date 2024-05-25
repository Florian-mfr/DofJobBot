const { commandKey, jobs } = require('./constants');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const http = require('http');
const port = process.env.PORT || 3000;
require('dotenv').config();

const data = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === commandKey.SETJOB) {
    if (!jobs.some(job => job.value === interaction.options.getString('job'))) {
      await interaction.reply('Métier inconnu !');
      return;
    }

    const job = data.find(x => x.userId === interaction.user.id && x.job === interaction.options.getString('job'))
    if (job) {
      job.level = interaction.options.getInteger('level')
    } else {
      data.push({
        userId: interaction.user.id,
        job: interaction.options.getString('job'),
        level: interaction.options.getInteger('level')
      })
    }
    await interaction.reply(`Ton métier ${interaction.options.getString('job')} niveau ${interaction.options.getInteger('level')} a été enregistré !`);
  }

  if (interaction.commandName === commandKey.DELETEJOB) {
    if (!jobs.some(job => job.value === interaction.options.getString('job'))) {
      await interaction.reply('Métier inconnu !');
      return;
    }

    const jobIndex = data.findIndex(x => x.userId === interaction.user.id && x.job === interaction.options.getString('job'))
    if (jobIndex !== -1) {
      data.splice(jobIndex, 1)
      await interaction.reply('Métier supprimé !');
    } else {
      await interaction.reply('Aucun métier trouvé !');
    }
  }

  if (interaction.commandName === commandKey.FINDJOB) {
    if (!jobs.some(job => job.value === interaction.options.getString('job'))) {
      await interaction.reply('Métier inconnu !');
      return;
    }

    const job = interaction.options.getString('job')
    const level = interaction.options.getInteger('level') || 0
    const jobs = data.filter(x => x.job === job && x.level >= level).sort((a, b) => b.level - a.level)
    if (jobs.length) {
      await interaction.reply(`Voici les artisans pour le métier ${job}: ${jobs.map(x => `\n- <@${x.userId}> niveau ${x.level}`)}`);
    } else {
      await interaction.reply('Aucun artisan trouvé !');
    }
  }

  if (interaction.commandName === commandKey.MYJOB) {
    const jobs = data.filter(x => x.userId === interaction.user.id)
    if (jobs.length) {
      await interaction.reply(`Voici tes métiers: ${jobs.map(x => `\n- ${x.job} niveau ${x.level}`)}`);
    } else {
      await interaction.reply('Aucun métier trouvé !');
    }
  }
});

client.login(process.env.TOKEN);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});