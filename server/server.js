const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./src/routes/routes');
app.use(cors());

app.use('/api/links', routes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});