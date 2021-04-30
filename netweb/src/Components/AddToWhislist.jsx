import { useContext } from "react";
import { ErrorContext, ContentState, WistlistState } from '../js/context';
import { abilityToaddWhishlist } from '../js/services';
import errors from '../js/errors';
import { useHistory } from "react-router";

const AddToWhishlist = ({ id, media }) => {
    const [setError] = useContext(ErrorContext);
    const [newwishlist, setnewwishlist] = useContext(WistlistState);
    const [contentState, setContentState] = useContext(ContentState);
    const history = useHistory();


    const handleButton = () => {
        abilityToaddWhishlist(id, media)
            .then((data) => {
                setnewwishlist('Added to Wishlist!');
                setContentState({ ...contentState, message: "Added to Wishlist!", id: id });
            })
            .catch(err => {
                setError(errors[err.error || err || "DEFAULT"]);
            });
    };

    const handleWishList = () => {
        history.push('/Wishlist');
    }

    return (
        <div>
            <div>
                <div className="add-to-wishlist">
                    <button onClick={handleButton}>Add To Wishlist</button>
                    <div className="show-message">
                        {newwishlist}
                    </div>
                </div>
                <button onClick={handleWishList}>Show Wishlist</button>
            </div>
        </div>
    )
};

export default AddToWhishlist;