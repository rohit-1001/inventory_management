const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config({path: './config.env'});
const PORT = process.env.PORT;
app.use(express.json());
require('./db/conn');
app.use(require('./routes/auth'));
app.use(require('./routes/vendor'));
app.use(require('./routes/adminAuth'));
app.use(require('./routes/companyAuth'));


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})