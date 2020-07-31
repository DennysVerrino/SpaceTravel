import MobileMenu from './modules/MobileMenu.js';
import StickyHeader from './modules/StickyHeader.js';
import Button from './modules/Button.js';

if(document.querySelector(".site-header")){
	let	stickyHeader = new StickyHeader();   
	let mobileMenu = new MobileMenu();	
}

let button = new Button();
