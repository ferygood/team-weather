let weatherRecords=null;
let weatherPages ;
let weathertime = 0;
let allArea = {
	north:"臺北市、新北市、基隆市、新竹市、桃園市、新竹縣、宜蘭縣",
	middle:"臺中市、苗栗縣、彰化縣、南投縣、雲林縣",
	south:"高雄市、臺南市、嘉義市、嘉義縣、屏東縣、澎湖縣",
	east:"花蓮縣、臺東縣",
	other:"金門縣、連江縣",
	all:"臺北市、新北市、基隆市、新竹市、桃園市、新竹縣、宜蘭縣臺中市、苗栗縣、彰化縣、南投縣、雲林縣、高雄市、臺南市、嘉義市、嘉義縣、屏東縣、澎湖縣、花蓮縣、臺東縣、金門縣、連江縣"
} ;
let where = allArea.all;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	const container = document.createElement("div") ;
	const weather = document.querySelector("#weather") ;
	const period = document.createElement("div") ;period.className = "weatherPeriod" ;
	const now = document.createElement("button") ; now.textContent = "最新狀況" ;
	now.addEventListener("click", () => {
		container.innerHTML = "" ;
		weathertime = 0 ;
		renderWeather(0,weathertime,where); 
	}) ;
	const twelve = document.createElement("button") ; twelve.textContent = "未來12小時" ;
	twelve.addEventListener("click", () => {
		container.innerHTML = "" ;
		weathertime = 1 ;
		renderWeather(0,weathertime,where); 
	})
	const twentyfour = document.createElement("button") ; twentyfour.textContent = "未來24小時" ;
	twentyfour.addEventListener("click", () => {
		container.innerHTML = "" ;
		weathertime = 2 ;
		renderWeather(0,weathertime,where); 
	})
	period.appendChild(now) ; period.appendChild(twelve) ; period.appendChild(twentyfour) ;
	const area = document.createElement("div") ; area.className = "weatherArea" ;
	const north = document.createElement("button") ; north.textContent = "北部" ;
	north.addEventListener("click", () => {
		container.innerHTML = "" ;
		where = allArea.north ;
		renderWeather(0,weathertime,where); 
	})
	const middle = document.createElement("button") ; middle.textContent = "中部" ;
	middle.addEventListener("click", () => {
		container.innerHTML = "" ;
		where = allArea.middle ;
		renderWeather(0,weathertime,where); 
	})
	const south = document.createElement("button") ; south.textContent = "南部" ;
	south.addEventListener("click", () => {
		container.innerHTML = "" ;
		where = allArea.south ;
		renderWeather(0,weathertime,where); 
	})
	const east = document.createElement("button") ; east.textContent = "東部" ;
	east.addEventListener("click", () => {
		container.innerHTML = "" ;
		where = allArea.east ;
		renderWeather(0,weathertime,where); 
	})
	const other = document.createElement("button") ; other.textContent = "福建省" ;
	other.addEventListener("click", () => {
		container.innerHTML = "" ;
		where = allArea.other ;
		renderWeather(0,weathertime,allArea.other); 
	})
	area.appendChild(north) ; area.appendChild(middle) ; area.appendChild(south) ; area.appendChild(east) ; area.appendChild(other) ;
	weather.appendChild(period) ; weather.appendChild(area) ;weather.appendChild(container) ;
	weatherRecords=data.records;
	renderWeather(0,weathertime,where);
});
function renderWeather(page,weathertime,where){
	let pagecount = 0 ;
	let startIndex = page * 10 ;
	let endIndex = (page + 1) * 10 ;
	const weather = document.querySelector("#weather") ;
	const container = weather.getElementsByTagName("div")[2] ;container.className = "weatherdata" ;
	const pages = document.createElement("div") ;
	pages.className = "weatherpage" ;
	let i = 0 ; 
	
	for(let i=startIndex;i<endIndex;i++){
		const location = weatherRecords.location[i] ;
		if (weatherRecords.location[i] === undefined){
			break ;
		}else{
			let nowarea = new RegExp(location.locationName, "g") ;
			if (where.search(nowarea) === -1 ){
				pagecount ++ ;endIndex ++;
				continue ;
			}
			const item = document.createElement("div") ;
			item.className = "weatherlocation" ;
			const town = document.createElement("div") ;
			town.className = "weathertown" ;
			// location.weatherElement[0].time[0]

			town.textContent = location.locationName
			const time = document.createElement("div") ;
			time.className = "weatherTime" ;
			time.textContent = location.weatherElement[2].time[weathertime].startTime + " ~ " + location.weatherElement[2].time[weathertime].endTime ; 
			
			const weatherTEMPDES = document.createElement("div") ;
			weatherTEMPDES.className = "weatherTEMPDES" ;
			const br = document.createElement("br") ;
			const node = document.createTextNode(location.weatherElement[0].time[weathertime].parameter.parameterName) ;
			const node2 = document.createTextNode(location.weatherElement[3].time[weathertime].parameter.parameterName) ;
			weatherTEMPDES.appendChild(node) ; weatherTEMPDES.appendChild(br) ; weatherTEMPDES.appendChild(node2) ;
			const weatherTEMP = document.createElement("div") ;
			weatherTEMP.className="weatherTEMP";
			const weatherTEMPcold = document.createElement("div") ;
			weatherTEMPcold.className = "weatherTEMPcold" ;
			// const weatherTEMPDES = document.createElement("div") ;
			weatherTEMPDES.className = "weatherTEMPDES" ;
			const weatherTEMPhot = document.createElement("div") ;
			weatherTEMPhot.className = "weatherTEMPhot" ;

			weatherTEMPcold.textContent = "L:" + location.weatherElement[2].time[weathertime].parameter.parameterName + "°C";;
			weatherTEMPhot.textContent = "H:" + location.weatherElement[4].time[weathertime].parameter.parameterName  + "°C";;

			
			item.appendChild(town) ;
			item.appendChild(time) ;
			item.appendChild(weatherTEMP);weatherTEMP.appendChild(weatherTEMPcold) ; weatherTEMP.appendChild(weatherTEMPDES);weatherTEMP.appendChild(weatherTEMPhot) ;
			container.appendChild(item);weather.appendChild(container) ;

		}
		
	}
	i = i - pagecount ;
	while(weatherRecords.location[i] !== undefined){
		i += 10 ;
	}
	weatherPages = (i / 10) ;
	for(let i = 0;i < weatherPages;i++){
		page = i + 1 ;
		let a = document.createElement("a") ;
		let node = document.createTextNode("[" + page + "] ") ;
		a.addEventListener("click", e => {
			container.innerHTML = "" ;
			renderWeather(i,weathertime,where) ;
		})
		a.appendChild(node) ;
		pages.appendChild(a) ;
	}
	container.appendChild(pages) ;
	let all = document.querySelectorAll("div.weatherTEMP") ;
	let textcount = 0 ;
	while(textcount < 10){
		if (all[textcount] === undefined){
			return ;
		}
		let cold = all[textcount].querySelector(".weatherTEMPcold") ;
		let hot = all[textcount].querySelector(".weatherTEMPhot") ;
		if (parseInt(cold.textContent.substr(2,2)) < 15){
			let csscountcold = 1 ;
			setInterval(() => {
				if (csscountcold < 0.6){
					csscountcold = 1 ;
				}
				cold.style.opacity = csscountcold ;
				csscountcold -= 0.1 ;
			},300) ;
		}else if (parseInt(hot.textContent.substr(2,2)) > 29){
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

