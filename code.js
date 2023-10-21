document.addEventListener('DOMContentLoaded', () => {
    const apiKey= "190782971cc0faaa5e7b367416db1bfb"
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    const searchBox=document.querySelector(".search input");
    const searchBtn=document.querySelector(".search button");
    const weatherIcon=document.querySelector(".weather-icon");

    function loadImagesFromDirectory(directory) {
        document.querySelector(".icons").innerHTML='';
        console.log(directory);
        fetch(directory)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                const imageElements = html.querySelectorAll('a[href$=".png"]');
    
                imageElements.forEach((element, index) => {
                    const img = document.createElement('img');
                    img.src = `${element.getAttribute('href')}`;
                    console.log(img.src);
                    img.alt = `Image ${index + 1}`;
                    document.querySelector('.icons').appendChild(img);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    
    async function checkWeather(city){
        const response = await fetch(apiUrl +city+`&appid=${apiKey}`);

        if(response.status==404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }
        else{
            var data = await response.json();
            console.log(data);
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + '°C';
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            
            weatherIcon.src="images/"+data.weather[0].main.toLowerCase()+".png";
            document.querySelector(".weather").style.display="block";
            document.querySelector(".error").style.display="none";

            var directory="./images/clothes/";

            if (data.main.temp<22){
                directory+="cold/"
            }else{
                directory+="warm/"
            }
            directory+= data.weather[0].main.toLowerCase();

            loadImagesFromDirectory(directory);

            const response_message = await fetch('messages.json');
            const messages = await response_message.json();
            const weatherType = `${data.main.temp < 22 ? 'cold' : 'warm'}-${data.weather[0].main.toLowerCase()}`;

            const messageElement = document.querySelector('.message');
            if (messageElement) {
              messageElement.innerHTML = messages[weatherType] || '';
            }
        }

    }
    searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            checkWeather(searchBox.value);
        }
    });

});
