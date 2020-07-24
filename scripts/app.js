// Collecting various elements from the DOM
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// new Forecast...see Forecast.js, where the API calls are made
const forecast = new Forecast();

// Primary function for updating the DOM with the collected data
const updateUI = (data) => {
    const { cityDetails, weather } = data;
    details.innerHTML = 
    `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Imperial.Value}</span>
                    <span>&deg;F</span>
                </div>
    `
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
}

    let timeSrc = null;
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    weather.IsDayTime ? timeSrc = 'img/day.svg' : timeSrc = 'img/night.svg';
    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', iconSrc);
}

// Listening for the user submit a location
cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city)
    .then (data => updateUI(data))
    .catch (err => console.log(err));
    
    localStorage.setItem('city', city);

})

// Store city in local storage, so it's remembered when the user leaves and returns
if(localStorage.city){
    forecast.updateCity(localStorage.city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}