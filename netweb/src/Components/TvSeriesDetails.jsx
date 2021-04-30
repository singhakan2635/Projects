import { useEffect, useState, useContext } from 'react';
import { fetchTvSeriesDetail } from '../js/movieDbServices';
import { ErrorContext, ContentState } from '../js/context';
import errors from '../js/errors';
import {genres} from '../js/genres';
import DisplayDetails from './DisplayDetails';

const TvSeriesDetails = ({ modifyDetails }) => {
    const [details, setDetails] = useState('');
    const [contentState, setContentState] = useContext(ContentState);
    const [setError] = useContext(ErrorContext);

    useEffect(() => {
        setContentState({});
        fetchTvSeriesDetail(contentState.id)
            .then((json) => {
                setDetails({
                    Title: json.name,
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
       
       <DisplayDetails details={details} modifyDetails={modifyDetails} media={"tv"}/>
        
    )
}

export default TvSeriesDetails;