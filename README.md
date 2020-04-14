# Heritagemap

Интерфейс для проекта Карта культурного наследия

![deploy](https://github.com/heritagemap/frontend-pwa/workflows/deploy/badge.svg)

* [Описание проекта](https://docs.google.com/document/d/1bpw8FTeO7qaeNl80i2_HYv3d5WKvQmDGtj2CVA8BvcI/edit?usp=sharing)<br>
* [Макеты](https://www.figma.com/file/vODnoP8IgmbJ67nAoON4qE/heritagemap.ru-%2F-layouts)<br>

Домен: http://heritagemap.ru/

## Запуск проекта

```
npm ci
npm start
```

## Деплой

Проект автоматически выкатывается при пуше в master на https://heritagemap.github.io/frontend-pwa/

## API

Список страниц: https://tools.wmflabs.org/ru_monuments/monmap/api.php?query=list-pages&prefix=%D0%9A%D1%83%D0%BB%D1%8C%D1%82%D1%83%D1%80%D0%BD%D0%BE%D0%B5_%D0%BD%D0%B0%D1%81%D0%BB%D0%B5%D0%B4%D0%B8%D0%B5_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8

Информция с каждой отдельной страницы: https://tools.wmflabs.org/ru_monuments/monmap/api.php?query=get-page-data&page=%D0%9A%D1%83%D0%BB%D1%8C%D1%82%D1%83%D1%80%D0%BD%D0%BE%D0%B5_%D0%BD%D0%B0%D1%81%D0%BB%D0%B5%D0%B4%D0%B8%D0%B5_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8/%D0%90%D0%BB%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D1%80%D0%B0%D0%B9/%D0%91%D0%B0%D1%80%D0%BD%D0%B0%D1%83%D0%BB&items=monuments&fields=name,knid,address
