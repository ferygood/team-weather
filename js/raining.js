let records = null;
let rainingcontainer = document.querySelector("#raining");
let rainingpage = 0;
let raininginputkeyword = ""
let raininginputkeywordArray = []
let rainingpagemax = 0;


function raininggetapidata(raininggetapiindex) {
    if (rainingpage + raininggetapiindex < 0) {
        rainingpage = 1;
    }
    if (rainingpage + raininggetapiindex >= rainingpagemax) { rainingpage = rainingpagemax; } else {
        rainingpage = rainingpage + raininggetapiindex;
    }
    // console.log(rainingpage);
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=" + CWB_API_KEY).then((response) => {
        return response.json();
    }).then((data) => {
        records = data.records;
        // console.log(records.location[0])



        rainingaddbody(rainingpage);
    });
}


//建立基礎畫面
function rainingaddtable() {
    rainingsearchbox = document.createElement("div");
    rainingsearchbox.className = "rainingsearchbox"
    rainingcontainer.appendChild(rainingsearchbox);

    rainingsearchboxtext = document.createElement("a");
    rainingsearchboxtext.textContent = "行政區："
    rainingsearchbox.appendChild(rainingsearchboxtext);


    rainingsearchboxinput = document.createElement("input");
    rainingsearchboxinput.className = "rainingsearchboxinput";
    rainingsearchboxinput.placeholder = " 輸入縣市名稱後查詢"
    rainingsearchbox.appendChild(rainingsearchboxinput);

    rainingsearchboxbtn = document.createElement("button");
    rainingsearchboxbtn.textContent = "搜尋";
    rainingsearchbox.appendChild(rainingsearchboxbtn);
    rainingsearchboxbtn.onclick = function() {
        let raininginpu = document.querySelector('.rainingsearchboxinput');
        raininginputkeyword = raininginpu.value
        let element = document.querySelector('.rainingtable');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        rainingaddhead()
        raininggetapidata(0);
        raininginputkeywordArray = []
            // alert(raininginputkeyword)
    }

    rainingpagebtnbox = document.createElement("div");
    rainingpagebtnbox.className = "rainingpagebtnbox"
    rainingcontainer.appendChild(rainingpagebtnbox);


    const rainingprevbtn = document.createElement("button");
    rainingprevbtn.textContent = "上一頁"
    rainingprevbtn.className = "rainingprevbtn"
    rainingpagebtnbox.appendChild(rainingprevbtn);

    rainingprevbtn.onclick = function() {
        let element = document.querySelector('.rainingtable');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        rainingaddhead()
        raininggetapidata(-1);
    }

    const rainingnextbtn = document.createElement("button");
    rainingnextbtn.textContent = "下一頁"
    rainingnextbtn.className = "rainingnextbtn"
    rainingpagebtnbox.appendChild(rainingnextbtn);

    rainingnextbtn.onclick = function() {
        let element = document.querySelector('.rainingtable');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        rainingaddhead()
        raininggetapidata(1);

    }

    let rainingtable = document.createElement("table");
    rainingtable.className = "rainingtable"
    rainingcontainer.appendChild(rainingtable);


}

//表格標題
function rainingaddhead() {

    let rainingtable = document.querySelector('.rainingtable')
    const rainingtablehead = document.createElement("thead");
    rainingtable.appendChild(rainingtablehead);

    const rainingtableheadtr = document.createElement("tr");
    rainingtablehead.appendChild(rainingtableheadtr);

    const rainingtableheadth0 = document.createElement("th");
    rainingtableheadth0.textContent = "No."
    rainingtableheadtr.appendChild(rainingtableheadth0);

    const rainingtableheadth1 = document.createElement("th");
    rainingtableheadth1.textContent = "行政區"
    rainingtableheadtr.appendChild(rainingtableheadth1);

    const rainingtableheadth2 = document.createElement("th");
    rainingtableheadth2.textContent = "雨量站"
    rainingtableheadtr.appendChild(rainingtableheadth2);

    const rainingtableheadth3 = document.createElement("th");
    rainingtableheadth3.textContent = "水情時間"
    rainingtableheadtr.appendChild(rainingtableheadth3);

    const rainingtableheadth4 = document.createElement("th");
    rainingtableheadth4.textContent = "1小時累計"
    rainingtableheadtr.appendChild(rainingtableheadth4);

    const rainingtableheadth5 = document.createElement("th");
    rainingtableheadth5.textContent = "24小時累計"
    rainingtableheadtr.appendChild(rainingtableheadth5);
}

