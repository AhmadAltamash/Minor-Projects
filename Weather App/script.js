let searchValue = document.getElementById("search")
let cityValue = document.getElementById("city")
let tempratureValue = document.getElementById("temprature")
let descriptionValue = document.querySelector(".description")
let cloud = document.getElementById("cloud")
let humidity = document.getElementById("humidity")
let pressure= document.getElementById("pressure")
let form = document.querySelector('form')
let main = document.querySelector('main')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(searchValue.value != ''){
        searchWeather()
    }
})

let id = 'f817b678aa6ae0589ffe4ddbb2b01920'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;

const searchWeather = () =>{
    fetch(url +'&q=' + searchValue.value)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        if(data.cod == 200)
        {
            cityValue.querySelector('figcaption').innerHTML = data.name;
            cityValue.querySelector('img').src = "https://flagsapi.com/"+data.sys.country+"/shiny/32.png"

            tempratureValue.querySelector('img').src = 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png'

            tempratureValue.querySelector('figcaption span').innerHTML = data.main.temp

            descriptionValue.innerHTML = data.weather[0].description;
            descriptionValue.style.textTransform = 'capitalize'

            cloud.innerHTML = data.clouds.all
            humidity.innerHTML = data.main.humidity
            pressure.innerHTML = data.main.pressure
        }
        else{
            main.classList.add('error')
            setTimeout(()=>{
                main.classList.remove('error')
            },1000)
        }
        searchValue.value = ''
    })
}

const initApp = () =>{
    searchValue.value = 'Mecca';
    searchWeather();
}
initApp()