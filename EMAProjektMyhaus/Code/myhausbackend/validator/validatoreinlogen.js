const emailmuster = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordmuster = /^(?=.*\d).{4,8}$/;

module.exports = {

     emailvalidator(useremail){
        var validatorzutzustand = new Boolean("true");
        if(emailmuster.test(useremail)){
            return validatorzutzustand; 
        }
        validatorzutzustand = false;
        return validatorzutzustand;
    },
    passwordvalidator(userpassword){
        var validatorzutzustand = new Boolean("true");
        if(passwordmuster.test(userpassword)){
            return validatorzutzustand;
        }
        validatorzutzustand = false;
        return validatorzutzustand;
    }
}