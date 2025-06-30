# Task_Manager

### Introduction
Task Manager is a Web Application that helps user manage their task

###  Features
* Users can Signup and Login into thier accounts.
*  Create,delete,update and read task.


### Installation Guide 
* Clone this repostory....
* The master branch is the most stable branch.
* Run npm install to install all dependencies.
* Configure your MongoDB to the application entry point
* Create an .env file in the root of your project folder and add variable. using .env.example


###  Usage
* Run npm start to start the application.

### API Endpoints
|HTTP Verbs |Endpoints|Action|
|---|---|---|
|post | /api/v1/user/register |register Route |
|post | /api/v1/user/login |login Route |
|get | /api/v1/user/logout |logout Route |
|post | /api/v1/task |create task Route |
|get | /api/v1/task |read task  Route |
|get | /api/v1/task/:id |read specific task Route |
|patch | /api/v1/task/:id |update task Route  |
|delete | /api/v1/task/:id|Delete task Route |

###  Documentation
* [Documentation](https://documenter.getpostman.com/view/28936241/2sB2xECoxV)




### Technology Used
* [Node](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Authors
##### EMMANUEL KOSISOCHUKWU EZEOYIRI

