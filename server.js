const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/userRoutes');
require('dotenv').config();
const db = require('./config/db');// Importing to ensure DB is initialized

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
route(app);
// app.use('/api', route);
app.get("/abc", async (req, res, next) => {
    res.send("Hello from express.");
  });

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);
   
});
