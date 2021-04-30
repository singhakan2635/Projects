import '../App.css';
import MovieDetails from './MovieDetail';
import { useState,useContext } from 'react';
import { ContentState} from '../js/context';
import TvSeriesDetails from './TvSeriesDetails';
import RemoveFromWishlist from './RemoveFromWishlist';
import notAvailable from '../images/notFound.png';



const DisplayWishlist = ({movies, mediaType, loaddata}) => 
{
    const [state, setState] = useState({showDetails:false, id:'', media:''});
    const [contentState, setContentState] = useContext(ContentState);

    const getDetails = (id,media) =>
    {
        setContentState({});
        setState({});
        let checkMedia;
        if(!mediaType)
        {
            checkMedia=media;
        }
        else{
            checkMedia=mediaType;
        }
        setState({showDetails:true, id:id, media:checkMedia});
        setContentState({...contentState, id:id});
    }

    const modifyDetails =() =>
    {
        setState({showDetails:false, id:''});
        setContentState({});
    }
    
    
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    let title;

    const movieList = movies.map( (movie) => 
    {
       
        if(mediaType==="tv" || movie.media_type==="tv")
        {
            title=movie.original_name;
        }
        else
        {
            title=movie.title;
        }
        let images;
        if (movie.poster_path) {
            images = <img src={imgUrl + movie.poster_path} alt={title} className="poster-img" />
        }
        else {
            images = <img src={notAvailable} alt={notAvailable} className="poster-img" />
        }
        
        return (
            <li key={movie.id} className="list-item">
                <div className="item-display">
                    {images}
                    <p className="movie-title">{title}</p>
                    <button onClick={() => getDetails(movie.id, movie.media_type) } className="details-button">Details</button>
                    <RemoveFromWishlist id={movie.id} media={mediaType} loaddata={loaddata} />
                </div>
            </li>
        )
    });
    let content;
    if(state.id && state.media==="movie")
    {
        content = <MovieDetails id={state.id} modifyDetails={modifyDetails} /> ;
    }
    else if(state.id && state.media==="tv")
    {
        content = <TvSeriesDetails id={state.id} modifyDetails={modifyDetails}/>
    }
    else
    {
        content = 
                    <ul className="top-list-item">
                         {movieList}
                    </ul>
    }
    
    return (
        <div className="listing-container">
            {content}
        </div>
        
    )
};

export default DisplayWishlist;