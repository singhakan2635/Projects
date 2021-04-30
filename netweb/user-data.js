const users = {};

const createOrCheckUser = (username) => {
    if(!users[username])
    {
        users[username] = {
            movies : [],
            shows : []
        }
    }
    return true;
}

const addToWhsihlist = (id, username ,media) => 
{
    if(checkduplicateId(id, username,media))
    {
        return "duplicate";
    }
    if(media==="movies")
    {
        users[username].movies.push(id);
    }
    else if (media==="tv")
    {
        users[username].shows.push(id);
    }
    return "added";
    
}
const deletewishlist = (id, username, media) => 
{
    if(media==="movie")
    {
        for(let i=0;i<users[username].movies.length; i++)
        {
            if(users[username].movies[i]===id)
            {
                users[username].movies.splice(i,1);
                return true;
            }
        }
    }
    else
    {
        for( let i=0; i< users[username].shows.length; i++)
        {
            if(id===users[username].shows[i])
            {
                users[username].shows.splice(i,1);
                return true;
            }
        }
    }
    return false;
    
}
const checkduplicateId = (id, username, media) => 
{
    if(media==="movies")
    {
        for( let i=0; i< users[username].movies.length; i++)
        {
            if(id===users[username].movies[i])
            {
                return true;
            }
        }
    }
    else if (media==="tv")
    {
        for( let i=0; i< users[username].shows.length; i++)
        {
            if(id===users[username].shows[i])
            {
                return true;
            }
        }
    }
    
    return false;
}


module.exports = { users, createOrCheckUser, addToWhsihlist, deletewishlist};