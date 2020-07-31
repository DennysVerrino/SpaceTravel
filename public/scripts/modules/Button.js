class Button{
	constructor(){
		this.buttons = document.querySelectorAll(".btn");
		this.events();
	}
	
	events(){
		this.buttons.forEach(el => el.addEventListener("click", () => this.buttonClicked(el)));
	}
	
	buttonClicked(el){
		el.classList.toggle("btn--clicked");
	}
}

export default Button;