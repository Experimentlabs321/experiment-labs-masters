// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/', // Change this to the URL path you want to proxy
    createProxyMiddleware({
      target: 'https://api.zoom.us/v2', // Your Zoom API base URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the "/api" prefix when forwarding requests
      },
    })
  );
};