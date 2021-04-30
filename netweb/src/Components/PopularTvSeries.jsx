import {useState, useEffect, useContext} from 'react';
import { fetchPopularTvSeries } from '../js/movieDbServices';
import DisplayMovies from './DisplayMovies';
import errors from '../js/errors';
import { ErrorContext } from '../js/context';

const PopularTvSeries = () =>
{
    const [popularTvSeries, setpopularTvSeries] = useState([]);
    const [setError] = useContext(ErrorContext);

    useEffect ( () => {
        fetchPopularTvSeries()
        .then( (data) => {
            setpopularTvSeries(data.results.slice(0,12));
            setError('');
        })
        .catch( (err) => {
            setError(errors[err.error || err || "DEFAULT"]);
        });
    }, []);


    return (
        <div className="wrapper">
            <DisplayMovies movies={popularTvSeries} mediaType={"tv"} />
        </div>
    )
};

export default PopularTvSeries;