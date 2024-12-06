# express-middleware
## Overview

A guide to building a simple Express app that has custom middleware that logs requests and creating and using third-party middleware. 

## Setup

1. Create a directory `express-routing`:

        mkdir express-routing

2. Make sure to `cd` into the new directory:

        cd express-routing

3. Initialize a `Node.js` project:

        npm init -y

4. Install express:

        npm install express

5. Open new project in VSCode:

        code .

6. In the package.json file add `"type": "module"` to Enable ES Module Syntax (import/export).

## Server Implementation
* Create a file named `index.js`.
* In the index.js file import express:
    ```js
    import express from "express";

* To create a instance of express:
    ```js
    const app = express();

* Create a basic route at the root `/` path that returns welcome message, to make sure that the server is working. 
    ```js
    //Basic route at root URL
    app.get('/', (req, res) => {
        res.send("Welcome to Express Middleware!")
    })

* To start the server you need to add this to the server.js file at the bottom:
    ```js
    //Start the server
    app.listen(3000, () => {
        console.log("Example app listening on port 3000")
    })

## Middleware

Middleware in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next()`.

### Custom Middleware

* Create a simple logger middleware function. The function will log the `method`, `hostname`, `path` and `time` about each incoming request:

    ```js
    app.use((req,res,next) =>{
        req.time = new Date(Date.now()).toString();
        console.log(req.method,req.hostname, req.path, req.time);
        next();
    });

* Example output: GET localhost / Thu Dec 05 2024 22:11:35 GMT-0600 (Central Standard Time)   
* Place middleware function above all routes.

### Third-party Middleware

* For this guide I will be using `express-rate-limit`. To use this you have to install by running:

    ```js
    npm install express-rate-limit

* Import `rateLimit`:

    ```js
    import { rateLimit } from 'express-rate-limit'
* Make a new route with a path `/data` with a `POST` request:
    -  This will go below the middleware functions.
    ```js
    //Post handler
    app.post('/data', (req, res) => {
        const { name } = req.body;
        res.json({
            message: `Hello, ${name}!`,
            success: true,
        });
    });
 
* Modify the server to use express-rate-limit to limit requests to 3 per minute:
       
    ```js
    // express-rate-limit middleware
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // Per minute
        max: 3, // Max 3 requests per 1 minute
        //Displays JSON when reached limit
        message: {
            status: 429,
            error: "Too many requests, please try again later."
        },
         // Enables 'rateLimit' in the headers, 'draft-7' is the latest.
        standardHeaders: 'draft-7',
         // Standard now to set false, also related to headers
        legacyHeaders: false,.
    });

* Use the limiter middleware. For this guide I will be only using it for the `/data` path:

    ```js
    //Use rateLimit - before handlers - Only for '/data' path
    app.use('/data', limiter);

* Make sure you put the use code before routes and after the middleware function.

## Testing

### Nodemon

* nodemon allows us to make changes and updates in real-time instead of having to run `node index.js` again.

    - Install nodemon by running:

            npm install --save-dev nodemon

* Update the `package.json` file:

    * Note: That the file needs to match what you named your `.js` file.
    ```json
      "scripts": {
          "start": "node index.js",
          "dev": "nodemon index.js"
      }

* Now when we run `npm run dev` to start the server.

### Testing Custom Middleware

* When testing the custom middleware the terminal will log details of the request:
    ![custom middleware](<img/customMiddleware.png>)

### Testing `express-rate-limit`

* Testing in Postman and in the Devtools:
* Testing route for `/data`:
    - Endpoint: http://localhost:3000/data
    ![data post](<img/dataPost.png>)
* Testing headers that displays the rateLimits:
    ![headers](<img/headers.png>)
* Testing to see if after 3 request per minute JSON message:
    ![error message](<img/errorMessage.png>)

## Acknowledgments

- GeeksforGeeks - <https://www.geeksforgeeks.org/middleware-in-express-js/>
- Express website - <https://expressjs.com/en/guide/writing-middleware.html>
- Express Middleware - <https://retrodevs.medium.com/express-js-logger-middleware-a-quick-and-easy-guide-6b79a14ea164>
- Log API Request in Express - <https://huzaima.io/blog/log-api-requests-express>
- NPM express-rate-limit - <https://www.npmjs.com/package/express-rate-limit>