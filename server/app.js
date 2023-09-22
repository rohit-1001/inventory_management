const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config({path: './config.env'});
const PORT = process.env.PORT;
app.use(express.json());
require('./db/conn');
app.use(require('./routes/auth'));


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})