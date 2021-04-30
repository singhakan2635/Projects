export const checkSession = () => {
  return fetch('/api/session',  {
    method: 'GET',
  })
  .catch(convertNetworkError )
  .then (convertResponse);
};

export const createSession = ({username}) => {
  return fetch('/api/session',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch(convertNetworkError )
  .then (convertResponse);
};

export const endSession = () => {
  return fetch('/api/session',  {
    method: 'DELETE',
  })
  .catch(convertNetworkError )
  .then (convertResponse);
};

export const abilityToaddWhishlist = (id, media) => 
{

  return fetch('/wishlist',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ id, media }),
  })
  .catch(convertNetworkError )
  .then (convertResponse);

};

export const abilityToDeleteWishlist = (id,media) =>
{
  return fetch(`/wishlist`, {
    method: 'DELETE',
    headers:new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({id:id, media:media}),
  })
  .catch(convertNetworkError )
  .then (convertResponse);
}

export const abilityToGetWhishList = () => 
{

  return fetch('/wishlist', {
    method: 'GET'
  })
  .catch(convertNetworkError )
  .then (convertResponse);
};



export const abilityToGetUsername = () =>
{
  return fetch('/username', {
    method:'GET',
  })
  .catch(convertNetworkError)
  .then (convertResponse);
}

const convertNetworkError = () => Promise.reject({ error: "NETWORK_ERROR" });
  
const convertResponse = (response) => {

    if (response.ok) 
    {
      return response.json();
    }
    return response.json().then((err) => Promise.reject(err));
};
  


