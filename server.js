const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const shortRouteToPages = {
  moscow: '/lat/55.744654/lon/37.624991/zoom/12',
  'nizhny-novgorod': '/lat/56.301011/lon/43.995229',
  arzamas: '/lat/55.386373/lon/43.817099',
  balakhna: '/lat/56.492938/lon/43.611212',
  bogorodsk: '/lat/56.101523/lon/43.516550',
  'bolshoe-murashkino': '/lat/55.781787/lon/44.774134',
  vyksa: '/lat/55.318686/lon/42.186628',
  gorbatov: '/lat/56.131309/lon/43.058318',
  lyskovo: '/lat/56.037971/lon/45.0478428',
  gorodets: '/lat/56.644823/lon/43.469353',
  dzerzhinsk: '/lat/56.238716/lon/43.461149',
  pavlovo: '/lat/55.963602/lon/43.070018',
}

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

Object.keys(shortRouteToPages).map((route) => {
  app.get(route, function(req, res) {
    res.redirect(shortRouteToPages[route]);
  });
});

app.listen(9000);
