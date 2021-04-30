import { useContext, useEffect, useState } from "react";
import {abilityToGetWhishList} from '../js/services';
import { ContentState, ErrorContext } from "../js/context";
import {fetchMovieDetail, fetchTvSeriesDetail} from '../js/movieDbServices';
import errors from '../js/errors';
import DisplayWishlist from "./DisplayWishList";

const ShowWishlist = ({display,loaddata}) => 
{
    const [list, setList] = useState([]);
    const [setError] = useContext(ErrorContext);
    const [movies, setMovies] = useState([]);
    const [tvseries, setTvseries] = useState([]);
    const [noContent, setNoCOntent] = useState([]);
    const [contentState, setContentState] = useContext(ContentState);

    useEffect(() => 
    {
        setList([]);
        if(contentState.remove)
        {
            setMovies([]);
            setTvseries([]);
        }
        abilityToGetWhishList()
        .then((data) => 
        {
            if(data.movies.length===0 && data.shows.length===0)
            {
                setNoCOntent("No data");
            }
            else
            {
                setList({movies:data.movies, shows:data.shows});
                createMovielist();
                createShowsList();
                setNoCOntent('');
            }
            
        })
        .catch(err =>
            {
                setError(errors[err.error || err || "DEFAULT"]);
            })
    },[contentState.id,display]);

    const getMovieItems = (id) => 
    {
        fetchMovieDetail(id)
        .then (data => {
            setMovies((movies) => [...movies, data]);
        })
    };
    const getTvList = (id) => {
        fetchTvSeriesDetail(id)
        .then(data => {
            setTvseries((tvseries) => [...tvseries,data]);
        });
    };

    const createMovielist = () => {
        list.movies.map( id => {
            getMovieItems(id);
        });
    };

    const createShowsList = () => {
        
        list.shows.map( id => {
            getTvList(id);
        });
    }

   
    return (
        <div>
            {noContent && <h2>No item added in the wishlist!</h2>}
            <DisplayWishlist movies={movies} mediaType={"movie"} loaddata={loaddata} />
            <DisplayWishlist movies={tvseries} mediaType={"tv"} loaddata={loaddata}/>
        </div>
    );
};

export default ShowWishlist;