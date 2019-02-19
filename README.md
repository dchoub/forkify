#Forkify

# Author
  Dhwani Choubisa

# Architecture
 MVC (Model-View-Controller) architecture is used to create the website and divided the application into three interconnected parts

# Bundler 
 Webpack

# About Forkify  
 Forkify is the website which consumes the API from https://www.food2fork.com for searching the recipe as per search criteria. You can search for any recipe, add that to like menu and also add the recipe to shopping list.

# Folder structure 
Followed the MVC architecture and created seperate folders for Model, View  and index.js as controller file.

# Functionality  
 - Search the recipe by calling https://www.food2fork.com API (used axios module for calling api)
 - Show the 10 recipe per page and add pagination accordinly
 - Show Spinner while page is loading
 - Select the recipe and show the details view
 - Highlight the selected recipe
 - Calculate the servings as per counts and units
 - Add the recipe to shopping list
 - Delete the recipe from shopping list
 - Increase or decrease the quanity in shopping list
 - Add recipe to liked menu
 - Add liked recipe to local stoarge so that on page load liked recipe should not get lost
 
# How to Set up 
- Node js and npm should be installed in your machine
- Take a git clone
- Run npm install command to install all the node module
- Create a account on https://www.food2fork.com and get the key
- Add the key in \src\js\config.js file
- Run the npm run start command in terminal to start the server
- Search for any recipe ex. Pizza by entering and clicking on search icon
