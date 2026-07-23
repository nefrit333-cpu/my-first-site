# Dmitriy Web — учебный сайт-портфолио

![Превью проекта](assets/preview.svg)

![HTML](https://img.shields.io/badge/HTML-структура-orange)
![CSS](https://img.shields.io/badge/CSS-адаптив-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-интерактивность-yellow)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)
![Prettier](https://img.shields.io/badge/Prettier-formatting-pink)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-checks-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v3.4-blue)

Учебный сайт-портфолио начинающего frontend-разработчика. Проект развивается через реальные задачи, отдельные feature-ветки, Pull Request, автоматические проверки и релизы.

## Ссылки

- [Открыть сайт-портфолио](https://nefrit333-cpu.github.io/my-first-site/)
- [Открыть учебный лендинг услуги](https://nefrit333-cpu.github.io/my-first-site/landing.html)
- [Открыть репозиторий](https://github.com/nefrit333-cpu/my-first-site)
- [Открыть релиз v3.4](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.4)

## Текущая версия

```text
v3.4 — Автопроверки лендинга и стабильный релизный процесс
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
- создании smoke-проверок без браузера
- проверке файлов по обязательным маркерам
- кодах завершения Node.js-скриптов
- подключении smoke-проверок к CI
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
- hover-, active- и focus-состояния
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
- пошаговый бриф проекта из пяти этапов
- автоматическое сохранение черновика брифа в `localStorage`
- восстановление ответов и текущего шага после перезагрузки
- передачу брифа в форму как текстовую сводку и отдельные поля Formspree
- независимую работу тарифа, выбранного проекта и брифа
- надёжные состояния отправки формы: `idle`, `validating`, `sending`, `success` и `error`
- защиту от повторной отправки
- тайм-аут 15 секунд через `AbortController`
- кнопку повторной отправки после ошибки
- подробную карточку подтверждения успешной заявки
- автоматическое сохранение черновика заявки в `sessionStorage`
- восстановление заявки после обновления страницы
- кнопку очистки черновика заявки
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
brief.css
cases.css
testimonials.css
trust-flow.css
```

## Релиз v3.4

Релиз добавляет автоматические проверки ключевых частей учебного лендинга и подключает их к релизному процессу.

```text
v3.4 — Автопроверки лендинга и стабильный релизный процесс
```

### 1. Локальная smoke-проверка

Добавлен скрипт:

```text
scripts/smoke-landing.mjs
```

Команда запуска:

```text
npm run smoke:landing
```

Проверяются ключевые маркеры в:

```text
landing.html
landing.js
landing.css
```

Smoke-проверка контролирует наличие формы заявки, Formspree action, основных полей, защиты от ботов, состояний отправки, карточки подтверждения, черновика заявки, ключей хранилища и связанных CSS-стилей.

При успехе выводится:

```text
PASS landing.html
PASS landing.js
PASS landing.css
Smoke check passed
```

При ошибке выводится понятное FAIL-сообщение, а процесс завершается с кодом `1`.

Скрипт использует только встроенные модули Node.js, не запускает браузер и не выполняет сетевые запросы.

### 2. Smoke-проверка в GitHub Actions

Существующий workflow:

```text
.github/workflows/format-check.yml
```

теперь выполняет:

```text
npm run format:check
npm run smoke:landing
```

Проверки запускаются автоматически:

```text
при Pull Request в main
при push в main
```

В workflow сохранены Node.js 20, `npm ci`, Prettier и существующие триггеры.

## Релиз v3.3

Релиз усиливает форму заявки на лендинге услуги и завершает сценарий от выбора контекста до надёжной отправки.

```text
v3.3 — Надёжная отправка, подтверждение и восстановление заявки
```

### 1. Надёжная отправка формы

Форма заявки получила явные состояния:

```text
idle
validating
sending
success
error
```

Добавлены:

- защита от повторной отправки через `isSubmitting`
- блокировка submit-кнопки во время запроса
- состояние `aria-busy`
- текст `Отправляем заявку…`
- компактный индикатор отправки
- `AbortController`
- тайм-аут 15 секунд
- понятные сообщения для сетевых и серверных ошибок
- кнопка `Повторить отправку`

При ошибке сохраняются:

```text
Имя
Email
Сообщение
Тариф
Выбранный проект
Бриф возле формы
Скрытые поля контекста
```

### 2. Подробное подтверждение заявки

После успешного ответа Formspree возле формы появляется карточка:

```text
Заявка успешно отправлена
```

Карточка показывает только фактически отправленные данные:

```text
Время отправки
Email для ответа
Выбранный тариф
Дополнительные услуги
Предварительная стоимость
Выбранный пример проекта
Тип проекта
Статус брифа
```

Пустые параметры не отображаются.

Для карточки создаётся снимок отправленного `FormData`. Он не записывается в `localStorage`, не сохраняется в `sessionStorage` и не отправляется отдельным запросом.

### 3. Черновик заявки после обновления

Незавершённая заявка сохраняется в текущей вкладке браузера через:

```text
sessionStorage
```

Ключ:

```text
dmitriy-web-application-draft-v1
```

Черновик заявки содержит:

```text
version
updatedAt
fields
context
```

Восстанавливаются:

```text
Имя
Email
Сообщение
Тариф и дополнительные услуги
Предварительная стоимость
Выбранный пример проекта
Бриф возле формы
```

Черновик заявки хранится отдельно от черновика пошагового брифа:

```text
dmitriy-web-project-brief-v1
```

Ключ `dmitriy-web-project-brief-v1` относится только к пошаговому брифу.

Ключ `dmitriy-web-application-draft-v1` относится только к заявке возле формы.

Черновик заявки хранится только в текущей вкладке браузера и не отправляется отдельно.

После успешной отправки черновик заявки удаляется, а подробная карточка подтверждения остаётся видимой до действия пользователя.

## Релиз v3.2

Релиз добавляет полноценный путь от первичного брифа до структурированной заявки и объединяет три основных этапа.

### 1. Пошаговый бриф проекта

На лендинг добавлен интерактивный бриф из пяти шагов:

```text
1. Тип сайта
2. Основная задача
3. Необходимые возможности
4. Желаемый срок
5. Ориентировочный бюджет
```

В брифе реализованы:

- radio-кнопки и checkbox
- проверка обязательных ответов
- кнопки `Назад` и `Продолжить`
- индикатор `Шаг N из 5`
- визуальная полоса прогресса
- итоговая сводка
- изменение и полная очистка ответов
- добавление сводки в форму заявки
- пункт `Бриф` в header и footer
- управление через клавиатуру
- progressive enhancement без потери полей

Для оформления создан отдельный файл:

```text
brief.css
```

### 2. Автоматическое сохранение черновика

Ответы брифа сохраняются в браузере под ключом:

```text
dmitriy-web-project-brief-v1
```

Черновик содержит только:

```text
version
updatedAt
currentStepIndex
isComplete
answers
```

Поведение:

- radio и checkbox сохраняются автоматически
- текущий шаг восстанавливается после перезагрузки
- итоговая сводка восстанавливается
- черновик хранится не более 30 дней
- неизвестная версия и повреждённый JSON удаляются безопасно
- недопустимые значения не восстанавливаются
- кнопка `Удалить черновик` не очищает ответы на экране
- кнопка `Очистить бриф` удаляет ответы и запись
- изменение в другой вкладке сообщается через событие `storage`
- при недоступном `localStorage` бриф продолжает работать

Имя, email, текст сообщения, тариф и выбранный кейс в черновик не записываются.

### 3. Расширенная заявка и Formspree

После нажатия:

```text
Добавить бриф в заявку
```

возле формы появляется отдельная карточка с пятью ответами.

В Formspree передаются поля:

```text
brief_site_type
brief_goal
brief_features
brief_timeline
brief_budget
brief_status
```

Карточка позволяет:

- вернуться к редактированию брифа
- убрать бриф только из заявки
- сохранить исходные ответы и локальный черновик
- обновить данные без дублирования карточки и текста

Текстовая сводка находится между маркерами:

```text
=== Бриф проекта ===
=== Конец брифа ===
```

Собственный текст пользователя сохраняется при добавлении, обновлении и удалении сводки.

Контексты формы работают независимо:

```text
Выбранный тариф и расчёт
Выбранный пример проекта
Заполненный бриф
```

После успешной отправки очищается только контекст формы, а исходный бриф и его локальный черновик сохраняются.

### Дополнительное улучшение портфолио

На основной странице расширена система hover-, active- и focus-состояний:

- поля формы получают акцентную границу и мягкую подсветку
- карточки и внутренние блоки реагируют на наведение
- теги, FAQ, кнопки и ссылки имеют согласованные состояния
- декоративный hover включается только для мыши
- touch-устройства используют отдельные active-состояния
- поддерживается `prefers-reduced-motion`

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
- `role="progressbar"`
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
- шаги и варианты брифа переходят в одну колонку
- карточка брифа возле формы не выходит за границы
- карточка подтверждения заявки не выходит за границы
- статус черновика заявки переносится без горизонтальной прокрутки
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
├── brief.css
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


npm run smoke:landing
→ проверяет ключевые маркеры учебного лендинга
```

## Рабочий процесс

```text
Issue → feature-ветка → изменения → Pull Request → merge в main
```

Последние рабочие циклы:

```text
24. Пошаговый бриф проекта
25. Автоматическое сохранение черновика
26. Hover-эффекты основного портфолио
27. Связь брифа с формой и Formspree
28. Надёжные состояния отправки формы
29. Подробное подтверждение заявки
30. Восстановление черновика заявки
31. Документация релиза v3.3
32. Smoke-проверка лендинга
33. Smoke-проверка в GitHub Actions
34. Документация релиза v3.4
```

Рабочие ветки последних релизов:

```text
feature/add-project-brief
feature/save-project-brief-draft
feature/add-portfolio-hover-effects
feature/connect-project-brief-form
feature/improve-form-submission-status
feature/add-form-submission-confirmation
feature/restore-application-form-draft
feature/update-docs-v3.3
feature/add-landing-smoke-test
feature/add-landing-smoke-ci
feature/update-docs-v3.4
```

Pull Request последних релизов:

```text
#51 — пошаговый бриф проекта
#53 — автоматическое сохранение черновика
#55 — hover-эффекты портфолио
#57 — связь брифа с формой и Formspree
#59 — надёжные состояния отправки формы
#61 — подробное подтверждение заявки
#63 — восстановление черновика заявки
#67 — smoke-проверка лендинга
#69 — smoke-проверка лендинга в CI
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
- многошаговых формах и управлении прогрессом
- сохранении состояния в `localStorage`
- сохранении состояния в `sessionStorage`
- разделении черновика брифа и черновика заявки
- debounce-сохранении текстовых полей
- сериализации и безопасном восстановлении JSON
- версионировании и сроке хранения локальных данных
- событии `storage` между вкладками
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
- синхронизации нескольких независимых контекстов заявки
- интерактивных аккордеонах
- клиентской валидации
- `FormData`
- `fetch`
- `async/await`
- `try/catch/finally`
- `AbortController`
- тайм-аутах сетевых запросов
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
- [v3.2](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.2) — пошаговый бриф и расширенная заявка
- [v3.3](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.3) — надёжная отправка, подтверждение и восстановление заявки
- [v3.4](https://github.com/nefrit333-cpu/my-first-site/releases/tag/v3.4) — автопроверки лендинга и стабильный релизный процесс

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
Текущая версия: v3.4
```

## Автор

Dmitriy Web  
Frontend-разработчик в обучении
