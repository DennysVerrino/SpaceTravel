class MobileMenu {
	constructor(){
		this.menuIcon = document.querySelector(".site-header__menu-mobile__icon");
		this.menuContent = document.querySelector(".site-header__menu-content");
		this.siteHeader = document.querySelector(".site-header");
		this.mobileMenuLoginIcon = document.querySelector(".site-header__menu-mobile__login-icon");
		this.events();
	}
	
	events(){
		this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
	}
	
	toggleTheMenu(){
		this.menuContent.classList.toggle("site-header__menu-content--is-visible");
		this.siteHeader.classList.toggle("site-header--is-expanded");
		this.menuIcon.classList.toggle("site-header__menu-mobile__icon--close-x");
		this.mobileMenuLoginIcon.classList.toggle("site-header__menu-mobile__login-icon--hidden");
	}
}

export default MobileMenu