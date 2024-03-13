require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CardContainer = require('./models/cardContainer');
const CardsContainer = require('./models/cardsContainer');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DATABASE;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

connectToDatabase(); 


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

app.get('/cardcontainers', async (req, res) => {
  try {
    
    const cardContainers = await CardContainer.find();
    res.status(200).json(cardContainers);
  } catch (error) {
    console.error('Error fetching cardContainers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/cardcontainers', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    
    const newCardContainer = new CardContainer({ title, content, image });
    
    await newCardContainer.save();
    res.status(201).json(newCardContainer);
  } catch (error) {
    console.error('Error creating cardContainer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/cardscontainers', async (req, res) => {
  try {
    
    const cardsContainers = await CardsContainer.find();
    res.status(200).json(cardsContainers);
  } catch (error) {
    console.error('Error fetching cardsContainers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/cardscontainers', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    
    const newCardsContainer = new CardsContainer({ title, content, image });
    
    await newCardsContainer.save();
    res.status(201).json(newCardsContainer);
  } catch (error) {
    console.error('Error creating cardsContainer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});