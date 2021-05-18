const apiKey = '72ed60c31f833ce8dc26ae1185f60409';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query="`;
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main')

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showmovies(data.results)
}

getMovies(API_URL)


function showmovies(movies){
    main.innerHTML = '';
    //destructurando el objeto movie para usar las constantes 
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        //tomamos la estructura que habiamos creado en html, reemplazando los titulos y atributos por las constantes
        //del objeto movie
        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        
    main.appendChild(movieElement)
    });
}

//esta funcion retorna el color segun la puntuacion de la pelicula y sera devuelto para ser usado 
//en la clase del span
function getClassByRate(vote){
    if (vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    //creo una variable que iguala el valor de la pelicula buscada en el input
    const searchTerm = search.value;

    //si existe searchTerm y no es vacio, que se dispare la funcion
    if (searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)
        //se ejecuta getmovies y le pasamos como parametro api del buscador concatenando la busqueda del cliente
        //osea el searchTerm (anteriormente igualado como search.value)
        //reiniciamos el input a ''
        searchTerm.value = '';
    }else{
        //si submitiamos sin nada en el input recargamos la pagina 
        window.location.reload()
    }
})

