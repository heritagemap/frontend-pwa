const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/_api/ru_monuments',
    createProxyMiddleware({
      target: 'https://tools.wmflabs.org/ru_monuments/monmap/api.php',
      changeOrigin: true,
    })
  );

  app.use(
    '/_api/heritage',
    createProxyMiddleware({
      target: 'https://tools.wmflabs.org/heritage/api/api.php',
      changeOrigin: true,
    })
  );
};
