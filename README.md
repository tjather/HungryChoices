# HungryChoices

HungryChoices aims to match users with dishes based on food preferences so that they never have to worry about finding what to eat. In the style of a dating app, this website takes a user's profile and discovers dishes that are a close fit. If users find themselves unable to choose what to cook or eat, they can simply log into the website and start looking for matches based upon a number of criteria, such as region, dietary restrictions, or key ingredients. However, before users are allowed to use such search features, they must create an account which is backed by a database to hold their information. Thus, when they log out of their account, their old preferences will be saved. Next time this user logs back in, they can then continuee matching without having to reselect all of their preferences again. 

More than just a dating web application, users can also look through options based upon filters and browse all the options that are available to them, provided by a food API. This allows users to also discover food options on their own without having to match with the dish. If neither of these options proves sufficient for determining what to eat, the website can pick a choice for the user. When the user eventually finds a dish they are fond of, they can save the dish by liking it and it will be saved to their account so they can quickly access the dish at a later time. When users find themselves hungry, yet unsure what to eat, HungryChoices is the number one stop for them.

## Project Structure
### Project Overview
Project demo and use case diagram are stored here.

### Project Code
All of the project's code is stored here.

#### db
The Postgres database setup files for deployment to Heroku are stored here.

#### heroku
The Heroku CLI files needed for deployment are stored here.

#### init_data
When starting the Postgres database, the tables and data are created as needed from the files in this folder.

#### resources
The page resources such as the styling, javascript, and images are located here.

#### sessions
User sessions are stored here.

#### test
The test cases for our project are located here.

#### views
The pages and partial ejs files are stored here.

#### Dockerfile and docker-compose.yml
These are the docker config files for the containerization and running of the Docker images of our project.

#### server.js
This is the Node.js server logic.
  
## Proposed Architure
On the back end, we will be using PostgreSQL as our database to store things like user profiles, preferences, matches, and liked foods. On the front end, our website will be made with HTML and CSS with Bootstrap to help stylize it. We will use Node.js to create the back-end framework of our website, including the communication between the front and back-end database. It will also help with the website’s functions, like swiping left or right on different foods to create dynamic page content.

## How to Run The Project
In order to run the project, first clone the repository. Then, in your preferred terminal, navigate into the "Project Code" folder and run `docker-compose up` to start the project locally.
