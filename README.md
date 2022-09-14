# Quality Model Validation Survey frontend

A web application that acts as the frontend for conducting quality model validation surveys. Users can rate impacts that product factors have on defined quality aspects.
To actually use it and also store survey data, the backend is also required: [https://github.com/r0light/qmsurvey-frontend](https://github.com/r0light/qmsurvey-frontend)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```shell
npm install
```

### Compile and Hot-Reload for offline development (no backend server running)

```shell
npm run offline
```

### Compile and Hot-Reload for Development (backend server running)

```shell
npm run dev
```

### Compile and Minify for Production

```shell
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```shell
npm run lint
```

## Project build for Docker

```shell
docker build -t uniba-dsg/qmsurvey-frontend .
```

```shell
docker run -it -p 8080:80 --rm --name qmsurvey-frontend uniba-dsg/qmsurvey-frontend
```
