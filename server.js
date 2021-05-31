// https://glitch.com/edit/#!/aspiring-tricky-coaster?path=server.js%3A1%3A0

// https://aspiring-tricky-coaster.glitch.me/db/

// https://qiita.com/yonedaco/items/569bcc442872a1f9a03d
// https://stackoverflow.com/a/38407214
// https://stackoverflow.com/a/46668737
// https://stackoverflow.com/a/11944984

// https://github.com/fraigo/node-express-rest-api-example/blob/master/server.js
// https://expressjs.com/en/api.html#req.query

const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});

// domainURL/test&id=42
// https://spectrum-whip-sulfur.glitch.me/test?id=42
// look result in terminal
// sqlite3 tmp.sqlite3
// select * from lorem;
app.get('/', (req, res, next) => {
  //const id = req.query.id;
  res.json({
    message: 'success',
    //data: req.query.id
    data: 42
  });
});
// https://utano.jp/entry/2017/10/mysql57-mysql-secure-installation/

// https://github.com/souvik-pl/basicCRUDops_NodeJs_sqlite






var sqlite3 = require('sqlite3').verbose();
// var express = require('express');
// var https = require('https');
// var http = require('http');

// var app = express();
var server = https.createServer(app);
// var server = http.createServer(app);
var db = new sqlite3.Database('.data/employee.db');

db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');

app.get('/db/', function(req, res) {
  res.send(
    "<h3> Hi there, You are going to perform CRUD operations.............[CREATE] Please enter 'http://localhost:3000/add/(id number)/(name)' to add new employee to the database.........................[READ] 'http://localhost:3000/view/(id number)' to view an employee.........................[UPDATE] 'http://localhost:3000/update/(id number)/(new name)' to update an employee.....................[DELETE] 'http://localhost:3000/del/(id number)' to delete an employee...............................Before closing this window, kindly enter 'http://localhost:3000/close' to close the database connection <h3>"
  );
});

// CREATE
app.get('/db/add/:id/:name', function(req, res) {
  db.serialize(() => {
    db.run(
      'INSERT INTO emp(id,name) VALUES(?,?)',
      [req.params.id, req.params.name],
      function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log('New employee has been added');
        res.send(
          'New employee has been added into the database with ID = ' +
            req.params.id +
            ' and Name = ' +
            req.params.name
        );
      }
    );
  });
});

// READ
app.get('/db/view/:id', function(req, res) {
  db.serialize(() => {
    db.each(
      'SELECT id ID, name NAME FROM emp WHERE id =?',
      [req.params.id],
      function(err, row) {
        //db.each() is only one which is funtioning while reading data from the DB
        if (err) {
          res.send('Error encountered while dislaying');
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
        console.log('Entry dislayed successfully');
      }
    );
  });
});

//UPDATE
app.get('/db/update/:id/:name', function(req, res) {
  db.serialize(() => {
    db.run(
      'UPDATE emp SET name = ? WHERE id = ?',
      [req.params.name, req.params.id],
      function(err) {
        if (err) {
          res.send('Error encountered while updating');
          return console.error(err.message);
        }
        res.send('Entry updated successfully');
        console.log('Entry updated successfully');
      }
    );
  });
});

// DELETE
app.get('/db/del/:id', function(req, res) {
  db.serialize(() => {
    db.run('DELETE FROM emp WHERE id = ?', req.params.id, function(err) {
      if (err) {
        res.send('Error encountered while deleting');
        return console.error(err.message);
      }
      res.send('Entry deleted');
      console.log('Entry deleted');
    });
  });
});

// Closing the database connection.
app.get('/db/close', function(req, res) {
  db.close(err => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});

server.listen(3000, function() {
  console.log('server is listening on port: 3000');
});
