import express from 'express';
const app = express();

import { detailLogger } from './middleware/details.js';
import { logHeaders } from './middleware/logHeaders.js';
import { limiter } from './middleware/limiter.js';

//JSON Middleware - to parse JSON responses
app.use(express.json());

//Use detailLogger
app.use(detailLogger)
//Use logHeaders middleware function
app.use(logHeaders);
//Use rateLimit - before handlers - Only for '/data' path
app.use('/data', limiter);


//Routes
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