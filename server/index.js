require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.use('/products', express.static(path.join(__dirname, '../client/dist/')));

app.get('*', (req, res) => {
  res.status(404).send('<h1 style="text-align:center; margin: 200px">......404 Not Found</h1>');
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Listening at http:/localhost:${PORT}`);
});

// **need to reconfigure webpack and add server script**
