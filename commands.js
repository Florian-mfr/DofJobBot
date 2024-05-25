const { jobs, commandKey } = require('./constants');
const { SlashCommandBuilder } = require('@discordjs/builders');

const setCommand = new SlashCommandBuilder()
    .setName('setjob')
    .setDescription('Enregistre un métier')
    .addSubcommand(subcommand =>
        subcommand
            .setName('craft')
            .setDescription('Sélectionne un métier de craft')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'craft').map(job => ({ name: job.name, value: job.value }))
                    ))
            .addIntegerOption(option =>
              option.setName('level')
                  .setDescription('Le niveau du métier')
                  .setRequired(true)
            ))
    .addSubcommand(subcommand =>
        subcommand
            .setName('recolte')
            .setDescription('Sélectionne un métier de récolte')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'recolte').map(job => ({ name: job.name, value: job.value }))
                    ))
            .addIntegerOption(option =>
                option.setName('level')
                    .setDescription('Le niveau du métier')
                    .setRequired(true)
            ))
    .addSubcommand(subcommand =>
      subcommand
          .setName('forgemagie')
          .setDescription('Sélectionne un métier de forgemagie')
          .addStringOption(option =>
              option.setName('job')
                  .setDescription('Le type de métier')
                  .setRequired(true)
                  .addChoices(jobs.filter(job => job.type === 'forgemagie').map(job => ({ name: job.name, value: job.value }))
                  ))
          .addIntegerOption(option =>
              option.setName('level')
                  .setDescription('Le niveau du métier')
                  .setRequired(true)
          ));

const deleteCommand = new SlashCommandBuilder()
    .setName('deletejob')
    .setDescription('Supprime un métier')
    .addSubcommand(subcommand =>
        subcommand
            .setName('craft')
            .setDescription('Supprime un métier de craft')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'craft').map(job => ({ name: job.name, value: job.value }))
                    ))
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('recolte')
            .setDescription('Supprime un métier de récolte')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'recolte').map(job => ({ name: job.name, value: job.value }))
                    ))
    )
    .addSubcommand(subcommand =>
      subcommand
          .setName('forgemagie')
          .setDescription('Supprime un métier de forgemagie')
          .addStringOption(option =>
              option.setName('job')
                  .setDescription('Le type de métier')
                  .setRequired(true)
                  .addChoices(jobs.filter(job => job.type === 'forgemagie').map(job => ({ name: job.name, value: job.value }))
                  ))
  );

const findCommand = new SlashCommandBuilder()
    .setName('findjob')
    .setDescription('Trouve des artisans pour un métier')
    .addSubcommand(subcommand =>
        subcommand
            .setName('craft')
            .setDescription('Trouve des artisans de craft')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'craft').map(job => ({ name: job.name, value: job.value }))
                    ))
            .addIntegerOption(option =>
                option.setName('level')
                    .setDescription('Le niveau minimum')
                    .setRequired(false)
            ))
    .addSubcommand(subcommand =>
        subcommand
            .setName('recolte')
            .setDescription('Trouve des artisans de récolte')
            .addStringOption(option =>
                option.setName('job')
                    .setDescription('Le type de métier')
                    .setRequired(true)
                    .addChoices(jobs.filter(job => job.type === 'recolte').map(job => ({ name: job.name, value: job.value }))
                    ))
            .addIntegerOption(option =>
                option.setName('level')
                    .setDescription('Le niveau minimum')
                    .setRequired(false)
            ))
    .addSubcommand(subcommand =>
      subcommand
          .setName('forgemagie')
          .setDescription('Trouve des artisans de forgemagie')
          .addStringOption(option =>
              option.setName('job')
                  .setDescription('Le type de métier')
                  .setRequired(true)
                  .addChoices(jobs.filter(job => job.type === 'forgemagie').map(job => ({ name: job.name, value: job.value }))
                  ))
          .addIntegerOption(option =>
              option.setName('level')
                  .setDescription('Le niveau minimum')
                  .setRequired(false)
          ));

const myJobsCommand = new SlashCommandBuilder()
    .setName('myjobs')
    .setDescription('Affiche les métiers enregistrés');
          
const commands = [
  setCommand,
  deleteCommand,
  findCommand,
  myJobsCommand,
];

module.exports = {
  commandKey,
  commands,
  jobs,
}