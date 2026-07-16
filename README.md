# Dmitriy Web — учебный сайт-портфолио

![Превью проекта](assets/preview.svg)

![HTML](https://img.shields.io/badge/HTML-структура-orange)
![CSS](https://img.shields.io/badge/CSS-адаптив-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-интерактивность-yellow)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)
![Prettier](https://img.shields.io/badge/Prettier-formatting-pink)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-checks-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v3.1-blue)

Учебный сайт-портфолио начинающего frontend-разработчика. Проект развивается через реальные задачи, отдельные feature-ветки, Pull Request, автоматические проверки и релизы.

## Ссылки

- [Открыть сайт-портфолио](https://nefrit333-cpu.github.io/my-first-site/)
- [Открыть учебный лендинг услуги](https://nefrit333-cpu.github.io/my-first-site/landing.html)
- [Открыть репозиторий](https://github.com/nefrit333-cpu/my-first-site)
- [Открыть релиз v3.1](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.1)

## Текущая версия

```text
v3.1 — Кейсы, отзывы и усиление доверия лендинга
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
- премиальный блок кейсов
- интерактивный блок отзывов
- связь кейсов и отзывов
- передачу выбранного примера проекта в форму
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
cases.css
testimonials.css
trust-flow.css
```

## Релиз v3.1

Релиз усиливает доверие к учебному коммерческому лендингу и объединяет три содержательных этапа.

### 1. Премиальный блок кейсов

Добавлены три учебных проекта:

```text
Лендинг для локальной студии
Сайт для частного эксперта
Страница для сервисной компании
```

Каждый кейс содержит:

- категорию и номер
- задачу клиента
- предложенное решение
- список выполненных работ
- итоговый результат
- демонстрационные показатели
- срок запуска
- CTA для перехода к отзыву и форме

Дополнительно:

- создан отдельный файл `cases.css`
- добавлен пункт `Кейсы` в header и footer
- активная навигация учитывает секцию
- карточки используют семантический `article`
- учебные показатели явно обозначены как демонстрационные
- на desktop используется сетка из трёх колонок
- на mobile карточки переходят в одну колонку

### 2. Интерактивный блок отзывов

Добавлены три учебных отзыва, связанные с кейсами.

Каждый отзыв содержит:

- текст клиента в `blockquote`
- имя и роль автора
- тип проекта
- учебный результат
- главную ценность
- текстовую оценку
- отдельный блок результата
- предупреждение о демонстрационных данных

Интерактивность:

- кнопки предыдущего и следующего отзыва
- три индикатора
- циклическое переключение
- счётчик текущего отзыва
- управление через `ArrowLeft`, `ArrowRight`, `Home` и `End`
- сообщения через `aria-live`
- отсутствие автоматического переключения
- доступность всех отзывов без JavaScript

Для оформления создан отдельный файл:

```text
testimonials.css
```

Декоративные аватары с инициалами удалены: авторство передаётся через имя и роль без требования публиковать фотографию клиента.

### 3. Сценарий «Кейс → Отзыв → Заявка»

Кейсы, отзывы и форма объединены в единый путь:

```text
Кейс
→ соответствующий отзыв
→ форма заявки
→ передача выбранного проекта через Formspree
```

В заявку передаются:

```text
Источник перехода
Название проекта
Тип проекта
Учебный результат
```

Добавлены скрытые поля:

```text
reference_source
reference_project
reference_type
reference_result
```

Поведение:

- каждый кейс открывает связанный отзыв
- каждый отзыв возвращает к связанному кейсу
- CTA `Хочу похожий проект` добавляет контекст в форму
- выбранный проект отображается рядом с полями
- контекст проекта очищается независимо от тарифа
- очистка тарифа не удаляет выбранный проект
- после успешной отправки проект очищается
- при ошибке выбранный проект сохраняется
- данные входят в `FormData` и отправляются через Formspree
- изменения сообщаются через `aria-live`

Для связанного сценария создан:

```text
trust-flow.css
```

Блок выбранного проекта оформлен в тёмной стилистике формы заявки.

## Доступность

Интерфейс поддерживает:

- `Tab`
- `Shift + Tab`
- `Enter`
- `Space`
- `Escape`
- `ArrowLeft`
- `ArrowRight`
- `Home`
- `End`
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
- `aria-pressed`
- `aria-roledescription`
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
- карточки кейсов переходят в одну колонку
- отзыв и информация об авторе переходят в одну колонку
- действия кейсов и отзывов занимают доступную ширину
- блок выбранного проекта не выходит за границы формы
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
├── cases.css
├── favicon.svg
├── index.html
├── landing.css
├── landing.html
├── landing.js
├── package-lock.json
├── package.json
├── pricing.css
├── projects.css
├── testimonials.css
├── trust-flow.css
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
21. Премиальный блок кейсов
22. Интерактивный блок отзывов
23. Связь кейсов, отзывов и формы заявки
```

Рабочие ветки релиза `v3.1`:

```text
feature/add-landing-cases
feature/add-landing-testimonials
feature/connect-trust-sections-form
```

Pull Request релиза:

```text
#45 — премиальный блок кейсов
#47 — интерактивный блок отзывов
#49 — связь кейсов и отзывов с формой
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
- семантических `article`, `figure`, `figcaption` и `blockquote`
- создании доступной карусели без автопрокрутки
- циклическом переключении интерфейса
- управлении фокусом между связанными секциями
- progressive enhancement без потери контента
- передаче контекста из карточек в форму
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
- [v3.1](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.1) — кейсы, отзывы и усиление доверия

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
Текущая версия: v3.1
```

## Автор

Dmitriy Web  
Frontend-разработчик в обучении
