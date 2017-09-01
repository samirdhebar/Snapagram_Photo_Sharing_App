<img src="/assets/app-images/camera.png" align="right" />

# Snapagram --- Photo Sharing Application [![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/samirdhebar/photo-sharing-app/master/LICENSE.md)
A group project between [Samir Dhebar](https://github.com/samirdhebar) and [Gabe Arnold](https://github.com/GabeSArn). A photo sharing application that allows users to comment on, like and upload pictures.

## Installation Instructions
You must be on a Node version greater than 6 to use this. Once you've npm
installed, there is only one command:

* `npm run start` - Runs the server locally (Specify port with PORT, default 9000, i.e. http://localhost:9000)

## Data Models
### 'users'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`username`             | STRING(100) (NOT NULL)(UNIQUE)  |
|`password`             | STRING(1000) (NOT NULL)         |

* ONE to MANY relationship with photos
* ONE to MANY relationship comments

### 'photos'

| Column                | Type                      |
|-----------------------|---------------------------|
|`id`                   | INTEGER (PRIMARY KEY)     |
|`size`                	| INTEGER (NOT NULL)        |
|`originalName`         | STRING (NOT NULL)         |
|`mimeType`             | STRING (NOT NULL)         |
|`description`          | STRING (500)              |

* ONE to MANY relationship with photos comments
* MANY to MANY relationship with tags
* ONE to MANY relationship with photoLikes
* MANY to ONE relationship with users

### 'comments'

| Column                | Type                   |
|-----------------------|------------------------|
|`id`                   | INTEGER (PRIMARY KEY)  |
|`text`                 | STRING (NOT NULL)(250) |

* MANY to ONE relationship with photos
* MANY to ONE relationship with user
* ONE to MANY relationship with commentLikes



### 'tags'

| Column                | Type                         |
|-----------------------|------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)        |
|`name`                 | STRING (NOT NULL)(UNIQUE)    |

* MANY to MANY relationship with photos


### 'Likes'

| Column                | Type                                |
|-----------------------|-------------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)(AUTOINCREMENT)|

* MANY to ONE relationship with photos


### 'commentLikes'

| Column                | Type                               |
|-----------------------|------------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)(AUTOINCREMENT|

* MANY to ONE relationship with comments





## Routes

### GET `/`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* If logged in, displays a page with other users photos to like or comment on, in addition to tags which relate to the photo
* If no user is logged in, redirects to login page


### POST `/`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `comment`             | Text input for a user to enter in comments about a photo                                    |
| `photoLike`           | Indicator of a photo being liked by another user                                            |
| `commentLike`         | Indicator of a photo being liked by another user                                            |

* Endpoint for submitting a comment, "like" on a photo, or "like" on a comment of a photo

### GET `/login`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* Displays a login form which has fields to verify a username and password
* Upon success, redirects 'to photomatic'
* Provides a link to signup page if user does not have an account


### POST `user/login`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `username`            | Username input to verify account                                                            |
| `password`            | Password input to verify account                                                            |

* Endpoint for submitting an account creation post form
* Upon success, redirects to `/user`

### GET `user/signup`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* Displays a page with a signup form for creating an account with a username and password.

### POST `/user/signup`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `username`            | User name created to assign to account.                                                     |
| `password`            | Password created to sign into acount.                                                       |

* Endpoint for submitting an account creation post form
* Upon success, redirects to `/`


### GET `/user`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `user`         	| Specifies which user is being displayed based on the user logged into the session           |

* Displays a page with a user and the photos which they have submitted
* If the user isn't logged into a session, redirects back to 'user/login'

### POST `/user/post`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `photo`               | Photo to be posted to the application by the user                                           |
| `description`         | Description to be associated to the photo being posted.                                     |
| `tag`                 | Tag to be associated to the photo being posted, based on a specified topic                  |

## Project Organization

```
.
├── app.js                    # Main entry point of the app
├── assets                    # Where public-access static files live
│   ├── css                   # Where site styles live
│   └── images                # Where user uploaded files live
├── middleware                # Where all reusable middleware live
├── models                    # Where all of the Sequelize models live   
├── Routes                    # Where router files live
├── util                      # Common use functionality lives here
│   ├── renderTemplate.js     # Helper function for rendering template.ejs
│   └── sql.js                # Sequelize instance and configuration
├── views                     # EJS files for rendering live here
│    └── pages                # Where each individual page is kept
│    └── template.ejs         # Main template file
```


## Technology Used
<img src="assets/app-images/node.png" align= "center" /> <br><br>  
* Node is a multi-platform, open-source Javascript run-time environment that executes code on the server-side.
<br><br>

<img src="assets/app-images/express.png" align="left" /> <br><br>
* Express is a web application framework for Node.js which acts as its de facto standard server framework
<br><br>
<img src="assets/app-images/postgres.png" align="left" /> <br><br><br><br>
* PostgreSQL is an object-relational database management system which stores and fetches data securely in response to requests from other software applications.
<br>

 * [Markdown Editor](https://github.com/jbt/markdown-editor) for Github-flavored Markdown editing

## Inspiration:
* [Instagram](https://www.instagram.com)


## Contribute

* Contributions are always welcome!
Please read the [contribution guidelines](Contributing.md) first.

## License
* This Instagram-inspired project is available the under the [MIT License](https://github.com/samirdhebar/Price-Buzz/blob/master/LICENSE.md).
