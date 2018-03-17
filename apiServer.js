"use strict"
require('babel-core/register')({
  "presets": ["es2015", "react", "stage-1"]
})
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var requestHandler = require('./requestHandler');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(requestHandler);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://gotyetdemo:gotyetdemo@ds117316.mlab.com:17316/gotyetdemo')

var db = mongoose.connection;
// mongoose.set('debug', true);
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
app.use(cookieParser());

// --->>> SET UP SESSIONS <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 2 * 24 * 60 * 60
  })
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
// SAVE SESSION CART API
app.post('/api/cart', function (req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  })
});
// GET SESSION CART API
app.get('/api/cart', function (req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
//--->>> END SESSION SET UP <<<----


var Books = require('./models/books.js');

//---->>> POST BOOKS <<<-----
app.post('/api/books', function (req, res) {
  var book = req.body;

  Books.create(book, function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  })
});

//----->>>> GET BOOKS <<<---------
app.get('/api/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books)
  })
});

//---->>> DELETE BOOKS <<<------
app.delete('/api/books/:_id', function (req, res) {
  var query = {
    _id: req.params._id
  };

  Books.remove(query, function (err, books) {
    if (err) {
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
});

//---->>> UPDATE BOOKS <<<------
app.put('/api/books/:_id', function (req, res) {
  var book = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  // When true returns the updated document
  var options = {
    new: true
  };

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  })

})

// --->>> GET BOOKS IMAGES API <<<------
app.get('/api/images', function (req, res) {
  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, function (err, files) {
    if (err) {
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach(function (file) {
      filesArr.push({
        name: file
      });
    });
    // SEND THE JSON RESPONSE WITH THE ARARY
    res.json(filesArr);
  })
})


// END APIs
app.get('/', function (req, res) {
  res.send('Hello Seattle\n');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});