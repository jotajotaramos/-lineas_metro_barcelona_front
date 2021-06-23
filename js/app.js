var linesStations = [];
var apiURL = 'http://127.0.0.1:8000/api/underground_lines';

// Loading API loading all the information in linesStations[]
window.addEventListener('load', (event) => {

    fillSelector();

});

async function getData(){

    document.getElementById("status").innerHTML = "<br /><b>Cargando datos...</b>";
    let response = await fetch(apiURL).catch((error) => {
        document.getElementById("status").innerHTML = "<br /><b>ERROR: " + error;
      });;
    linesStations = await response.json();   
    
}

async function fillSelector(){

    await getData();

    console.log(linesStations);

    var undergroundLines = document.getElementById('undergroundLines');

    linesStations.forEach(element => {

        var opt = document.createElement('option');
        opt.value = element["lineCode"];
        opt.innerHTML = element["lineName"];

        undergroundLines.appendChild(opt);        
        
    });

    document.getElementById("status").innerHTML = "<br /><span style='background-color:green;'>Carga finalizada</b>";

}

selectElement = document.getElementById('undergroundLines');

selectElement.addEventListener('change', (event) => {

    selectedValue = selectElement.value;

    for (x=0;x<linesStations.length;x++){

        if (linesStations[x].lineCode == selectedValue){

            document.getElementById("stations").innerHTML = "<hr />Paradas:";
            var stations_ul = document.createElement("ul");
            var stations_div = document.getElementById("stations");
            stations_div.appendChild(stations_ul);

            linesStations[x].stations.forEach(element => {

                var station_li = document.createElement("li");
                station_li.textContent = element.stationName;
                stations_ul.appendChild(station_li);

            });           

        }

    }    

});
