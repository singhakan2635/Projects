import ShowSimilar from "./ShowSimilar";
import BackToHomeButton from "./BackToHomeButton";
import AddToWhishlist from './AddToWhislist';
import SimilarTVShows from './SimilarTvShows';
import notAvailable from '../images/notFound.png';

const DisplayDetails = ({details, modifyDetails, media}) => 
{

    let content;
    if(media==="movies")
    {
        content = (
            <div>
                <h2>Movies Similar To This</h2>
                <ShowSimilar id={details.id} modifyDetails={modifyDetails} />
            </div>
        )
    }
    else
    {
        content =(
            <div>
                <h2>TvSeries Similar To This</h2>
                <SimilarTVShows id={details.id} modifyDetails={modifyDetails} />
            </div>
        )
    }
    const imgUrl = "https://image.tmdb.org/t/p/w500";
    let images;
    if(details.PosterUrl)
    {
        images = <img src={imgUrl + details.PosterUrl} alt={details.Title} className="details-poster-img" />
    }
    else{
        images = <img src={notAvailable} alt={notAvailable} className="details-poster-img" />
    }
    
    return (
        <div>
            <div className="details-container" >

                <div className="details-main">
                    {images}
                    <div className="details-view">
                        <div className="details-title">
                            <h2>{details.Title}</h2>
                        </div>
                        <div className="">
                            <div className="details-genre">
                                <p>Genres: {details.Genres}</p>
                            </div>
                            <div>
                                <p className="details-tagline">{details.Tagline}</p>
                            </div>
                            <div className="details-overview">
                                <h3>Overview:</h3>
                                <p>{details.overview}</p>
                            </div>
                            <div>
                                <p>Released Date: {details.Year}</p>
                            </div>
                            <div>
                                <AddToWhishlist id={details.id} media={media} />
                            </div>
                            <BackToHomeButton modifyDetails={modifyDetails} />
                        </div>
                    </div>

                </div>
                
            </div>
            {content}
        </div>

    );
};

export default DisplayDetails;