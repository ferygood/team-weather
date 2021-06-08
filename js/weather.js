let weatherRecords=null;
let weatherPages ;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="+CWB_API_KEY).then((response)=>{
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
			location.weatherElement[0].time[0]

			town.textContent = location.locationName
			const time = document.createElement("div") ;
			time.className = "weatherTime" ;
			time.textContent = location.weatherElement[2].time[0].startTime + " ~ " + location.weatherElement[2].time[0].endTime ; 
			
			const weatherTEMPDES = document.createElement("div") ;
			weatherTEMPDES.className = "weatherTEMPDES" ;
			const br = document.createElement("br") ;
			const node = document.createTextNode(location.weatherElement[0].time[0].parameter.parameterName) ;
			const node2 = document.createTextNode(location.weatherElement[3].time[0].parameter.parameterName) ;
			weatherTEMPDES.appendChild(node) ; weatherTEMPDES.appendChild(br) ; weatherTEMPDES.appendChild(node2) ;
			const weatherTEMP = document.createElement("div") ;
			weatherTEMP.className="weatherTEMP";
			const weatherTEMPcold = document.createElement("div") ;
			weatherTEMPcold.className = "weatherTEMPcold" ;
			// const weatherTEMPDES = document.createElement("div") ;
			weatherTEMPDES.className = "weatherTEMPDES" ;
			const weatherTEMPhot = document.createElement("div") ;
			weatherTEMPhot.className = "weatherTEMPhot" ;

			weatherTEMPcold.textContent = "L:" + location.weatherElement[2].time[0].parameter.parameterName + "°C";;
			weatherTEMPhot.textContent = "H:" + location.weatherElement[4].time[0].parameter.parameterName  + "°C";;

			
			item.appendChild(town) ;
			item.appendChild(time) ;
			item.appendChild(weatherTEMP);weatherTEMP.appendChild(weatherTEMPcold) ; weatherTEMP.appendChild(weatherTEMPDES);weatherTEMP.appendChild(weatherTEMPhot) ;
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
	// let all = document.querySelectorAll("div.weatherTEMP") ;
	// let textcount = 0 ;
	// while(textcount < 10){
	// 	let cold = all[textcount].querySelector(".weatherTEMPcold") ;
	// 	let DES = all[textcount].querySelector(".weatherTEMPDES") ;
	// 	let hot = all[textcount].querySelector(".weatherTEMPhot") ;
	// 	if (cold.textContent !== ""){
	// 		let csscountcold = 1 ;
	// 		setInterval(() => {
	// 			if (csscountcold < 0.6){
	// 				csscountcold = 1 ;
	// 			}
	// 			cold.style.opacity = csscountcold ;
	// 			csscountcold -= 0.1 ;
	// 		},300) ;
	// 	}else if (DES.textContent !== ""){
	// 		let csscountDES = 1 ;
	// 		setInterval(() => {
	// 			if (csscountDES < 0.6){
	// 				csscountDES = 1 ;
	// 			}
	// 			DES.style.opacity = csscountDES ;
	// 			csscountDES -= 0.1 ;
	// 		},300) ;
	// 	}else if (hot.textContent !== ""){
	// 		let csscounthot = 1 ;
	// 		setInterval(() => {
	// 			if (csscounthot < 0.6){
	// 				csscounthot = 1 ;
	// 			}
	// 			hot.style.opacity = csscounthot ;
	// 			csscounthot -= 0.1 ;
	// 		},300) ;
	// 	}
	// 	textcount += 1 ;
	// }
}



	
