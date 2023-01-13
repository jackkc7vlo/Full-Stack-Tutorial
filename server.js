if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);  // causes it use the layout that was set above
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', error=> console.error(error))
db.on('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)

app.listen(process.env.PORT || 3000);
