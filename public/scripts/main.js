import MobileMenu from './modules/MobileMenu.js';
import StickyHeader from './modules/StickyHeader.js';
import Button from './modules/Button.js';
import RevealOnScroll from './modules/RevealOnScroll.js';


document.addEventListener("DOMContentLoaded", function(){
  
	if(document.querySelector(".site-header").length != 0){
		let	stickyHeader = new StickyHeader();   
		let mobileMenu = new MobileMenu();	
	}
	if(document.querySelectorAll(".card").length != 0){
		new RevealOnScroll(document.querySelectorAll(".card"), 85);	
	}
	if(document.querySelectorAll(".feature-item").length != 0){
		new RevealOnScroll(document.querySelectorAll(".feature-item"), 60);
	}

	if(document.querySelectorAll(".show-section").length != 0){
		new RevealOnScroll(document.querySelectorAll(".show-section"), 60);
	}

	let button = new Button();
});
