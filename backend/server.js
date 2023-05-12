const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const cors = require('cors');

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'frontend/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;
