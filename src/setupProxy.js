const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/_api',
    createProxyMiddleware({
      target: 'https://tools.wmflabs.org/ru_monuments/monmap/api.php',
      changeOrigin: true,
    })
  );
};
