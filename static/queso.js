var GraficoMaterial;
var GraficoTemperatura;


const MaterialParticulado = document.getElementById('MP').getContext('2d'); //

const Temperatura = document.getElementById('TEMP').getContext('2d'); //

//send image with telebot when button is press

var MaterialDatos = [
    {
        label: 'PM10',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //PM10 with a 24 hour history
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
    },
    {
        label: 'PM2.5',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    },
    {
        label: 'PM1',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2
    }

];
var datos_TEMP = [
    {
        label: 'Temperatura',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
    }
    
];

var info_MP = { //MP
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    datasets: [MaterialDatos[0],
                 MaterialDatos[1],
                  MaterialDatos[2]]
};
var info_TEMP = {   //labels for the x axis to show the time of the day variables are updated and the data is shown in the chart
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    datasets: [datos_TEMP[0]]
};

var options = {
    responsive: true,
    title: {
        display: true,
        text: 'Grafico de Material Particulado'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}; 
var options2 = {
    responsive: true,
    title: {
        display: true,
        text: 'Grafico de Temperatura'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};
function AlmacenaDatos(dData) { // recibe los datos del sensor
    MaterialDatos[0].data= dData[0]; //PM10
    MaterialDatos[1].data= dData[1]; //PM2.5
    MaterialDatos[2].data= dData[2]; //PM1
    datos_TEMP[0].data= dData[3]; //TEMP 
    info_TEMP.datasets = [datos_TEMP[0]]; //TEMP 
    info_MP.datasets = [MaterialDatos[0], MaterialDatos[1], MaterialDatos[2]]; //MP
    GraficoMaterial.update(); //MP
    GraficoTemperatura.update();     //TEMP uses update to update the chart with new data 
};


$(document).ready(function() {
    GraficoMaterial = new Chart(MaterialParticulado, { // create the chart
        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: info_MP, // data  
        options: options // options
    });
    GraficoTemperatura = new Chart(Temperatura, { // create the chart same as above
        type: 'line', 
        data: info_TEMP,
        options: options2
    });
    $.ajax({
            url: "http://127.0.0.1:5000/data",
            method: "GET",
            success: function(data) {
                console.log(data);
                AlmacenaDatos(data);
            },
            error: function(data) {
                console.log(data);
            }
        });
});



     



//make the event listener for the button and create the function to call the function to export the chart   
document.getElementById("graficomp").addEventListener("click", function(){
    img = "a"
    var link = document.createElement('a'); //create a link
    link.download = 'MP.png'; //set the name of the file
    link.href = GraficoMaterial.toBase64Image(); //set the data to the link and convert it to base64 image  
    link.click();
    $.ajax({ //send the image to the server
        type: "POST", //type of request
        url: '/enviar', //url to send the image
        data: img //the image
    });
});     
document.getElementById("graficotemp").addEventListener("click", function(){ //same as the previous one
    var link = document.createElement('a');
    img = "a"
    link.download = 'TP.png';
    link.href = GraficoTemperatura.toBase64Image();
    link.click();
    $.ajax({
        type: "POST",
        url: '/enviar2',
        data: img
    });
}); 


