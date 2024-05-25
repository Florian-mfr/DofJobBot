
const commandKey = {
  SETJOB: 'setjob',
  DELETEJOB: 'deletejob',
  FINDJOB: 'findjob',
  MYJOBS: 'myjobs',
  HELP: 'help'
}

const jobs = [
  { name: 'Alchimiste', value: 'alchimiste', type: 'recolte' },
  { name: 'Bijoutier', value: 'bijoutier', type: 'craft' },
  { name: 'Boucher', value: 'boucher', type: 'craft' },
  { name: 'Boulanger', value: 'boulanger', type: 'craft' },
  { name: 'Bricoleur', value: 'bricoleur', type: 'craft' },
  { name: 'Bûcheron', value: 'bucheron', type: 'recolte' },
  { name: 'Chasseur', value: 'chasseur', type: 'recolte' },
  { name: 'Cordomage', value: 'cordomage', type: 'forgemagie' },
  { name: 'Cordonnier', value: 'cordonnier', type: 'craft' },
  { name: 'Costumage', value: 'costumage', type: 'forgemagie' },
  { name: 'Façonneur', value: 'faconneur', type: 'craft' },
  { name: "Forgemage d'Epées", value: 'forgemage_depees', type: 'forgemagie' },
  { name: 'Forgemage de Dagues', value: 'forgemage_dedagues', type: 'forgemagie' },
  { name: 'Forgemage de Haches', value: 'forgemage_dehaches', type: 'forgemagie' },
  { name: 'Forgemage de Marteaux', value: 'forgemage_demarteaux', type: 'forgemagie' },
  { name: 'Forgemage de Pelles', value: 'forgemage_depelles', type: 'forgemagie' },
  { name: "Forgeur d'Epées", value: 'forgeur_depees', type: 'craft' },
  { name: 'Forgeur de Dagues', value: 'forgeur_dedagues', type: 'craft' },
  { name: 'Forgeur de Haches', value: 'forgeur_dehaches', type: 'craft' },
  { name: 'Forgeur de Marteaux', value: 'forgeur_demarteaux', type: 'craft' },
  { name: 'Forgeur de Pelles', value: 'forgeur_depelles', type: 'craft' },
  { name: 'Joaillomage', value: 'joaillomage', type: 'forgemagie' },
  { name: 'Mineur', value: 'mineur', type: 'recolte' },
  { name: 'Paysan', value: 'paysan', type: 'recolte' },
  { name: 'Poissonnier', value: 'poissonnier', type: 'craft' },
  { name: 'Pêcheur', value: 'pecheur', type: 'recolte' },
  { name: 'Sculptemage d\'Arcs', value: 'sculptemage_darcs', type: 'forgemagie' },
  { name: 'Sculptemage de Baguettes', value: 'sculptemage_debaguettes', type: 'forgemagie' },
  { name: 'Sculptemage de Bâtons', value: 'sculptemage_debatons', type: 'forgemagie' },
  { name: 'Sculpteur d\'Arcs', value: 'sculpteur_darcs', type: 'craft' },
  { name: 'Sculpteur de Baguettes', value: 'sculpteur_debaguettes', type: 'craft' },
  { name: 'Sculpteur de Bâtons', value: 'sculpteur_debatons', type: 'craft' },
  { name: 'Tailleur', value: 'tailleur', type: 'craft' },
];

module.exports = { commandKey, jobs };