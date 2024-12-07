//import third-party middleware
import { rateLimit } from 'express-rate-limit';

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

export { limiter };