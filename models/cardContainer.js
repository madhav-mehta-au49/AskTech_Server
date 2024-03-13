const mongoose = require('mongoose');

const cardContainerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }
});

const CardContainer = mongoose.model('CardContainer', cardContainerSchema);

module.exports = CardContainer;
