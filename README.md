<img src="/assets/app-images/camera.png" align="right" />

# Snapagram --- Photo Sharing Application [![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/samirdhebar/photo-sharing-app/master/LICENSE.md)
A group project between [Samir Dhebar](https://github.com/samirdhebar) and [Gabe Arnold](https://github.com/GabeSArn). A photo sharing application that allows users to comment on, like and upload pictures.

## Installation Instructions
You must be on a Node version greater than 6 to use this. Once you've npm
installed, there is only one command:

* `npm run start` - Runs the server locally (Specify port with PORT, default 9000, i.e. http://localhost:9000)

## Data Models
### 'users'

| Column                | Type                 |
|-----------------------|----------------------|
|`id`                   | INTEGER (PRIMARY KEY)|
|`user`                 | STRING (NOT NULL)    |
|`password`             | STRING (NOT NULL)    |

### 'photos'

| Column                | Type                 |
|-----------------------|----------------------|
|`id`                   | INTEGER (PRIMARY KEY)|
|`user`                 | STRING (NOT NULL)    |
|`password`             | STRING (NOT NULL)    |



## routes
### GET '/'
| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* If a user is logged in, it displays a page with the photos of other users that they can like or comment on
* If no user is logged in, redirects to home page

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
