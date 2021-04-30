import { fetchMovieDetail } from '../js/movieDbServices';
import { useEffect, useState, useContext } from 'react';
import { ErrorContext, ContentState } from '../js/context';
import errors from '../js/errors';
import {genres} from '../js/genres';
import DisplayDetails from './DisplayDetails';

const MovieDetail = ({ modifyDetails }) => {
    const [details, setDetails] = useState('');
    const [contentState, setContentState] = useContext(ContentState);
    const [setError] = useContext(ErrorContext);

    useEffect(() => {
        window.scroll(0, 0);
        setContentState({});
        fetchMovieDetail(contentState.id)
            .then((json) => 
            {
                setDetails({
                    Title: json.title,
                    Year: json.release_date,
                    Tagline: json.tagline,
                    id: json.id,
                    overview: json.overview,
                    PosterUrl: json.poster_path,
                    Genres : genres(json.genres),
                });
                
            })
            .catch((err) => {
                setError(errors[err.error || err || "DEFAULT"]);
            })

    }, [contentState.id]);

    return (
        
        <DisplayDetails details={details} modifyDetails={modifyDetails} media={"movies"} />
    );
};

export default MovieDetail;