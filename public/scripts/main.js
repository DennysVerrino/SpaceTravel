import MobileMenu from './modules/MobileMenu.js';
import StickyHeader from './modules/StickyHeader.js';
import Button from './modules/Button.js';
import RevealOnScroll from './modules/RevealOnScroll.js';


document.addEventListener("DOMContentLoaded", function(){
  
	if(document.querySelector(".site-header")){
		let	stickyHeader = new StickyHeader();   
		let mobileMenu = new MobileMenu();	
	}
	if(document.querySelectorAll(".card")){
		new RevealOnScroll(document.querySelectorAll(".card"), 85);	
	}
	if(document.querySelectorAll(".feature-item")){
		new RevealOnScroll(document.querySelectorAll(".feature-item"), 60);
	}

	if(document.querySelectorAll(".show-section")){
		new RevealOnScroll(document.querySelectorAll(".show-section"), 60);
	}

	let button = new Button();
});
