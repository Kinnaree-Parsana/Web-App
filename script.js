async function weather(evt) {
    evt.preventDefault();
    const input = document.querySelector('input');
    const cityName = input.value;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9f93874d470eac3963fc7c9c969eb2a1`, {
            mode: 'cors',
        });
        const value = await response.json();
    
        const location = value.name;
        document.querySelector('.location').innerText="City: "+location;
        const temp = parseInt(value.main.temp - 274.15);
        document.querySelector('.degrees').innerText="Temperature: "+temp+"°C";
        const condition= value.weather[0].description;
        const icon = value.weather[0].icon;
        document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + "@4x.png";
        document.querySelector('.condition').innerText="Condition: "+condition;
        const winds = parseFloat(value.wind.speed);
        document.querySelector('.wind').innerText="Wind Speed: "+winds+"m/s";
        const humidity = parseInt(value.main.humidity);
        document.querySelector('.humidity').innerText="Humidity: "+humidity+"%";
        
        input.value = '';
    } catch {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        console.log('Error in finding city');
        return;
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', weather);