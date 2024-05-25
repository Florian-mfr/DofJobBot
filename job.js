const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
  userId: { type: String, required: true },
  job: { type: String, required: true },
  level: { type: Number, required: true }
});

const Job = model('Job', jobSchema);

module.exports = Job;
