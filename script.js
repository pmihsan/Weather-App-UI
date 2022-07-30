const apiKey = "Use Your API Key Here";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city) =>  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLoc(city){
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(data){
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = 
    `<h2> <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
    ${temp}°C 
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> </h2> 
    <small>${data.weather[0].main}</small>`;
    
    main.innerHTML = "";
    main.appendChild(weather);
};

function KtoC(K){
    return Math.floor(K - 273.15);
}
var buttn = document.querySelector('#btn');
buttn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = search.value;
    if(city){
        getWeatherByLoc(city);
    }
    // document.getElementById('search').innerHTML = "";
});

// To Prevent Default Enter Key Functionality
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});