const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log(process.env.REACT_APP_PROXY)
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_PROXY || 'http://localhost:8080',
            changeOrigin: true,
        })
    );
}; 