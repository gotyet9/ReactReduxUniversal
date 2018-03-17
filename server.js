"use strict"
require('babel-core/register')({
    "presets": ["es2015", "react", "stage-1"]
})
let express = require('express');
let app = express();
let path = require('path');
var requestHandler = require('./requestHandler');

//MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
// app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(requestHandler);

// app.get('*', function(req, res){
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//   })

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Server running on port :3000');
})