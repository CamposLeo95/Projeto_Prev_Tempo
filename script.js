//Variaveis

let input = document.getElementById('input');
let btnSearch = document.getElementById('btn-search');
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let clima = document.getElementById('clima');
let humidade = document.getElementById('humidade');
let imgClima = document.getElementById('img-clima');
let APIkey ='f979a06146400d186d09c599612b9ee3'

// Funçoes

async function getApi(apikey){
    let cidade = input.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apikey}&lang=pt_br`

    let preview = await fetch(url).then(res =>{
                                return res.json()
                            }).then(data=>{
                                return data; 
                            })

    console.log(preview);
    return preview;
}

async function editElement(api){
   let response = await api;
   let temperatura = Math.round(response.main.temp);

    temp.innerText = `${temperatura} °C`;
    city.innerText =  `${response.name} - ${response.sys.country}`;
    clima.innerText = response.weather[0].description;
    humidade.innerText = `Humidade: ${response.main.humidity}%`;
    
}

async function verifyImg(api){
    let response = await api;
    let weatherMain = response.weather[0].main ;
    console.log(weatherMain);
    switch(weatherMain){
        case 'Clouds':
            imgClima.setAttribute('src', "./img/dia-nublado.png");
            break
        case 'Snow':
            imgClima.setAttribute('src', "./img/neve.png");
            break
        case 'Rain':
            imgClima.setAttribute('src', "./img/chuva.png");
            break
        case 'Clear':
            imgClima.setAttribute('src', "./img/sol.png");
            break
        default:
            console.log('Nenhum');
            break
    }
 }


// Eventos

btnSearch.addEventListener('click', (e)=>{
    e.preventDefault()

    editElement(getApi(APIkey))
    verifyImg(getApi(APIkey))
})
