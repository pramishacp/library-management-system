require('dotenv').config();

const express = require('express');
const app = express();

const config = require('./startup/config');

app.listen(config.app.port, () => console.log(`Listening on ${config.app.env} on port ${config.app.port}...`));

