const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/allcompanies',
        createProxyMiddleware({
            target: 'https://sangrah-29z9.onrender.com',
            changeOrigin: true,
        })
    );
};