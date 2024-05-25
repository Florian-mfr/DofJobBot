const { commandKey, jobs } = require('./constants');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const http = require('http');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Job = require('./job.js');
require('dotenv').config();

const data = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === commandKey.SETJOB) {
    try {
      const job = jobs.find(job => job.value === interaction.options.getString('job'))
      if (!job) {
        await interaction.reply('Métier inconnu !');
        return;
      }
      const userJob = Job.findOne({ userId: interaction.user.id, job: job.value })
      if (userJob) {
        userJob.level = interaction.options.getInteger('level')
        await userJob.save()
      } else {
        const newJob = new Job({
          userId,
          job,
          level
        })
        await newJob.save()
      }
      await interaction.reply(`Ton métier ${job.name} niveau ${interaction.options.getInteger('level')} a été enregistré !`);
    } catch (error) {
      console.error(error);
      await interaction.reply('Une erreur est survenue !');
    }
  }

  if (interaction.commandName === commandKey.DELETEJOB) {
    const job = jobs.find(job => job.value === interaction.options.getString('job'))
    if (!job) {
      await interaction.reply('Métier inconnu !');
      return;
    }
    const userJob = Job.findOne({ userId: interaction.user.id, job: job.value })
    if (userJob) {
      await userJob.delete()
      await interaction.reply('Métier supprimé !');
    } else {
      await interaction.reply('Aucun métier trouvé !');
    }
  }

  if (interaction.commandName === commandKey.FINDJOB) {
    const job = jobs.find(job => job.value === interaction.options.getString('job'))
    if (!job) {
      await interaction.reply('Métier inconnu !');
      return;
    }

    const query = { job: job.value }
    if (interaction.options.getInteger('level')) {
      query.level = { $gte: interaction.options.getInteger('level') }
    }
    const jobsData = Job.find(query)
    if (filteredData.length) {
      await interaction.reply(`Voici les artisans pour le métier ${job.name}: ${jobsData.map(x => `\n- <@${x.userId}> niveau ${x.level}`)}`);
    } else {
      await interaction.reply('Aucun artisan trouvé !');
    }
  }

  if (interaction.commandName === commandKey.MYJOBS) {
    const jobsData = Job.find({ userId: interaction.user.id })
    if (jobsData.length) {
      await interaction.reply(`Métiers de <@${interaction.user.id}>: ${jobsData.map(x => `\n- ${x.job} niveau ${x.level}`)}`);
    } else {
      await interaction.reply('Aucun métier trouvé !');
    }
  }

  if (interaction.commandName === commandKey.HELP) {
    await interaction.reply('Commandes disponibles: \n- /setjob (enregistre ou modifie un métier)\n- /deletejob (supprime un métier)\n- /findjob (trouve un métier)\n- /myjobs (affiche la liste de tout tes métiers)\n- /help');
  }
});

client.login(process.env.TOKEN);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});