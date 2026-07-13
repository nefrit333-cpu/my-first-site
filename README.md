# Dmitriy Web — учебный сайт-портфолио

![Превью проекта](assets/preview.svg)

![HTML](https://img.shields.io/badge/HTML-структура-orange)
![CSS](https://img.shields.io/badge/CSS-адаптив-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-интерактивность-yellow)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)
![Prettier](https://img.shields.io/badge/Prettier-formatting-pink)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-checks-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v3.0-blue)

Учебный сайт-портфолио начинающего frontend-разработчика. Проект развивается через реальные задачи, отдельные feature-ветки, Pull Request, автоматические проверки и релизы.

## Ссылки

- [Открыть сайт-портфолио](https://nefrit333-cpu.github.io/my-first-site/)
- [Открыть учебный лендинг услуги](https://nefrit333-cpu.github.io/my-first-site/landing.html)
- [Открыть репозиторий](https://github.com/nefrit333-cpu/my-first-site)
- [Открыть релиз v3.0](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.0)

## Текущая версия

```text
v3.0 — Тарифы, калькулятор стоимости и передача расчёта в заявку
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
- автоматическое закрытие FAQ при клике вне блока
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
- премиальный блок тарифов
- интерактивный калькулятор стоимости
- передачу выбранного расчёта в форму заявки
- этапы работы
- блок доверия
- интерактивный FAQ
- форму заявки
- footer
- мобильную навигацию
- кнопку возврата наверх
- skip-link для перехода к содержимому

Основные файлы лендинга:

```text
landing.html
landing.css
landing.js
pricing.css
calculator.css
```

## Релиз v3.0

Релиз объединяет три содержательных этапа развития лендинга.

### 1. Премиальный блок тарифов

Добавлены три тарифа:

```text
Старт — от 25 000 ₽
Бизнес — от 45 000 ₽
Премиум — от 75 000 ₽
```

У каждого тарифа есть:

- название
- примерная стоимость
- краткое описание
- список включённых работ
- кнопка выбора
- доступное название кнопки
- адаптивная карточка

Тариф `Бизнес` выделен как рекомендуемый и получил метку `Популярный`.

Дополнительно:

- добавлен пункт `Тарифы` в header
- добавлен пункт `Тарифы` в footer
- создан отдельный файл `pricing.css`
- добавлены премиальные градиенты, границы и тени
- hover работает только на устройствах с мышью
- active-состояния работают на сенсорных устройствах
- карточки выстраиваются в одну колонку на mobile
- поддерживается `prefers-reduced-motion`

### 2. Интерактивный калькулятор стоимости

Калькулятор позволяет выбрать базовый тариф:

```text
Старт — 25 000 ₽
Бизнес — 45 000 ₽
Премиум — 75 000 ₽
```

И дополнительные услуги:

```text
Дополнительная страница — 6 000 ₽
Подготовка текстов — 8 000 ₽
Расширенная анимация — 7 000 ₽
Подключение аналитики — 5 000 ₽
Дополнительная интеграция — 9 000 ₽
Срочный запуск — 15 000 ₽
```

Калькулятор умеет:

- выбирать тариф через radio-кнопки
- выбирать услуги через checkbox
- обновлять стоимость без перезагрузки
- форматировать сумму с разделителями тысяч
- показывать выбранный тариф
- показывать список дополнительных услуг
- сбрасывать расчёт
- возвращать тариф `Бизнес` после сброса
- обновлять доступный статус через `aria-live`
- работать через клавиатуру
- сохранять точку radio ровно по центру

Для калькулятора создан отдельный файл:

```text
calculator.css
```

### 3. Передача расчёта в форму заявки

Кнопки тарифов и калькулятор связаны с формой.

В заявку передаются:

```text
Выбранный тариф
Дополнительные услуги
Предварительная стоимость
```

Добавлены скрытые поля:

```text
selected_plan
selected_extras
estimated_price
```

Поведение:

- кнопка тарифа выбирает соответствующий тариф
- калькулятор синхронизируется с тарифными карточками
- выбранная конфигурация отображается рядом с формой
- после переноса изменения калькулятора обновляют конфигурацию
- конфигурацию можно очистить отдельно
- имя, email и сообщение при очистке сохраняются
- после успешной отправки конфигурация сбрасывается
- при ошибке отправки конфигурация сохраняется
- данные входят в `FormData` и отправляются через Formspree
- изменения конфигурации сообщаются через `aria-live`

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
- управление фокусом мобильного меню
- `fieldset` и `legend`
- radio-кнопки и checkbox
- `aria-expanded`
- `aria-controls`
- `aria-hidden`
- `aria-current`
- `aria-describedby`
- `aria-invalid`
- `aria-live`
- `inert`
- `prefers-reduced-motion`

## Адаптивность

Проверяются ширины:

```text
320px
375px
390px
414px
430px
768px
Desktop
```

На mobile:

- тарифы расположены в одну колонку
- настройки калькулятора расположены в одну колонку
- итоговая стоимость не выходит за экран
- длинные названия услуг переносятся
- блок конфигурации формы не сжимается
- нет горизонтальной прокрутки
- карточки не исчезают при прокрутке

## Структура проекта

```text
my-first-site/
├── .editorconfig
├── .gitattributes
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
├── calculator.css
├── favicon.svg
├── index.html
├── landing.css
├── landing.html
├── landing.js
├── package-lock.json
├── package.json
├── pricing.css
├── projects.css
├── robots.txt
├── script.js
├── scripts/
│   └── format-changed.mjs
├── sitemap.xml
└── style.css
```

## Качество кода

В проекте используются:

- `.editorconfig`
- `.gitattributes`
- Prettier
- npm scripts
- GitHub Actions
- единые переносы строк `LF`

Проверка форматирования:

```bash
npm run format:check
npm run format
npm run format:check
```

Команды:

```text
npm run format
→ форматирует только изменённые и новые файлы

npm run format:all
→ форматирует весь проект

npm run format:check
→ проверяет весь проект
```

## Рабочий процесс

```text
Issue → feature-ветка → изменения → Pull Request → merge в main
```

Последние рабочие циклы:

```text
18. Премиальный блок тарифов
19. Интерактивный калькулятор стоимости
20. Передача выбранного расчёта в форму заявки
```

Рабочие ветки релиза `v3.0`:

```text
feature/add-landing-pricing
feature/add-landing-calculator
feature/connect-calculator-form
```

Pull Request релиза:

```text
#39 — тарифы
#41 — калькулятор
#43 — связь калькулятора с формой
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
- radio-кнопках и checkbox
- динамическом расчёте стоимости
- `Intl.NumberFormat`
- синхронизации нескольких блоков интерфейса
- работе со скрытыми полями формы
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
- [v3.0](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.0) — тарифы и калькулятор стоимости

## Планы

- добавить реальные проекты в портфолио
- создать учебный сайт для клиента
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
Текущая версия: v3.0
```

## Автор

Dmitriy Web  
Frontend-разработчик в обучении
