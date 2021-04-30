import { useEffect, useState, useContext } from 'react';
import {fetchSimilarTvShows} from '../js/movieDbServices';
import {ErrorContext, ContentState} from '../js/context';
import DisplaySimilar from './DisplaySimilar';
import errors from '../js/errors';

const SimilarTVShows = () => {

    const [similartvShows, SetSimilarTvShows] = useState([]);
    const [contentState, setContentState] = useContext(ContentState);
    const [setError] = useContext(ErrorContext);

    useEffect (() => {
        window.scroll(0,0);
        setContentState({});
        fetchSimilarTvShows(contentState.id)
        .then ((data) => {
            SetSimilarTvShows(data.results.slice(0,12));
        })
        .catch( (err) => {
            //import errors from '../errors';
            setError(errors[err.error || err || "DEFAULT"]);
        });
    }, [contentState.id]);

    const getDetails = (id) =>
    {
        setContentState({...contentState, id: id});
    }
    
    return(
        <DisplaySimilar list={similartvShows} media={"tv"} getDetails={getDetails} />
    )
};

export default SimilarTVShows;