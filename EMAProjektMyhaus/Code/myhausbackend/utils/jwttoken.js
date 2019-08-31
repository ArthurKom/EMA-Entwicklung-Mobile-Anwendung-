var jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = '0ueindymyxwuiw937h3j3yx32fyxdpdo8332nckwh384hnd73xnd93nx33';

module.exports = {
    generateTokenForUser: function(userDateid,konteid,Benutzername,email,vorname,nachname,Geburstsdatum,stadt,kategorie,telephone){
        return jwt.sign({
            userID: userDateid,
            userkonto: konteid,
            benutzername: Benutzername,
            email: email,
            vorname: vorname,
            nachname: nachname,
            Geburstsdatum: Geburstsdatum,
            stadt: stadt,
            kategorie: kategorie,
            telephone: telephone
        },
        JWT_SIGN_SECRET,)
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer',''): null;
    },
    getUserIdundname: function(authorization, next) {
        var UserData;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try{
                    jwt.verify(token, JWT_SIGN_SECRET,function(err, rows){
                    if(err){
                        console.log(err);
                        next();
                    }else{
                        console.log(rows);
                        UserData = rows;
                        next();
                    }
                });

            }catch(err){}
        }
        return {UserData};
    }
}