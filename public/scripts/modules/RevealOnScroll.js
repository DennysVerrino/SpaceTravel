class RevealOnScroll{
	constructor(elements, thresholdPercent){
		this.itemsToReveal = elements;
		this.thresholdPercent = thresholdPercent;
		this.hideInitially();
		this.scrollThrottle = _.throttle(this.calcCaller, 200).bind(this);
		this.events();
	}
	
	events(){
		window.addEventListener("load", this.scrollThrottle);
		window.addEventListener("scroll", this.scrollThrottle);
	}
	
	calcCaller(){
		this.itemsToReveal.forEach(el => {
			if(el.isRevealed == false){
			   this.calculateIfScrolledTo(el);
			}
		});
	}
	
	calculateIfScrolledTo(el){
		if(window.scrollY + window.innerHeight > el.offsetTop){
			let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100
			if(scrollPercent < this.thresholdPercent){
				el.classList.add("reveal-item--is-visible");
				el.isRevealed = true;
			}
		}	
	}
	
	hideInitially(){
		this.itemsToReveal.forEach(el => {
			el.classList.add("reveal-item")
			el.isRevealed = false;
		});
	}
}

export default RevealOnScroll;