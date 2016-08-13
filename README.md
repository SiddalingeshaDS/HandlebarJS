# Weights And Measures

This is a practice application to understand and develop various web development technologies.

# Application Details

An application that can be used by museums.

# Objectives

1. Create a project structure and workflow using gulp/npm.
2. Use Handlebar to develop templates 
3. Build the application in offline first methodology using service workers.

# Credits

1. The primary source of learning for the project structure and codebase is from the 'wittr' applicaiton developed in the Udacity Offline first course
2. The templates are inspired from the newMuseum.org website.

# Installing

Dependencies:

* [Node.js](https://nodejs.org/en/) v0.21.7 or above

Then check out the project and run:

```sh
npm install
```

# Running

```sh
npm run serve
```

You should now have the app server at [localhost:8888](http://localhost:8888) and the config server at [localhost:8889](http://localhost:8888).

You can also configure the ports:

```sh
npm run serve -- --server-port=8000 --config-server-port=8001
```