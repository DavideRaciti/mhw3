//SPOTIFY API

//estrae casualmente una playlist fra quelle presenti nel json, salva i campi necessari e li appende a spotify per mostrarli in ordine
//(thumbnail playlist - nome playlist - bottone che linka alla playlist su spotify)
function onJson_Spotify(json){
    console.log(json);

    const spotify = document.querySelector('#spotify');
    const playlist_div = document.createElement('div');
    const random_playlist = Math.floor(Math.random() * json.playlists.items.length);
    const playlist = json.playlists.items[random_playlist];
  
    const image = document.createElement('img');
    image.classList.add('thumbnail');
    image.src = playlist.images[0].url
  
    const playlist_name = document.createElement('span');
    playlist_name.textContent = playlist.name;
  
    const playlist_link = document.createElement('a');
    playlist_link.classList.add('link');
    playlist_link.href = playlist.uri;
  
    const button_spotify = document.createElement('img');
    button_spotify.classList.add('play_button');
    button_spotify.src = "./images/spotify_button.png"
  
    playlist_link.appendChild(button_spotify);
  
    playlist_div.appendChild(image);
    playlist_div.appendChild(playlist_name);
    playlist_div.appendChild(playlist_link);

    spotify.appendChild(playlist_div);
}

function onTokenJson(json){
    console.log(json);
    token_spotify = json.access_token;
}

//funzione chiamata quando viene cliccato il bottone relativo al blocco di spotify, estrae un nome casuale dall'array "spotify" per poi 
//cercare questo nome fra le playlist di spotify
function searchSpotify(event){
    event.preventDefault();

    const cancel_content = document.querySelector('#spotify');
    cancel_content.innerHTML = '';

    for(let i = 0; i < 4; i++){
        const random_playlist = Math.floor(Math.random() * playlist.length);
        console.log(playlist[random_playlist]);

        fetch('https://api.spotify.com/v1/search?type=playlist&q=' + playlist[random_playlist],
        {
            headers:
            {
                'Authorization': 'Bearer ' + token_spotify
            }
        }).then(onResponse).then(onJson_Spotify);
    }
}

//CAR API

//api che cerca l'auto a seconda del marchio scritto nel form
function onJson_CarMake(json){
    console.log('json car ricevuto');
    console.log(json);

    const grid = document.querySelector('#car');
    grid.innerHTML = '';

    if (json.status == 400){
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode(json.detail); 
        errore.appendChild(messaggio); 
        library.appendChild(errore);
        return
    }
    
    //Leggiamo i risultati
    const results = json;
      
    if(results.length == 0){
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode("Nessun risultato, auto non presente!"); 
        errore.appendChild(messaggio); 
        grid.appendChild(errore);
    }

    for(const result of results){
        // Leggiamo le info fornite dal json, salviamo quelle necessarie e le appendiamo alla grid che le mostra assieme
        
        const car_grid = document.createElement('div');
        const car_make = document.createElement('h1');
        car_make.textContent = "Marchio dell'auto: " + result.make;

        const car_class = document.createElement('h2');
        car_class.textContent = "Tipologia di auto: " + result.class;

        const cylinder = document.createElement('p');
        cylinder.textContent = "Numero di cilindri delle auto più potenti: " + result.cylinders;

        const example = document.createElement('p');
        example.textContent = "Un modello di questo marchio (" + result.make + ") è la " + result.model;

        car_grid.appendChild(car_make);
        car_grid.appendChild(car_class);
        car_grid.appendChild(cylinder);
        car_grid.appendChild(example);

        grid.appendChild(car_grid);    
    }
}

//a seconda della trasmissione fornita dal json restituisce l'equivalente in italiano
function transmissionTxt(transmission){
    if(transmission === 'a')
        return 'automatico';
    else
        return 'manuale';
}

//a seconda del tipo di trazione fornitt dal json ne restituisce l'equivalente in italiano
function tractionTxt(traction){
    if(traction === "fwd")
        return 'anteriore';
    else if(traction === "rwd")
        return 'posteriore';
    else
        return 'integrale';
}

