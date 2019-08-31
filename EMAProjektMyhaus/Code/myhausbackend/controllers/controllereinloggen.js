const DB = require('../modelDB/connexionDB')
var bcrypt = require('bcrypt')
var jwtUtils = require('../utils/jwttoken')
var validator = require('../validator/validatoreinlogen')

module.exports = {
    register: async (req, res) => {

        console.log('dans la methode de ristrierung');

        const Benutzername = req.body.Benutzername
        const email = req.body.email
        const vorname = req.body.vorname
        const nachname = req.body.nachname
        const kategorie = req.body.kategorie
        
        const Password = req.body.Password
        const Geburstsdatum = req.body.Geburstsdatum
        const telephone = req.body.telephone
        const stadt = req.body.stadt
        const user_zusage = req.body.user_zusage
        var idBenutzerhalte;

        console.log('dans la methode de ristrierung');
        console.log(Geburstsdatum);

        if(validator.emailvalidator(email)==true || Benutzername!=0){
            DB.query("SELECT idBenutzer FROM benutzer WHERE Email = ? || Benutzername= ?",[email,Benutzername],function(error, row){
                if(error){
                    res.json({
                        bool: false,
                        msg: "ein fehler ist aufgetreten",
                        fehler_ursache: error.message
                    })
                }else{
                    if(row.length!==0){
                        res.json({
                            bool: false,
                            msg: "diese Email existiert schon"
                        })
                    }else{
                        bcrypt.hash(Password, 5, function(err, bcryptedPassword){
                            DB.query("INSERT INTO benutzer(Benutzername,Email,Vorname,nachname,Password,geburstsdatum,Stadt,user_zusage,kategorie,telephone) values(?,?,?,?,?,?,?,?,?,?)",[Benutzername,email,vorname,nachname,bcryptedPassword,Geburstsdatum,stadt,user_zusage,kategorie,telephone],function(err){
                                if(err){
                                    res.json({
                                        bool: false,
                                        msg: "ein fehler ist aufgetreten",
                                        fehler_ursache: err.message
                                    })
                                }
                                else{
                                    DB.query("SELECT idBenutzer FROM benutzer WHERE Benutzername = ?",[Benutzername],function(err,row,fields){
                                        if(err){
                                            res.json({
                                                bool: false,
                                                msg: "ein fehler ist aufgetreten",
                                                fehler_ursache: err.message
                                            })
                                        }
                                        else{
                                            idBenutzerhalte = row[0].idBenutzer;
                                            DB.query("INSERT INTO konto(idBenutzer) values(?)",[row[0].idBenutzer],function(err){
                                                if(err){
                                                    res.json({
                                                        bool: false,
                                                        msg: "ein fehler ist aufgetreten",
                                                        fehler_ursache: err.message
                                                    })
                                                }
                                                else{

                                                    DB.query("SELECT idkonto FROM konto WHERE idBenutzer = ?",[row[0].idBenutzer],function(err,row){
                                                        if(err){

                                                            res.json({
                                                                bool: false,
                                                                msg: "ein fehler ist aufgetreten",
                                                                fehler_ursache: err.message
                                                            })
                                                        }
                                                        else{

                                                            var token = jwtUtils.generateTokenForUser(idBenutzerhalte,row[0].idkonto,Benutzername,email,vorname,nachname,bcryptedPassword,Geburstsdatum,stadt,user_zusage,kategorie,telephone)
                                                            res.json({
                                                                bool: true,
                                                                token: token
                                                            })
                                                        }
                                                    })
                                                   
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
            })

        }

    },
    getUserProfile: function(req, res){
        //Getting auth header
        console.log('dans la methode de token');
        var headerAuth = req.headers['authorization'];
        var UserDaten = jwtUtils.getUserIdundname(headerAuth); 

        res.json({
            Date: UserDaten
        })
    },

    login: async(req, res) => {

        const Benutzernameemail = req.body.Benutzername
        const Passwordformuser = req.body.Password

        if(validator.emailvalidator(email)==true){
            

            DB.query("SELECT Passwort FROM Benutzer WHERE E-mail = ?", [Benutzernameemail] ,function(err, rows){
                if(err){
                    res.json({
                        bool: false,
                        msg: "ein fehler ist aufgetreten",
                        fehler_ursache: error.message
                    })
                }else{
                    if( rows[0].Passwort == null || rows[0].Password.length == 0 || rows[0].Password == undefined ){
                        res.json({
                            bool: false,
                            msg: "Benutzer existiert nicht"
                        })
                    }else{
                        bcrypt.compare(Passwordformuser, rows[0].Password , function(err, row){
                            if(err){
                                res.json({
                                    bool: false,
                                    msg: "ein fehler ist aufgetreten",
                                    fehler_ursache: error.message
                                })
                            }else{
                                if(row == true){

                                    DB.query("SELECT * FROM Benutzer WHERE E-mail = ?",[Benutzernameemail],function(err,row){
                                        if(err){

                                            res.json({
                                                bool: false,
                                                msg: "ein fehler ist aufgetreten",
                                                fehler_ursache: error.message
                                            })

                                        }else{

                                            const idBenutzerE = row[0].idBenutzer
                                            const BenutzernameE = row[0].Benutzername
                                            const emailE = row[0].email
                                            const vornameE = row[0].vorname
                                            const nachnameE = row[0].nachname
                                            const GeburstsdatumE = row[0].Geburstsdatum
                                            const stadtE = row[0].stadt
                                            const kategorieE = row[0].kategorie
                                            const telephoneE = row[0].telephone
                                            

                                            DB.query("SELECT idkonto FROM konto WHERE idBenutzer = ?",[row[0].idBenutzer],function(err,row){
                                                if(err){

                                                    res.json({
                                                        bool: false,
                                                        msg: "ein fehler ist aufgetreten",
                                                        fehler_ursache: error.message
                                                    })

                                                }else{

                                                    var token = jwtUtils.generateTokenForUser(idBenutzerE,row[0].idkonto,BenutzernameE,emailE,vornameE,nachnameE,GeburstsdatumE,stadtE,kategorieE,telephoneE)
                                                    res.json({
                                                        bool: true,
                                                        token: token
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })   
                    }
                }
            })
        }
    }
}