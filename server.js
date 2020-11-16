const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use('/_api/ru_monuments', createProxyMiddleware({
  target: 'https://tools.wmflabs.org/ru_monuments/monmap/api.php',
  changeOrigin: true,
}));

app.use('/_api/ru_monument_image', createProxyMiddleware({
  target: 'https://magnus-toolserver.toolforge.org/commonsapi.php',
  changeOrigin: true,
}));

// https://tools.wmflabs.org/heritage/api/api.php
app.use('/_api/heritage', createProxyMiddleware({
  target: 'https://heritage.toolforge.org/api/api.php',
  changeOrigin: true,
}));

app.use('/_api/heritage_info', createProxyMiddleware({
  target: 'https://ru_monuments.toolforge.org/wikivoyage1.php',
  changeOrigin: true,
}));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
