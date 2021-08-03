// pull all our files every 300'ms ( to resolve the problem of next dont refresh the new changes always as it should )
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300
        return config
    }
}
