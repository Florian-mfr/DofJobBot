const { REST, Routes } = require('discord.js');
const { commands } = require('./commands');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands }).then(() => {
    console.log('Successfully reloaded application (/) commands.');
  });
} catch (error) {
  console.error(error);
}