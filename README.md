### Макеты
https://www.figma.com/design/3sLJFxrTF5GnV5Phje9ZZm/Waijong?node-id=0-1&t=0J4qOx1EEb8Hr8Ab-1

### Cпринт 7-8
https://disk.yandex.ru/i/VyisCNQw28JOjQ


Настроить Express для Server Side Rendering (без Redux, просто отдавать React-страничку)

https://github.com/DinaEll/waika_project/blob/main/packages/client/server/index.ts


Настроить Redux и Router в SSR

https://github.com/DinaEll/waika_project/blob/main/packages/client/src/entry-server.tsx


Добавить OAuth-авторизацию в проект

https://github.com/DinaEll/waika_project/blob/main/packages/client/src/shared/hocs/withOauth.tsx


Добавить ещё одно WEB API (кроме Canvas, Fetch)

https://github.com/DinaEll/waika_project/blob/main/packages/client/src/pages/GamePage/ui/Game/Game.tsx


Добавить в проект MEMORYLEAKS.md или новый раздел в README.md, в котором описаны, какие утечки были и как они исправлены

https://github.com/DinaEll/waika_project/blob/main/docs/MEMORYLEAKS.md


Серверная инфраструктура для форума, эмодзи и темизации

https://github.com/DinaEll/waika_project/blob/main/packages/database/index.ts

https://github.com/DinaEll/waika_project/blob/main/packages/server/index.ts


Реализовать API для форума

https://github.com/DinaEll/waika_project/blob/main/packages/server/src/routes/forum.ts


Переключение темы (бэкенд)

https://github.com/DinaEll/waika_project/blob/main/packages/server/src/routes/themes.ts



### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `npm run bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `npm run dev` - это режим разработки
4. Выполните команду `npm run docker-up` - это database & server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope @waika_project/client```

Для сервера
```yarn lerna add {your_dep} --scope @waika_project/server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope @waika_project/client```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Проверка типов

```yarn typecheck```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось

`yarn preview`

Или раздельно

`yarn preview --scope @waika_project/client`

`yarn preview --scope @waika_project/server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Production окружение в докере

`yarn docker-up` - запустит два сервиса
1. node, ваш сервер (server)
2. postgres, вашу базу данных (postgres)

`yarn docker-down` - остановит сервисы

`yarn docker-adminer-up` - запустит adminer
`yarn docker-adminer-down` - остановит adminer

[Документация](docs/README.md)
