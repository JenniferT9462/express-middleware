import express from 'express';
const app = express();
//import third-party middleware
import { rateLimit } from 'express-rate-limit';

//JSON Middleware - to parse JSON responses
app.use(express.json());

//Custom Middleware that logs incoming request
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString(); //Current time
    console.log(req.method, req.hostname, req.path, req.time); //Output: GET localhost / Thu Dec 05 2024 21:24:24 GMT-0600 (Central Standard Time) 'method hostname path time'
    next();
});

//express-rate-limit middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, //Per minute
    max: 3, //Max 3 requests per 1 minute
    message: {
        status: 429,
        error: "Too many, requests, please try again later."
    }, //Displays JSON when reached limit
    standardHeaders: 'draft-7', //This enables 'rateLimit' in the headers, 'draft-7' is the latest.
    legacyHeaders: false, //It is standard now to make false, also to do with headers.

})

//Use rateLimit - before handlers - Only for '/data' path
app.use('/data', limiter);

app.get('/', (req, res) => {
    res.send("Welcome to Express Middleware!")
})

//Post handler
app.post('/data', (req, res) => {
    const { name } = req.body;
    res.json({
        message: `Hello, ${name}!`,
        success: true,
    });
 });


 //Start the server
 app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})