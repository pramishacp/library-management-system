require('dotenv').config();

const express = require('express');
const app = express();

app.listen(process.env.DEV_APP_PORT, () => console.log(`Listening on port ${process.env.DEV_APP_PORT}...`));

