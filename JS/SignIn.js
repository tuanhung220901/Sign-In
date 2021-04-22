const $template = document.createElement('template');
$template.innerHTML = `
    <div class="container">
    <form class="sign-in">
        <h2 class="title">SIGN IN</h2>
        <input-warpper class="email" placeholder = "Your email" type = "email" error = ""></input-warpper>
        <input-warpper class="password" placeholder = "Your password" type ="password" error = ""></input-warpper>
        <button class="signIn-btn">Enter</button>
        <div class="space-50"></div>
        <div class="sign-up">
            <p>not a member? <a href="./SignUp/index.html">sign up now</a></p>
        </div> 
    </form>
    </div>
`;
export default class SignIn extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$signin = this.querySelector(".sign-in");
        this.$email = this.querySelector(".email");
        this.$password = this.querySelector(".password");
    }
    connectedCallback(){
        this.$signin.onsubmit = (event) =>{
            event.preventDefault();
            let users = JSON.parse(localStorage.getItem("users"));
            console.log(users);
            let isPassed = this.$email.validate((value) => {
                return value != "";
            }, "Invalid email") &
                this.$password.validate((value) => {
                    return value != "";
                }, "Invalid password")
            // kiểm tra xem 2 cái ở trên nó đúng chưa và check xem users có giá trị khong thì mới kiểm tra khong thì không kiểm tra     
            if(isPassed && users){
                console.log(users.length);
                this.$password.validate((value) =>{
                    for(let i = 0; i < users.length; i++){
                        if(value == users[i].password && this.$email.value == users[i].email){
                                console.log("done");
                                alert("Done");
                                return true;
                        }
                    }
                    console.log("khong có");
                    return false;
                },"Incorrect email or password.");
            }
        }
    }

}
window.customElements.define("sign-in",SignIn);