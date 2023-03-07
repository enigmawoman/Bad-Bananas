# 21 MERN: Book Search Engine

Refactoring code to take a database from using RESTful APIs to using a GraphQL API built with Apollo Server.

---

**Table of Contents:**

* [Description](#description)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Testing](#testing)
* [Using the code](#using-the-code)
* [PWA text editor deployment](#pwa-text-editor-deployment)
    * [Deployment Link](#deployment-link)
    * [Screenshot of application](#screenshot-of-deployed-application)
* [Usage](#usage)
* [License](#license) 
* [Questions](#questions)

---

## Description

Taking pre-existing code for a book search application and refactoring the code to take the database from using RESTful APIs to using a GraphQL API built with Apollo Server. This application is built using the MERN stack, which includes the following frameworks, MongoDB, Express.js, React and Node.js.


## User Story


* AS AN avid reader
* I WANT to search for new books to read
* SO THAT I can keep a list of books to purchase



## Acceptance Criteria


* GIVEN a book search engine
* WHEN I load the search engine
* THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
* WHEN I click on the Search for Books menu option
* THEN I am presented with an input field to search for books and a submit button
* WHEN I am not logged in and enter a search term in the input field and click the submit button
* THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
* WHEN I click on the Login/Signup menu option
* THEN a modal appears on the screen with a toggle between the option to log in or sign up
* WHEN the toggle is set to Signup
* THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
* WHEN the toggle is set to Login
* THEN I am presented with two inputs for an email address and a password and login button
* WHEN I enter a valid email address and create a password and click on the signup button
* THEN my user account is created and I am logged in to the site
* WHEN I enter my account’s email address and password and click on the login button
* THEN I the modal closes and I am logged in to the site
* WHEN I am logged in to the site
* THEN the menu options change to Search for Books, an option to see my saved books, and Logout
* WHEN I am logged in and enter a search term in the input field and click the submit button
* THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
* WHEN I click on the Save button on a book
* THEN that book’s information is saved to my account
* WHEN I click on the option to see my saved books
* THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
* WHEN I click on the Remove button on a book
* THEN that book is deleted from my saved books list
* WHEN I click on the Logout button
* THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  





Challenges in this project: biggest challenge with this project, was getting used to making sure i cleared the cache before running up the appication after every code change. I enjoyed learning how PWAs work and how you can implement idb database and caching to enable apps to function even while offline.


## Installation

Start by downloading the code from the repository, then load in VS code, open a terminal and make sure you are in the project folder.
Initialise the code by typing into the terminal:
```bash
npm i
```

## Using the code

To initialise the code you will need to run the following commands in the terminal to run up the program:

- To get the code running locally in development mode you will need to enter into the terminal:
```bash
npm run develop
```
and go to

```bash
localhost:3000
```

Once you have finished using the code, be sure to run *(ctrl+C)* or *(^C)* to close down the session.

The code files are fully commented, to explain the flow and logic of the code, so that others can work on this and expand on it too.


## Book Search Engine deployment.

### Deployment Link.

<a href="https://enigmawoman-mern-book-search.herokuapp.com/"><b>Deployed book search engine link</b></a>

### Screenshot of deployed application

![Screenshot of deployed site](./server/assets/images/enigmawoman-mern-book-search.herokuapp.com.png)


## Usage

This code can be used as an example of how to build a web application with the MERN stack using the technologies layed out in the description, if you have any questions or suggestions, please let me know using the links in the [questions](#questions) section of this README.

## License

NA

## Questions

If you have any questions, reach out [@enigmawoman](https://github.com/enigmawoman)</br>



