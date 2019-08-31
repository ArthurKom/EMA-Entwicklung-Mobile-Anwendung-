var express = require('express');
var mysql =require('mysql');
var app = express()

var connection = mysql.createConnection({
    // Properties
    host: 'localhost',
    database: 'myhaus',
    user: 'root',
    password: 'LionelArthur21',
});

connection.connect(function(error){
    if(error){
        console.log('Error ');
        console.log(error.message);
    }else{
        console.log('successful connection');
    }
});
module.exports = connection;