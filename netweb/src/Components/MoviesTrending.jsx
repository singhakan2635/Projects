import { useContext, useEffect, useState } from "react"
import {fetchTrendingMovies} from '../js/movieDbServices';
import errors from '../js/errors';
import { ErrorContext } from "../js/context";
import DisplayMovies from "./DisplayMovies";

const MoviesTrending = () => {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [setError] = useContext(ErrorContext);

    useEffect( () => {
        fetchTrendingMovies()
        .then((data) => 
        {
            setTrendingMovies(data.results.slice(0,18));
            setError('');
        })
        .catch( (err) => 
        {
            setError(errors[err.error || err || "DEFAULT"]);
        })
    },[]);
 
    return(
        <div>
            <DisplayMovies movies={trendingMovies} mediaType={""}/>
        </div>
    )
};

export default MoviesTrending;