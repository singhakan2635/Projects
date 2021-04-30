import {abilityToDeleteWishlist} from '../js/services';
import errors from '../js/errors';
import { useContext} from "react";
import {ErrorContext, ContentState} from '../js/context';
import { useHistory } from 'react-router';

const RemoveFromWishlist = ({id, media, loaddata}) => 
{
    const [setError] = useContext(ErrorContext);
    const [contentState, setContentState] = useContext(ContentState);
    const history = useHistory();

    const handleButton = () => 
   {
        abilityToDeleteWishlist(id, media)
        .then ( () =>
        {
            setContentState({...contentState,id:id});
            loaddata();
                       
        })
        .catch(err => 
        {
            setError(errors[err.error || err || "DEFAULT"]);
            
        });
   };
    return (
        
        <div>
            <button onClick={handleButton}>Remove from Wishlist</button>
        </div>
        
    )
};

export default RemoveFromWishlist;