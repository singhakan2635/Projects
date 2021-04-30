export const fetchPopularMovies = () => {
    return fetch(`/movie/popular`, {
        method: 'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
  };


export const fetchMovieDetail = (id) => {
    const apiURL = "https://api.themoviedb.org/3/movie/"+id+"?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US";
    return fetch(apiURL, {
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
  };

export const fetchSimilarMovies = (id) => {
    const apiURL = "https://api.themoviedb.org/3/movie/"+id+"/similar?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US&page=1";
    return fetch(apiURL, {
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
}

export const fetchTrendingMovies = () => {
    return fetch(`/trending/week`, {
        method: 'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
};

export const fetchPopularTvSeries = () => {
    return fetch(`/tvseries/popular`,{
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
}

export const fetchTvSeriesDetail = (id) => {
    const apiURL = "https://api.themoviedb.org/3/tv/"+id+"?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US";
    return fetch(apiURL, {
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
}

export const fetchSimilarTvShows =(id) => {
    const apiURL = "https://api.themoviedb.org/3/tv/"+id+"/similar?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US&page=1";
    return fetch(apiURL, {
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
}

export const fetchSearchByName = (keyword) => {
    const apiURL = "https://api.themoviedb.org/3/search/multi?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US&query="+keyword+"&page=1&include_adult=false";
    return fetch(apiURL, {
        method:'GET',
    })
    .catch(convertNetworkError)
    .then(convertResponse);
}


const convertNetworkError = () => Promise.reject({ error: "NETWORK_ERROR" });
  
const convertResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => Promise.reject(err));
};
  