export const genres = (list) =>
{
    const genreList = [];

    list.map( (item) => 
    {
        genreList.push(item.name+" ");
    })
    return genreList;
};