//表格內容
function rainingaddbody(page) {


    if (raininginputkeyword != "") {
        if (raininginputkeywordArray.length == 0) {
            for (let i = 0; i < records.location.length; i++) {
                if (records.location[i].parameter[0].parameterValue == raininginputkeyword) {
                    // console.log(i);
                    raininginputkeywordArray.push(records.location[i]);

                }
            }
        }
        //找無資料
        if (raininginputkeywordArray.length == 0) {
            raininginputkeyword = "";
            alert("無此資料，請輸入正確的縣市名稱。ex:臺北市、花蓮縣...")
            raininggetapidata(0);
        }
        // console.log(raininginputkeywordArray)
        records = raininginputkeywordArray

        //大到小排列
        records = records.sort(function(a, b) {
            return parseFloat(a.weatherElement[6].elementValue) < parseFloat(b.weatherElement[6].elementValue) ? 1 : -1;
        });


        // console.log(records)
        rainingpagemax = records.length;
        if (page >= parseInt(rainingpagemax / 10) + 1) {
            page = parseInt(rainingpagemax / 10);
        }
        rainingpagemax = parseInt(raininginputkeywordArray.length / 10)
            // console.log("最大頁數", rainingpagemax)
            // console.log("有關鍵字，資料比數", records.length)

        rainingdata = records.slice(page * 10, (page + 1) * 10);

    } else {
        rainingpagemax = parseInt(records.location.length / 10) + 1;
        if (page >= rainingpagemax) {
            page = rainingpagemax;
        }

        //大到小排列
        records.location = records.location.sort(function(a, b) {
            return parseFloat(a.weatherElement[6].elementValue) < parseFloat(b.weatherElement[6].elementValue) ? 1 : -1;
        });


        // console.log("沒關鍵字，資料比數", records.location.length)
        rainingdata = records.location.slice(page * 10, (page + 1) * 10);
    }

    // console.log(rainingdata[0].weatherElement[6].elementValue);
    // console.log(rainingdata[1].weatherElement[6].elementValue);

    rainingdata = rainingdata.sort(function(a, b) {
        return parseFloat(a.weatherElement[6].elementValue) < parseFloat(b.weatherElement[6].elementValue) ? 1 : -1;
    });
    // console.log(rainingdata)


    rainingtable = document.querySelector('.rainingtable');
    const rainingtablebody = document.createElement("tbody");
    rainingtablebody.className = "rainingtabletbody";
    rainingtable.appendChild(rainingtablebody);

    for (let i = 0; i < rainingdata.length; i++) {
        const location = rainingdata[i];

        const rainingtablebodytr = document.createElement("tr");
        rainingtablebody.appendChild(rainingtablebodytr);

        const rainingtablebodyth0 = document.createElement("td");
        rainingtablebodyth0.textContent = page * 10 + i + 1
        rainingtablebodytr.appendChild(rainingtablebodyth0);

        const rainingtablebodyth1 = document.createElement("td");
        rainingtablebodyth1.textContent = location.parameter[0].parameterValue
        rainingtablebodytr.appendChild(rainingtablebodyth1);

        const rainingtablebodyth2 = document.createElement("td");
        rainingtablebodyth2.textContent = location.locationName
        rainingtablebodytr.appendChild(rainingtablebodyth2);

        const rainingtablebodyth3 = document.createElement("td");
        rainingtablebodyth3.textContent = location.time.obsTime
        rainingtablebodytr.appendChild(rainingtablebodyth3);

        const rainingtablebodyth4 = document.createElement("td");
        rainingtablebodyth4.textContent = location.weatherElement[7].elementValue + " mm";
        rainingtablebodytr.appendChild(rainingtablebodyth4);

        const rainingtablebodyth5 = document.createElement("td");
        rainingtablebodyth5.textContent = location.weatherElement[6].elementValue + " mm";
        rainingtablebodytr.appendChild(rainingtablebodyth5);

    }
}

//按鈕功能列
rainingaddtable();
//表格標
rainingaddhead();
//表格內容
raininggetapidata(0);



function raininggetapidatatest() {

    // console.log(rainingpage);
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=" + CWB_API_KEY).then((response) => {
        return response.json();
    }).then((data) => {
        records = data.records;
        console.log(records.location.length)
        console.log(records.location[0])
            // console.log(records.location[0].weatherElement[6].elementValue) //雨量
        console.log(records.location[0].parameter[0].parameterValue) //行政區
        for (let i = 0; i < records.location.length; i++) {
            if (records.location[i].parameter[0].parameterValue == "新北市") {
                console.log(i)
            }
        }

        // parameter
    });
}

// raininggetapidatatest()