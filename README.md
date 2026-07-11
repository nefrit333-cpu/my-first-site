# Dmitriy Web — учебный сайт-портфолио

![Превью проекта](assets/preview.svg)

![HTML](https://img.shields.io/badge/HTML-структура-orange)
![CSS](https://img.shields.io/badge/CSS-адаптив-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-интерактивность-yellow)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)
![Prettier](https://img.shields.io/badge/Prettier-formatting-pink)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-checks-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v2.9-blue)

Учебный сайт-портфолио начинающего frontend-разработчика. Проект развивается через реальные задачи, отдельные feature-ветки, Pull Request, автоматические проверки и релизы.

## Ссылки

- [Открыть сайт-портфолио](https://nefrit333-cpu.github.io/my-first-site/)
- [Открыть учебный лендинг услуги](https://nefrit333-cpu.github.io/my-first-site/landing.html)
- [Открыть репозиторий](https://github.com/nefrit333-cpu/my-first-site)
- [Открыть релиз v2.9](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.9)

## Текущая версия

```text
v2.9 — Форма, FAQ, доступность и производительность лендинга
```

## Стек

- HTML
- CSS
- JavaScript
- Git
- GitHub
- GitHub Pages
- npm
- Prettier
- GitHub Actions
- Formspree

## Что реализовано

### Сайт-портфолио

На главной странице есть:

- адаптивная верстка
- desktop- и mobile-навигация
- переключение светлой и тёмной темы
- единый логотип `Dmitriy Web`
- главный экран
- блок “Обо мне”
- блок “Навыки”
- блок проектов
- FAQ-аккордеон
- модальные окна проектов
- контактная форма
- отправка формы через Formspree
- клиентская валидация
- защита от простых ботов
- кнопка возврата наверх
- focus-состояния
- SEO meta-теги
- Open Graph
- Twitter Card
- favicon
- robots.txt
- sitemap.xml

### Учебный лендинг услуги

Отдельная страница посвящена услуге:

```text
Создание сайта для малого бизнеса
```

Лендинг содержит:

- первый экран с оффером
- CTA-кнопки
- технологические теги
- блок целевой аудитории
- блок преимуществ
- блок “Что входит”
- этапы работы
- блок доверия
- интерактивный FAQ
- форму заявки
- footer
- мобильную навигацию
- кнопку возврата наверх
- skip-link для перехода к содержимому

Файлы лендинга:

```text
landing.html
landing.css
landing.js
```

## Релиз v2.9

Релиз объединяет три содержательных этапа развития лендинга.

### 1. Форма и мобильный интерфейс

Форма лендинга умеет:

- проверять имя, email и сообщение
- показывать ошибки под конкретными полями
- очищать ошибку при вводе
- переводить фокус в первое поле с ошибкой
- управлять `aria-invalid`
- связывать поля и ошибки через `aria-describedby`
- показывать состояние `Отправляем...`
- собирать данные через `FormData`
- отправлять данные через `fetch`
- обрабатывать успешную и неуспешную отправку
- очищаться только после успешной отправки
- сохранять данные при ошибке
- использовать honeypot
- передавать служебные поля `_subject`, `source` и `page`

Мобильная версия получила:

- улучшенную шапку
- бургер-меню
- автоматическое закрытие меню при прокрутке
- закреплённый бургер после начала прокрутки
- одинаковые поля секций
- стабильную сетку карточек
- исправление исчезающих и сжимающихся карточек
- отдельные фоны секций
- улучшенные CTA-кнопки
- обновлённый footer
- прозрачную кнопку возврата наверх

Проверялись ширины:

```text
320px
375px
390px
414px
430px
768px
```

### 2. Интерактивный FAQ и премиальные метки

FAQ лендинга:

- построен на кнопках
- открывает один ответ за раз
- закрывается повторным нажатием
- закрывается при открытии другого вопроса
- закрывается при клике вне FAQ
- закрывается клавишей `Escape`
- работает через клавиатуру
- обновляет `aria-expanded`
- использует `aria-controls`
- обновляет `aria-hidden`
- использует `role="region"`
- сохраняет ответы доступными без JavaScript
- учитывает `prefers-reduced-motion`

Обновлены метки разделов:

```text
Учебный commercial landing
Услуга
Преимущества
Что входит
Этапы
Доверие
FAQ
Заявка
```

Для них добавлены:

- полупрозрачные фоны
- мягкие границы
- аккуратные тени
- градиентный индикатор
- лёгкий блик
- hover-эффект на desktop
- active-состояние на mobile
- отдельное оформление для тёмных секций без яркой заливки

### 3. Доступность и производительность

Добавлено и улучшено:

- skip-link “Перейти к основному содержимому”
- идентификатор основного содержимого
- заметные `focus-visible` состояния
- перевод фокуса на первый пункт открытого мобильного меню
- возврат фокуса на бургер после закрытия через `Escape`
- исключение закрытого меню из Tab-навигации
- управление `aria-expanded` и `aria-hidden`
- поддержка `inert`
- fallback через `tabindex`
- единый цикл обновления интерфейса через `requestAnimationFrame`
- кэширование состояний шапки и кнопки наверх
- обновление DOM только при смене состояния
- оптимизированный resize FAQ
- ограничение тяжёлых hover-эффектов устройствами с мышью
- отключение декоративных анимаций через `prefers-reduced-motion`

На странице портфолио FAQ теперь также закрывается при клике по пустому месту или другому разделу.

## Доступность

Интерфейс поддерживает:

- `Tab`
- `Shift + Tab`
- `Enter`
- `Space`
- `Escape`
- видимые focus-состояния
- focus trap модального окна
- возврат фокуса после закрытия
- `aria-expanded`
- `aria-controls`
- `aria-hidden`
- `aria-current`
- `aria-describedby`
- `aria-invalid`
- `aria-live`
- `prefers-reduced-motion`

## Структура проекта

```text
my-first-site/
├── .editorconfig
├── .gitignore
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   │   └── format-check.yml
│   └── pull_request_template.md
├── .prettierignore
├── .prettierrc
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── assets/
│   └── preview.svg
├── favicon.svg
├── index.html
├── landing.css
├── landing.html
├── landing.js
├── package-lock.json
├── package.json
├── projects.css
├── robots.txt
├── script.js
├── sitemap.xml
└── style.css
```

## Качество кода

В проекте используются:

- `.editorconfig`
- Prettier
- npm scripts
- GitHub Actions

Проверка форматирования:

```bash
npm run format:check
npm run format
npm run format:check
```

## Рабочий процесс

```text
Issue → feature-ветка → изменения → Pull Request → merge в main
```

Последние рабочие циклы:

```text
15. Улучшение формы и мобильного интерфейса лендинга
16. Интерактивный FAQ и премиальные метки
17. Доступность, производительность и автозакрытие FAQ
```

Рабочие ветки релиза `v2.9`:

```text
feature/improve-landing-form
feature/interactive-landing-faq
feature/improve-landing-accessibility-performance
```

## Чему я научился

Во время работы над проектом я практиковался в:

- семантической HTML-разметке
- адаптивной верстке
- Flexbox и Grid
- CSS-градиентах
- hover-, active- и focus-состояниях
- мобильной навигации
- работе с DOM
- обработке событий
- `IntersectionObserver`
- `requestAnimationFrame`
- интерактивных аккордеонах
- клиентской валидации
- `FormData`
- `fetch`
- `async/await`
- `try/catch/finally`
- Formspree
- accessibility
- SEO
- Git и GitHub
- Issues
- feature-ветках
- Pull Request
- GitHub Pages
- GitHub Releases
- Prettier
- GitHub Actions

## Версии проекта

История изменений находится в [CHANGELOG.md](CHANGELOG.md).

- [v1.0](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.0) — первый релиз
- [v1.1](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.1) — техническое оформление
- [v1.2](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.2) — README и превью
- [v1.3](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.3) — качество кода
- [v1.4](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.4) — документация
- [v1.5](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.5) — шаблоны Issues и PR
- [v1.6](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.6) — блок проектов
- [v1.7](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.7) — мобильная версия
- [v1.8](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.8) — доступность
- [v1.9](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v1.9) — SEO
- [v2.0](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.0) — контактная форма
- [v2.1](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.1) — отправка формы
- [v2.2](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.2) — защита формы
- [v2.3](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.3) — главный экран и header
- [v2.4](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.4) — блок “Обо мне”
- [v2.5](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.5) — блок “Навыки”
- [v2.6](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.6) — блок “Проекты”
- [v2.7](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.7) — лендинг услуги
- [v2.8](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.8) — SEO лендинга
- [v2.9](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v2.9) — форма, FAQ и доступность лендинга

## Планы

- создать учебный сайт для клиента
- добавить новые самостоятельные проекты
- подключить Telegram- или email-уведомления
- продолжить улучшать accessibility
- продолжить улучшать SEO
- подготовиться к React

## Лицензия

Проект распространяется под лицензией MIT.

[Открыть LICENSE](LICENSE)

## Статус

```text
Проект находится в активной разработке.
Текущая версия: v2.9
```

## Автор

Dmitriy Web  
Frontend-разработчик в обучении
