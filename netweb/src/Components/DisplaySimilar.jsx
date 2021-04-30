import notAvailable from '../images/notFound.png';

const DisplaySimilar = ({ list, media, getDetails }) => {
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    const itemListing = list.map((item) => {
        let title;
        if (media === "tv") {
            title = item.name;
        }
        else {
            title = item.title;
        }
        let images;
        if (item.poster_path) {
            images = <img src={imgUrl + item.poster_path} alt={title} className="poster-img" />
        }
        else {
            images = <img src={notAvailable} alt={notAvailable} className="poster-img" />
        }

        return (
            <li key={item.id} className="list-item">
                <div className="item-similar-display">
                    {images}
                    <p className="movie-title">{title}</p>
                    <button onClick={() => getDetails(item.id)}>Details</button>
                </div>
                
            </li>
        )
    });

    return (
        <div className="listing-container">
            <ul className="top-list-item">
                {itemListing}
            </ul>
        </div>

    );
};

export default DisplaySimilar;