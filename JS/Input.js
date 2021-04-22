const $template = document.createElement('template');
$template.innerHTML = `
    <div class="input">
        <input class="input-main" type="text">
        <div class="input-error">error</div>
    </div>
`;
export default class Input extends HTMLElement{
    constructor(){
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$main = this.querySelector(".input-main");
        this.$error = this.querySelector(".input-error");
    }
    static get observedAttributes(){
        return['placeholder','type','error'];
    }
    attributeChangedCallback(attrName, oldVlaue, newValue){
        if(attrName == "placeholder"){
            this.$main.placeholder = newValue;
        }
        else if(attrName == "type"){
            this.$main.type = newValue;
        }
        else if(attrName == "error"){
            this.$error.innerHTML = newValue;
        }
    }
    validate(condition, error) {
        let value = this.$main.value;
        if(condition(value)) {
            this.setAttribute('error', '');
            return true;
        } else {
            this.setAttribute('error', error);
            return false;
        }
    }
    get value(){
        return this.$main.value;
    }
}
window.customElements.define('input-warpper',Input);
