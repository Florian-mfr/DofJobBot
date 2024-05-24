const { commands, commandKey, jobs } = require('./commands');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

const data = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === commandKey.SETJOB) {
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
    await interaction.reply('Métier enregistré !');
  }

  if (interaction.commandName === commandKey.DELETEJOB) {
    const jobIndex = data.findIndex(x => x.userId === interaction.user.id && x.job === interaction.options.getString('job'))
    if (jobIndex !== -1) {
      data.splice(jobIndex, 1)
      await interaction.reply('Métier supprimé !');
    } else {
      await interaction.reply('Aucun métier trouvé !');
    }
  }

  if (interaction.commandName === commandKey.FINDJOB) {
    const job = interaction.options.getString('job')
    const level = interaction.options.getInteger('level') || 0
    const jobs = data.filter(x => x.job === job && x.level >= level)
    if (jobs.length) {
      await interaction.reply(`Voici les artisans pour le métier ${job}: ${jobs.map(x => `\n<@${x.userId}> niveau ${x.level}`)}`);
    } else {
      await interaction.reply('Aucun artisan trouvé !');
    }
  }
});
client.login(process.env.TOKEN);
