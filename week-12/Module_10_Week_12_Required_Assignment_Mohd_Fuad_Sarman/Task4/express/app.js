const express = require('express');
const path = require('path');
const db = require('./db/database');
const e = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
  try {
    const pets = await db.getAllPets();
    if (!pets || pets.length === 0) {
      console.log('No pets found in the database');
    } else {
      console.log(`Found ${pets.length} pets in the database:`, pets);
    }
    res.render('index', { title: 'Pet List', pets });
  } catch (err) {
    res.status(500).send('Failed to fetch pets with error: ' + err.message);
  }
});

app.get('/pets/:id', async (req, res) => {
  const petId = req.params.id;
  try {
    const pets = await db.getPetById(petId);
    if (pets) {
      console.log(`Found pet with ID ${petId}:`, pets);
      res.render('index', { title: 'Pet Detail', pets });
    } else {
      res.status(404).send('Pet with ID ' + petId + ' not found');
    }
  } catch (err) {
    res.status(500).send('Failed to fetch pet with error: ' + err.message);
  }
});

app.get('/pets/name/:name', async (req, res) => {
  const petName = req.params.name;
  try {
    const pets = await db.getPetsByName(petName);
    if (pets && pets.length > 0) {
      console.log(`Found pet with name ${petName}:`, pets);
      res.render('index', { title: 'Pet Detail', pets });
    } else {
      res.status(404).send('Pet with name ' + petName + ' not found');
    }
  } catch (err) {
    res.status(500).send('Failed to fetch pet with error: ' + err.message);
  }
});

app.get('/pets/type/:type', async (req, res) => {
  const petType = req.params.type;
  try {
    const pets = await db.getPetsByType(petType);
    if (pets && pets.length > 0) {
      console.log(`Found ${pets.length} pets of type ${petType}:`, pets);
      res.render('index', { title: 'Pet Type', pets });
    } else {
      res.status(404).send('No pets found of type ' + petType);
    }
  } catch (err) {
    res.status(500).send('Failed to fetch pets by type with error: ' + err.message);
  }
});

app.get('/pets/age/age', async (req, res) => {
  const { minAge, maxAge } = req.query;
  try {
    const pets = await db.getPetsByAgeRange(minAge, maxAge);
    if (pets && pets.length > 0) {
      console.log(`Found ${pets.length} pets in age range ${minAge}-${maxAge}:`, pets);
      res.render('index', { title: 'Pet Age Range', pets });
    } else {
      res.status(404).send('No pets found in age range ' + minAge + '-' + maxAge);
    }
  } catch (err) {
    res.status(500).send('Failed to fetch pets by age range with error: ' + err.message);
  }
});

app.get('/pets/owner/:owner', async (req, res) => {
  const petOwner = req.params.owner;
  try {
    const pets = await db.getPetsByOwner(petOwner);
    if (pets && pets.length > 0) {
      console.log(`Found ${pets.length} pets owned by ${petOwner}: `, pets);
      res.render('index', { title: 'Pet Owner', pets });
    } else {
      console.log(`No pets found owned by ${petOwner}`);
      res.status(404).send('No pets found owned by ' + petOwner);
    }
  } catch (err) {
    res.status(500).send('Failed to fetch pets by owner with error: ' + err.message);
  }
});

app.post('/create', async (req, res) => {
  const { name, type, age, owner } = req.body;
  try {
    const pet = await db.createPet(name, type, age, owner);
    if (!pet) {
      return res.status(400).send('Failed to create pet.');
    }
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to create pet with error: ' + err.message);
  }
});

app.post('/update/:id', async (req, res) => {
  const petId = req.params.id;
  const { name, type, age, owner } = req.body;
  try {
    const updatedPet = await db.updatePet(petId, name, type, age, owner);
    if (updatedPet.changes > 0) {
      res.redirect('/');
    } else {
      res.status(404).send('Pet with ID ' + petId + ' not found or no changes made');
    }
  } catch (err) {
    res.status(500).send('Failed to update pet with error: ' + err.message);
  }
});

app.post('/delete/:id', async (req, res) => {
  const petId = req.params.id;
  try {
    const result = await db.deletePet(petId);
    if (result.changes > 0) {
      res.redirect('/');
    } else {
      res.status(404).send('Pet not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting pet');
  }
});

app.post('/clear', async (req, res) => {
  try {
    await db.clearAllPets();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error clearing pets');
  }
});

app.post('/reset', async (req, res) => {
  try {
    await db.resetPetsTable();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error resetting database');
  }
});

app.listen(port, function () {
  console.log(`Express app listening on port ${port}!`);
});