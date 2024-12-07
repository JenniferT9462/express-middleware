//Custom Middleware that logs headers
const logHeaders = ((req, res, next) => {
    console.log("Request Headers:", req.headers);
    next();
})

export { logHeaders };