const mongoose = require('mongoose');

const cardsContainerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }
});

const CardsContainer = mongoose.model('CardsContainer', cardsContainerSchema);

module.exports = CardsContainer;
