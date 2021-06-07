let weatherRecords=null;
let weatherPages ;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	weatherRecords=data.records;
	renderWeather(0);
});
function renderWeather(page){
	let startIndex = page * 10 ;
	let endIndex = (page + 1) * 10 ;
	const container = document.querySelector("#weather") ;
	container.innerHTML = "" ;
	const pages = document.createElement("div") ;
	pages.className = "weatherpage" ;
	let i = 0 ; 
	
	for(let i=startIndex;i<endIndex;i++){
		const location = weatherRecords.location[i] ;
		if (weatherRecords.location[i] === undefined){
			break ;
		}else{
			const item = document.createElement("div") ;
			item.className = "weatherlocation" ;
			const town = document.createElement("div") ;
			town.className = "weathertown" ;

			town.textContent = location.parameter[0].parameterValue + " - " + location.parameter[2].parameterValue ;
			const weatherTEMP = document.createElement("div") ;
			weatherTEMP.className="weatherTEMP";
			const weatherTEMPcold = document.createElement("div") ;
			weatherTEMPcold.className = "weatherTEMPcold" ;
			const weatherTEMPcool = document.createElement("div") ;
			weatherTEMPcool.className = "weatherTEMPcool" ;
			const weatherTEMPhot = document.createElement("div") ;
			weatherTEMPhot.className = "weatherTEMPhot" ;
			if (location.weatherElement[3].elementValue < 18){
				weatherTEMPcold.textContent = location.weatherElement[3].elementName + " : " + location.weatherElement[3].elementValue + "°C";
			}else if (location.weatherElement[3].elementValue < 26){
				weatherTEMPcool.textContent = location.weatherElement[3].elementName + " : " + location.weatherElement[3].elementValue + "°C";
			}else{
				weatherTEMPhot.textContent = location.weatherElement[3].elementName + " : " + location.weatherElement[3].elementValue + "°C";
			}
			item.appendChild(town);
			item.appendChild(weatherTEMP);weatherTEMP.appendChild(weatherTEMPcold) ; weatherTEMP.appendChild(weatherTEMPcool);weatherTEMP.appendChild(weatherTEMPhot) ;
			container.appendChild(item);

		}
		
	}
	while(weatherRecords.location[i] !== undefined){
		i += 10 ;
	}
	weatherPages = (i / 10) ;
	for(let i = 0;i < weatherPages;i++){
		page = i + 1 ;
		let a = document.createElement("a") ;
		let node = document.createTextNode("[" + page + "] ") ;
		a.addEventListener("click", e => {
			renderWeather(i) ;
		})
		a.appendChild(node) ;
		pages.appendChild(a) ;
	}
	container.appendChild(pages) ;
	let all = document.querySelectorAll("div.weatherTEMP") ;
	let textcount = 0 ;
	while(textcount < 10){
		let cold = all[textcount].querySelector(".weatherTEMPcold") ;
		let cool = all[textcount].querySelector(".weatherTEMPcool") ;
		let hot = all[textcount].querySelector(".weatherTEMPhot") ;
		if (cold.textContent !== ""){
			let csscountcold = 1 ;
			setInterval(() => {
				if (csscountcold < 0.6){
					csscountcold = 1 ;
				}
				cold.style.opacity = csscountcold ;
				csscountcold -= 0.1 ;
			},300) ;
		}else if (cool.textContent !== ""){
			let csscountcool = 1 ;
			setInterval(() => {
				if (csscountcool < 0.6){
					csscountcool = 1 ;
				}
				cool.style.opacity = csscountcool ;
				csscountcool -= 0.1 ;
			},300) ;
		}else if (hot.textContent !== ""){
			let csscounthot = 1 ;
			setInterval(() => {
				if (csscounthot < 0.6){
					csscounthot = 1 ;
				}
				hot.style.opacity = csscounthot ;
				csscounthot -= 0.1 ;
			},300) ;
		}
		textcount += 1 ;
	}
}



	
