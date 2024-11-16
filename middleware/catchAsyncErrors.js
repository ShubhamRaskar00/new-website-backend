module.exports = (err) => (req,res,next) => {
    Promise.resolve(err(req, res, next)).catch(next);
}