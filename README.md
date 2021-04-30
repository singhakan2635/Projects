# NETWEB

Netweb is an online application with all kinds of **Movies** and **TvSeries**. When you click on detail, it will give the detailed information about the movie/show including the poster, name, genre, tagline and overview. 

## Features

 * We have an option of getting the details of the movies or tv series by clicking on the `Detail` button.
 * Every content shown on the main pages, contains name, rating and detail button
 * Once we are on detail page, we have options like `Add to wishlist`, `Show wishlist` , `Go back` to previous page (or Main Components).
 * In addition to these buttons, every detail page will show the similar movies or shows based on the id of the content visible on the detail.
 * If we click on detail button in similar section, it will take us to the detail section again and will show the new list of similar content based on the selection.
 * We can add to wishlist or we can remove from the wishlist.
 * If we click twice on add to wishlist, it will throw error as it was already added in wishlist.
 * We can search any movie or tvseries based on keyword.

## Content

### Home
 * Shows the list of top 18 trending movies and tvseries for this week.
 * Once clicked on detail , it will take us to respective movie or tvseries detail section.
 * In case we are on detail component, to access the home page again, we need to click `GO BACK` everytime.

### Movies
 * Shows the list of top 12 most popular movies currently.

### TvSeries
 * Shows the list of top 12 most popular tvseries currently.

### Wishlist
 * Shows the list of wishlisted item based on the user 
 * we can either see the details or remove can remove the wishlisted item from the list

### Search
 * Type the keyword for movies or tvshow and click on the search button 
 * All the 12 serach result have option of details

## User Credential
 * User can login entering the username but the username "dog" or empty string is not allowed
 * Once logged in , user has option of logout button on the page

## How to run application
 For the project to start, you can run: `npm install` & `npm start`

## API and trademark
 https://www.themoviedb.org/. The terms of use as in https://www.themoviedb.org/terms-of-use are followed strictly.