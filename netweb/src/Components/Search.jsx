import { useState, useContext } from "react";
import {ErrorContext, ContentState} from '../js/context';
import {fetchSearchByName} from '../js/movieDbServices';
import errors from '../js/errors';
import DisplayMovies from "./DisplayMovies";
import {FaSearch} from "react-icons/fa";

const Search =() => {

    const [searchData, setSearchData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [setError] = useContext(ErrorContext);
    
    const searchName = () => {
        setKeyword('');
        setError('');
        fetchSearchByName(keyword)
        .then( (data) => 
        {
            if(data.results.length===0)
            {
                setError(errors["LACK_KEYWORD"]);
            }
            else{
                setSearchData(data.results.slice(0,12));
            }
            
        })
        .catch((err) => 
        {
            setError(errors[err.error || err || "DEFAULT"]);
        })
    };
    const handleInput = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <div>
            <h2>Search For Favorite Movies</h2>
            <div className="search-wrap">
                <div className="search-container">
                    <input type="text" value={keyword} className="search-text"
                        placeholder="Search...."
                        onChange={(e) => handleInput(e)}/>
                     <button type="submit" className="search-button" disabled={!keyword} onClick={searchName}><FaSearch /></button>
                </div>

            </div>
                {searchData && <DisplayMovies movies={searchData} mediaType=""/>}
        </div>
    )
};

export default Search;