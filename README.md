# NOIR STUDIO

Простой и быстрый landing page для портфолио/визитки. Структура разделена на:

- `index.html` — каркас страницы
- `assets/css/style.css` — стили, тема, адаптивность
- `assets/js/main.js` — рендер контента, тема, анимация
- `assets/data/content.json` — тексты, изображения, список услуг и проектов

## Как редактировать контент

Откройте `assets/data/content.json` и меняйте:

- `site.brand`
- `hero.title`, `hero.lead`, `hero.image`
- `about.title`, `about.text`
- `portfolio` — массив проектов
- `services` — массив услуг
- `contacts.email`

## Как редактировать дизайн

Меняйте переменные в `assets/css/style.css`:

- `--bg`
- `--text`
- `--gold`
- `--primary`
- `--secondary`
- `--accent`

## Быстрые правила

- Старайтесь использовать WebP/сжатые картинки.
- Для новых проектов добавляйте объект в массив `portfolio`.
- Для новых услуг добавляйте объект в массив `services`.
- Не меняйте ID элементов в `index.html`, если не уверены, что понимаете, как работает `main.js`.

## GitHub Pages

Репозиторий подходит для GitHub Pages прямо из ветки `main`.
