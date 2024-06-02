const express = require("express");
const cors = require('cors');
const flash = require('connect-flash');
const app = express();
const path = require('path');


const { bootstrapApp } = require('./app/bootstrap');

// const corsOptions = {
//   origin: 'https://your-allowed-domain.com',
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


bootstrapApp(app);

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Servidor web iniciado: http://localhost:${PORT}/`);
});