import { useEffect, useState, useContext } from 'react';
import {fetchSimilarMovies} from '../js/movieDbServices';
import { ContentState, ErrorContext, WistlistState } from '../js/context';
import DisplaySimilar from './DisplaySimilar';
import errors from '../js/errors';

const ShowSimilar = ({id, modifyDetails}) => {

    const [similarMovies, SetSimilarMovies] = useState([]);
    const [contentState, setContentState] = useContext(ContentState);
    const [newwishlist, setnewwishlist] = useContext(WistlistState);
    const [setError] = useContext(ErrorContext);

    useEffect (() => {
        window.scroll(0,0);
        setContentState({});
        fetchSimilarMovies(contentState.id)
        .then ((data) => {
            SetSimilarMovies(data.results.slice(0,12));
        })
        .catch( (err) => {
            setError(errors[err.error || err || "DEFAULT"]);
        });
    }, [contentState.id]);

    const getDetails = (id) =>
    {
        setContentState({...contentState, id: id});
        setnewwishlist('');
    }
    
    return(
        <DisplaySimilar list={similarMovies} media={"movies"} getDetails={getDetails} />
    )
};

export default ShowSimilar;