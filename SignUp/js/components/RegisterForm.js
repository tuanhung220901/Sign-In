
const $template = document.createElement('template');
$template.innerHTML = `
<form class="register-form">
    <h2 class = "title">Creat an account</h2>
    <div class="sub-title">hi em. em đang làm gì vậy :v</div>
    <input-wrapper class="name" placeholder = "Your name" type = "text" error=""></input-wrapper>
    <input-wrapper class="email" placeholder = "Your email" type = "email" error=""></input-wrapper>
    <input-wrapper class="password" placeholder = "Your password" type = "password" error=""></input-wrapper>
    <input-wrapper class="password-cofirmation" placeholder = "Repaet password"  type = "password" error=""></input-wrapper>
    <button class="register-btn">Enter</button>
</form>
`;
export default class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$registerForm = this.querySelector(".register-form");
        this.$name = this.querySelector(".name");
        this.$email = this.querySelector(".email");
        this.$password = this.querySelector(".password");
        this.$passwordConfirmation = this.querySelector(".password-cofirmation");
    }
    connectedCallback() {
        // localStorage.clear();
        this.$registerForm.onsubmit = (event) => {
            let data = {};
            event.preventDefault();
            console.log("Register form submitted");
            let isPassed = this.$name.validate((value) => {
                return value != "";
            }, "Invalid name") &
                this.$email.validate((value) => {
                    return value != "";
                }, "Invalid email") &
                this.$password.validate((value) => {
                    return value != "";
                }, "Invalid password") & (
                    this.$passwordConfirmation.validate((value) => {
                        return value != "";
                    }, "Invalid password confirmation") &&
                    this.$passwordConfirmation.validate((value) => {
                        return value == this.$password.value;
                    }, "Password confirmation is not correct")
                )
            if(isPassed){
                 console.log("Done");
                data = {
                    name: this.$name.value,
                    email: this.$email.value,
                    password: this.$password.value
                };
                // kiểm tra xem ở local đã có data nào chưa
                // nếu có rồi thì push thêm vào mảng đó data mình vừa nhập
                // nếu chưa có thì khởi tạo cái mảng đó rồi push vào 
                // cho vào trong isPassed để tránh nó push mấy cái data null vào 
                let isCheck = localStorage.getItem('users');
                if(isCheck){
                        let users = JSON.parse(localStorage.getItem('users'));
                        users.push(data);
                        localStorage.setItem('users',JSON.stringify(users));
                }
                else{
                    let users = [];
                    users.push(data);
                    localStorage.setItem('users',JSON.stringify(users));
                }
            }    
        };   
    } 
}
window.customElements.define("register-form", RegisterForm);