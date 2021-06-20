# Notes Backend

App can be found at [Notes App](https://radiant-meadow-03252.herokuapp.com/)

## To set up

- `npm install`
- `npm install express`
- `npm install --save-dev nodemon`

## To run / Develop

- `npm run dev`
- Add the following scripts to your `package.json`

```js
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Available commands

- `npm run build:ui`
- `npm run deploy`
- `npm run deploy:full`
- `npm run logs:prod`
