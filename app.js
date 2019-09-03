const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://stteem:EJkSazAOeX1ld18X@cluster0-bb2aw.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());





app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipes) => {
      res.status(200).json(recipes);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


/*app.use('/api/recipes', (req, res, next) => {
  const recipes = [
    {
      title: 'Afang Soup',
      ingredients: 'Afang vege, beef, fish, pepper',
      instructions: "it is so easy you don't need instructions",
      time: 49,
      difficulty: 3,
      _id: 'oeihfzeoi',
    },
    {
      title: 'Cocconut rice',
      ingredients: 'rice, cocconut, fish, pepper',
      instructions: 'This too is easy',
      time: 29,
      difficulty: 2,
      _id: 'oeihfzeomoihi',
    },
  ];
  res.status(200).json(recipes);
});*/

module.exports = app;