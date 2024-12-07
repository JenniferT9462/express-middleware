//Custom Middleware that logs incoming request
const detailLogger = ((req, res, next) => {
    req.time = new Date(Date.now()).toString(); //Current time
    console.log(req.method, req.hostname, req.path, req.time); //Output: GET localhost / Thu Dec 05 2024 21:24:24 GMT-0600 (Central Standard Time) 'method hostname path time'
    next();
});

export { detailLogger }