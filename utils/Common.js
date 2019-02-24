const makeTimeout = ms => new Promise(resolve => setTimeout(resolve, ms));


module.exports = {
    makeTimeout,
}