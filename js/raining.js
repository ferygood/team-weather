let records = null;
let container = document.querySelector("#raining");


fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=" + CWB_API_KEY).then((response) => {
    return response.json();
}).then((data) => {
    records = data.records;
    rainingaddbody(0);
});

function renderRaining(page) {
    let startIndex = page * 10;
    let endIndex = (page + 1) * 10;
    for (let i = startIndex; i < endIndex; i++) {
        const location = records.location[i];
        const item = document.createElement("div");
        item.className = "location";
        const town = document.createElement("div");
        town.className = "town";
        town.textContent = location.parameter[0].parameterValue + "、" + location.parameter[2].parameterValue;
        const amount = document.createElement("amount");
        amount.className = "amount";
        amount.textContent = location.weatherElement[6].elementValue + " mm";
        item.appendChild(town);
        item.appendChild(amount);
        container.appendChild(item);
    }
}

//建立基礎表格
function rainingaddtable() {
    const rainingtable = document.createElement("table");
    rainingtable.className = "rainingtable"
    container.appendChild(rainingtable);

    //表格標題
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

rainingaddtable()

function rainingaddbody(page) {
    let startIndex = page * 10;
    let endIndex = (page + 1) * 10

    //表格內容
    rainingtable = document.querySelector('.rainingtable');
    const rainingtablebody = document.createElement("tbody");
    rainingtable.appendChild(rainingtablebody);

    for (let i = startIndex; i < endIndex; i++) {
        const location = records.location[i];

        const rainingtablebodytr = document.createElement("tr");
        rainingtablebody.appendChild(rainingtablebodytr);

        const rainingtablebodyth0 = document.createElement("td");
        rainingtablebodyth0.textContent = i + 1
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