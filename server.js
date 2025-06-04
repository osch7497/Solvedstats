const express = require('express');
const axios = require('axios');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/list', (req, res) => {
});

app.get('/api/user/:handle', async (req, res) => {
  try {
    const response = await axios.get(`https://solved.ac/api/v3/user/show?handle=${req.params.handle}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from solved.ac' });
  }
});

app.get('/api/:user/:tag', async (req, res) => {
  try {
    const response = await axios.get(`https://solved.ac/api/v3/search/problem?query=solved_by:${req.params.user}+tag:${req.params.tag}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from solved.ac' });
  }
});
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.redirect('/profile');
});
app.get('/profile/:id', (req, res) => {
    if (!req.params.id) {
        req.params.id = 'osch7497'; // Default user handle
    }
    res.render('profile.ejs',{UserID:req.params.id});
});
app.get('/profile', (req, res) => {
    res.redirect('/profile/osch7497'); // Default user handle
});
