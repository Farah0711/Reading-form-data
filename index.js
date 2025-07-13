 const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static('public'));

// Global variables to store form values
let noun, verb, adjective, adverb, place;

// GET "/first-word" - send form
app.get('/first-word', (req, res) => {
  res.send(`
    <form method="POST" action="/second-word">
      <label for="noun">Enter a noun:</label>
      <input type="text" name="noun" placeholder="e.g. dragon" required />
      <button type="submit">Next</button>
    </form>
  `);
});

// POST "/second-word"
app.post('/second-word', (req, res) => {
  noun = req.body.noun;
  console.log(req.body);
  res.send(`
    <form method="POST" action="/third-word">
      <label for="verb">Enter a verb:</label>
      <input type="text" name="verb" placeholder="e.g. run" required />
      <button type="submit">Next</button>
    </form>
  `);
});

// POST "/third-word"
app.post('/third-word', (req, res) => {
  verb = req.body.verb;
  res.send(`
    <form method="POST" action="/fourth-word">
      <label for="adjective">Enter an adjective:</label>
      <input type="text" name="adjective" placeholder="e.g. sparkly" required />
      <button type="submit">Next</button>
    </form>
  `);
});

// POST "/fourth-word"
app.post('/fourth-word', (req, res) => {
  adjective = req.body.adjective;
  res.send(`
    <form method="POST" action="/fifth-word">
      <label for="adverb">Enter an adverb:</label>
      <input type="text" name="adverb" placeholder="e.g. quickly" required />
      <button type="submit">Next</button>
    </form>
  `);
});

// POST "/fifth-word"
app.post('/fifth-word', (req, res) => {
  adverb = req.body.adverb;
  res.send(`
    <form method="POST" action="/done">
      <label for="place">Enter a place:</label>
      <input type="text" name="place" placeholder="e.g. forest" required />
      <button type="submit">Finish</button>
    </form>
  `);
});

// POST "/done"
app.post('/done', (req, res) => {
  place = req.body.place;
  res.redirect('/story');
});

// GET "/story"
app.get('/story', (req, res) => {
  const story = `
    <h1>Your Madlib Story</h1>
    <p>Once upon a time, a ${adjective} ${noun} decided to ${verb} ${adverb} through the ${place}.</p>
    <a href="/reset"><button>Play Again</button></a>
  `;
  res.send(story);
});

// GET "/reset"
app.get('/reset', (req, res) => {
  noun = verb = adjective = adverb = place = '';
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});