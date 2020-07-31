class StickyHeader {
	constructor(){
		this.siteHeader = document.querySelector(".site-header");
		this.pageSections = document.querySelectorAll(".page-section");
		this.browserHeight = window.innerHeight;
		this.previousScrollY = window.scrollY;
		this.events();
	}
	
	events(){
		window.addEventListener("scroll", () => this.runOnScroll());
		window.addEventListener("resize", () => {
			this.browserHeight = window.innerHeight;
		}, 333);
	}
	
	runOnScroll(){
		this.determineScrollDirection()
		
		if(window.scrollY > 60){
		   this.siteHeader.classList.add("site-header--dark");
		} else {
		   this.siteHeader.classList.remove("site-header--dark");
		}
		
		this.pageSections.forEach(el => this.calcSection(el))
	}
	
	determineScrollDirection(){
		if(window.scrollY > this.previousScrollY){
			this.scrollDirection = "down";	
		} else {
			this.scrollDirection = "up";
		}
		
		this.previousScrollY = window.scrollY;
	}
	
	calcSection(el){
		if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
			let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100;
			if(scrollPercent < 25 && scrollPercent > 20 && this.scrollDirection == "down" || scrollPercent < 33 && this.scrollDirection == "up"){
				if(el.getAttribute("data-matching-link")){
					let matchingLink = el.getAttribute("data-matching-link");
					document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
					document.querySelector(matchingLink).classList.add("is-current-link");  
				}
			} 
		} 
	}
}

export default StickyHeader;