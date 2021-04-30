import { useContext, useEffect, useState } from "react";
import {abilityToGetUsername} from '../js/services';
import { ErrorContext, ContentState } from "../js/context";
import ShowWishlist from "./ShowWishlist";
import errors from '../js/errors';
import { withRouter } from "react-router";

const Wishlist = ({id}) => 
{
    const [ username,setUsername] = useState('');
    const [setError] = useContext(ErrorContext);
    const [contentState, setContentState] = useContext(ContentState);
    const [state, setState] = useState(0);

    useEffect(() =>
    {
        setContentState({});
        abilityToGetUsername()
        .then(data =>
            {
                setUsername(data);
                setContentState({...contentState,id:data,remove:false});
                setError('');
                setState('');
            })
        .catch(err =>
            {
                setError(errors[err.error || err || "DEFAULT"]);
            })
        
    },[]);

    const loaddata = (id) => 
    {
        setContentState({...contentState,id:id,remove:true});

    }

    return (
        <div>
            <h2>Hi {username}, Here is Your Wishlisted Item</h2>
            {state}
            <ShowWishlist  display={username} loaddata={loaddata}/>
        </div>
    )
};

export default withRouter(Wishlist);