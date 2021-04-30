import {useState, useEffect, useContext} from 'react';
import { fetchPopularMovies } from '../js/movieDbServices';
import '../App.css';
import DisplayMovies from './DisplayMovies';
import {ErrorContext} from '../js/context';

const PopularMovies = () =>
{
    const [popularMovies, setPopularMovies] = useState([]);
    const [setError] = useContext(ErrorContext);

    useEffect ( () => {
        fetchPopularMovies()
        .then( (data) => {
            setPopularMovies(data.results.slice(0,12));
            setError('');
        })
        .catch( (err) => {
            setError(err);
        });
    }, []);

    return (
        <div className="wrapper">
            <DisplayMovies movies={popularMovies} mediaType={"movie"} />
        </div>
    )
};

export default PopularMovies;