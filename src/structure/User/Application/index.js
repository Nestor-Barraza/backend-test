
//Controler
const usersCtrl = {};

//Use cases [Application]
import signIn from "./SignIn/index";
import signUp from "./SignUp/index";

usersCtrl.signIn = signIn;
usersCtrl.signUp = signUp;

module.exports = usersCtrl;
