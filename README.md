# Photonest
 
## Link to live site

Hosted on Heroku: [Photonest](https://photonest.herokuapp.com/)

## Description

Photonest is a social-media platform where users can share, like and comment on images. It is a clone of Instagram.

## Index
| [Features List](https://github.com/jonevanmoore/photonest/wiki/Features-List) | [Database Schema](https://github.com/jonevanmoore/photonest/wiki/Database-Schema) | [User Stories](https://github.com/jonevanmoore/photonest/wiki/User-Stories) | [Wireframes](https://github.com/jonevanmoore/photonest/wiki/Wireframes) | [API Routes](https://github.com/jonevanmoore/photonest/wiki/API-Routes) | [Frontend Route](https://github.com/jonevanmoore/photonest/wiki/Frontend-Route)


## Technologies
<br>
<br>
<div style="display:flex">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" style="width:60px;" />
</div>
 
## Features

### Posts
* Users can create a new post with an image and a caption.
* Users can edit and delete posts
<img width="600" alt="Screen Shot 2022-05-19 at 3 09 46 PM" src="https://user-images.githubusercontent.com/64309316/169396624-dd7ba6de-8857-4094-9784-03a566c7b8c2.png">

### Post Likes
* Users can like and unlike each other's posts
<img width="600" alt="Screen Shot 2022-05-19 at 3 10 07 PM" src="https://user-images.githubusercontent.com/64309316/169396670-8fe84780-2988-4009-a7dd-921464275e2e.png">

### Comments
* Users can comment on posts
* Users can update comments on posts
* Users can delete comments

### Comment Likes
* Users can like and unlike each other's comments
<img width="600" alt="Screen Shot 2022-05-19 at 3 18 49 PM" src="https://user-images.githubusercontent.com/64309316/169397494-f7762983-5b4c-43ee-b129-2c9b8213dda5.png">





## Getting Started

To run Photonest locally, please follow these steps:

### DISCLAIMER: you must be able to create an AWS S3 bucket in order to properly store image files that are uploaded to the site. Upload functionality will not work without it

<li>Clone the repository with:</li> 

  ```git clone https://github.com/jonevanmoore/photonest.git```

<li>Create a database and database user. If using psql, the commands would be:</li>

  ```psql```
  <br>
  ```CREATE USER photonest_app WITH PASSWORD <password> CREATEDB;```
  <br>
  ```CREATE DATABASE photonest_dev WITH OWNER photonest_app;```

<li>Navigate to the backend folder and install python packages:</li>

  ```pipenv install```
  <br>
  ```pipenv shell```

<li>Create and seed database with: </li>

  ```flask db upgrade```
  <br>
  ```flask seed all```

<li>Start the server with:</li>

  ```flask run```

<li>Next, navigate to the react-app folder and run: </li>

  ```npm install```

<li>Start the app with: </li>

  ```npm start```

<li>You should now have Photonest running locally!</li>

## Future Features

<li>Follows</li>
<li>Messages</li>
<li>Notifications</li>

