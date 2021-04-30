import '../App.css';
import { useState,useContext} from 'react';
import { ContentState} from '../context';
import TvSeriesDetails from './TvSeriesDetails';
import MovieDetails from './MovieDetail';


const SearchResult = ({results}) => 
{
    const [state, setState] = useState({showDetails:false, id:'', mediaType:''});
    const [contentState, setContentState] = useContext(ContentState);
    
    const getDetails = (id, mediaType) =>
    {
        setState({showDetails:true, id:id, mediaType:mediaType});
        setContentState({...contentState, id:id, mediaType:mediaType});
    }

    const modifyDetails =() =>
    {
        setState({showDetails:false, id:'', mediaType:''});
        setContentState({});
    }

    const imgUrl = "https://image.tmdb.org/t/p/w500";
    let images;
    if(result.poster_path)
    {
        images = <img src={imgUrl + result.poster_path} alt={result.original_title} className="poster-img" />
    }
    else{
        images = <img src={notAvailable} alt={notAvailable} className="poster-img" />
    }

    const searchList = results.map( (result) => {
        return (
            <li key={result.id}>
                {images}
                <p className="movie-title">{result.original_name}</p>
                <button onClick={() => getDetails(result.id, result.media_type) }>Details</button>
            </li>
        )
    });
    let content;
    if(state.id)
    {
        if(state.mediaType==="movie")
        {
            content = <MovieDetails id={state.id} modifyDetails={modifyDetails} /> ;
        }
        else{
            content = <TvSeriesDetails id={state.id} modifyDetails={modifyDetails} /> ;
        }
        
    }
    else
    {
        content=<ul>
                    {searchList}
                </ul>
    }

    return (
        <div>
            {content}
        </div>
        
    )
};

export default SearchResult;