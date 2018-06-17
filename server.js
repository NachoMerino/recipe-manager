const express = require('express');
const bodyParser = require('body-parser');
const recipe = require('./controllers/recipes.controller.js');

const app = express();
const port = process.env.PORT || 5000;

// define a simple route
app.get('/api', (req, res) => {
  res.json({ 'express': 'Welcome to Web Recipes application REST-full API.' });
});

// Retrieve all type of Recipes
app.get('/api/recipes-type', recipe.showRecipes);

// COOKING
// Retrieve all cooking Recipes
app.get('/api/Cooking', recipe.cookingCategorie);

// Load a specific categorie
app.get('/api/Cooking/:catId', recipe.cookingRecipes);

// Select one recipe
app.get('/api/Cooking-id/:id', recipe.theCookingRecipe);

// Select one recipe
app.put('/api/Cooking-id/:id', recipe.updateCookingRecipe);

// Create new cooking recipe
app.post('/api/create/Cooking', recipe.createCookingRecipes);

// PATTERN
// Retrieve all pattern Recipes
app.get('/api/Patterns', recipe.patternCategorie);

// Load a specific categorie
app.get('/api/Patterns/:catId', recipe.patternRecipes);

// Select one recipe
app.get('/api/Patterns-id/:id', recipe.thePatternRecipe);

// Select one recipe
app.put('/api/Patterns-id/:id', recipe.updatePatternRecipe);

// Create new pattern recipe
app.post('/api/create/Patterns', recipe.createPatternRecipes);

app.listen(port, () => console.log(`Listening on port ${port}`));