# Giphagram

Welcome to the world of giphy. Download the zip file and unzip the contents into a folder. 
Go inside the folder and then run the following commands to see the application.

## Installation
To setup the project run and install all the required dependencies.
```
npm install
```

## Run the application
To start the local development server that compiles and hot-reloads for development.
```
npm run serve
```
The above command will run the application in [http://localhost:8080](http://localhost:8080).

## Progressive Web App
Find the PDF attached. [lighthouse.pdf](https://github.com/sendilkumarn/giphagram/blob/master/lighthouse-report.pdf)

## Testing
To run the tests (both unit and e2e tests)
```
npm run test
```

#### e2e testing
Run the end-to-end tests using (this starts Cypress server and runs the end to end tests in it)
```
npm run test:e2e
```

#### unit testing
Run the unit tests using 
```
npm run test:unit
```

### Current Coverage status
-----------------------|----------|----------|----------|----------|-------------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------|----------|----------|----------|----------|-------------------|
All files               |    96.75 |    94.74 |       90 |    98.25 |                   |
 src                   |      100 |      100 |      100 |      100 |                   |
  App.vue              |      100 |      100 |      100 |      100 |                   |
 src/components        |      100 |    92.86 |      100 |      100 |                   |
  Giphagram.vue        |      100 |      100 |      100 |      100 |                   |
  ImageLoader.vue      |      100 |      100 |      100 |      100 |                   |
  InfiniteListView.vue  |      100 |       50 |      100 |      100 |                44 |
  LayoutSelector.vue   |      100 |      100 |      100 |      100 |                   |
  Search.vue           |      100 |      100 |      100 |      100 |                   |
 src/directives        |    84.21 |     87.5 |    66.67 |    94.12 |                   |
  LazyLoadDirective.js |    84.21 |     87.5 |    66.67 |    94.12 |                10 |
 src/services          |    85.71 |      100 |      100 |    85.71 |                   |
  constants.js         |      100 |      100 |      100 |      100 |                   |
  giphyService.js      |       80 |      100 |      100 |       80 |                14 |
 src/store             |      100 |      100 |      100 |      100 |                   |
  actions.js           |      100 |      100 |      100 |      100 |                   |
  getters.js           |      100 |      100 |      100 |      100 |                   |
  index.js             |      100 |      100 |      100 |      100 |                   |
  mutation-actions.js  |      100 |      100 |      100 |      100 |                   |
  mutations.js         |      100 |      100 |      100 |      100 |                   |
-----------------------|----------|----------|----------|----------|-------------------| 

## Production build
If you would like to compile and build the application in production mode. Run the following command.
```
npm run build
```

## Linting 
To lint the files run
```
npm run lint
```
or pass in the `--fix` to fix any linting errors
