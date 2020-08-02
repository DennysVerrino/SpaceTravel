class Preselection{
	constructor(){
		this.radiosButtons = document.getElementsByName("vacationSpot[details.firstAid]"); 
		this.preselect(this.radiosButtons);
	}
	
	preselect(x, y){
		console.log(x);
	}
}

export default Preselection;