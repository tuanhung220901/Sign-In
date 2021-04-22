import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
function hello(name){
    return "Xin chào" + name;
}
// function saySomething(cb){
//     let name = "Ngoc Trinh";
//     console.log(cb(name));
// }
// saySomething(function(name){
//     return "hi " + name;
// });
let $registerForm = new RegisterForm();
console.log($registerForm.dataTrave);