//a seconda del carburante fornito dal json restituisce l'equivalente in italiano
function fuel_typeTxt(fuel_type){
    if(fuel_type === 'gas')
        return 'benzina';
    else if(fuel_type === 'diesel')
        return 'diesel';
    else 
        return 'elettrica';
}

//api che ricerca l'auto a seconda del modello scritto nel form
function onJson_CarModel(json){
    console.log('json car ricevuto');
    console.log(json);

    const grid = document.querySelector('#car');
    grid.innerHTML = '';

    if (json.status == 400){
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode(json.detail); 
        errore.appendChild(messaggio); 
        library.appendChild(errore);
        return
    }
    
    //Leggiamo i risultati
    const results = json;
      
    if(results.length == 0){
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode("Nessun risultato, auto non presente!"); 
        errore.appendChild(messaggio); 
        grid.appendChild(errore);
    }

    for(const result of results){
        // Leggiamo le informazioni fornite fornite dal json, salviamo quelle necessarie e le appendiamo alla grid che le mostra tutte assieme
        
        const car_grid = document.createElement('div');
        const car_make = document.createElement('h1');
        car_make.textContent = "Marchio dell'auto: " + result.make;

        const car_class = document.createElement('h2');
        car_class.textContent = "Tipologia di auto: " + result.class;

        const traction = result.drive;
        const traction_text = document.createElement('p');
        traction_text.textContent = "Trazione: " + tractionTxt(traction) + " (" + traction + ")";

        const consumo_medio = document.createElement('p');
        consumo_medio.textContent = "Consumo medio: " + result.combination_mpg + "Km/L";

        const transmission = result.transmission;
        const transmission_text = document.createElement('p');
        transmission_text.textContent = 'Tipologia di trasmissione: ' + transmissionTxt(transmission);

        const fuel_type = result.fuel_type;
        const fuel_type_text = document.createElement('p');
        fuel_type_text.textContent = "Carburante usato: " + fuel_typeTxt(fuel_type);

        car_grid.appendChild(car_make);
        car_grid.appendChild(car_class);
        car_grid.appendChild(traction_text);
        car_grid.appendChild(transmission_text);
        car_grid.appendChild(consumo_medio);
        car_grid.appendChild(fuel_type_text);

        grid.appendChild(car_grid);     
    }
}

function onResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}

//cerca la macchina a seconda che sia stata cercata per marchio o per modello ed esegue la fetch associata alla api scelta
function searchCar(event){
    event.preventDefault();

    const content = document.querySelector('#content').value;
    const text = encodeURIComponent(content);
    console.log('Eseguo ricerca elementi riguardanti: ' + text);

    //leggo l'opzione che è stata scelta
    const choice = document.querySelector('#tipo').value;
    console.log('Ricerco elementi di tipo: ' + choice);

   if(choice === 'modello'){
    //fetch car api
    fetch('https://api.api-ninjas.com/v1/cars?limit=1&model=' + text,
    {
        headers:
        {
            'X-Api-Key': 'A7pwKpz6vd21hp/QqLtgWQ==5RqUbo0IINodM889'
        }
    }).then(onResponse).then(onJson_CarModel);
   }
   else if(choice === 'marchio'){
    //fetch spotify
    fetch('https://api.api-ninjas.com/v1/cars?limit=1&make=' + text,
    {
        headers:
        {
            'X-Api-Key': car_key
        }
    }).then(onResponse).then(onJson_CarMake);
   }
}


//Api_Key Car Api
const car_key = 'A7pwKpz6vd21hp/QqLtgWQ==5RqUbo0IINodM889';

//CLIENT_ID, CLIENT_SECRET E TOKEN SPOTIFY KEY
const client_id = "0e59997f5ebf4d9ebe86c7b10cc00e8f";
const client_secret = "2f3ded3295294be9991ef348384d308b";
let token_spotify;
const playlist = ["Night drive", "Car music", "Roadtrip", "Auto playlist", "Bass boost car", "Song car" ];

fetch('https://accounts.spotify.com/api/token',
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}).then(onResponse).then(onTokenJson); 

//i due listener associati all'evento click e submit relativi alle due api

const form = document.querySelector('#search_content');
form.addEventListener('submit', searchCar);

const button = document.querySelector('#button');
button.addEventListener('click', searchSpotify);