
const DB = require('../modelDB/connexionDB')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res, next) => {

        const{Benutzername,email,vorname,nachname,Password,Geburstsdatum,stadt} = req.value.body

        

        DB.query("SELECT * FROM nodesql", function(error, rows, fields){
            if(error){
                console.log('Error in the query');
                console.log(error.message)
            }else{
                console.log('successful connection query');
                console.log(rows);
            }
        });
    },
    login: async (req, res, next) => {

        
        console.log(req.body.password)

        if(req.body.password==null){
            res.json({
                error: 'missing parameters'
            })
        }else{
            bcrypt.hash(req.body.password, 5, function(err, bcryptedPassord){
                DB.query("INSERT INTO nodesql(name) values(?)",[bcryptedPassord],function(err, rows){
                   if(err){
                       console.log(err)
                   }
                })
                console.log(bcryptedPassord);
            })
        }
    }
}