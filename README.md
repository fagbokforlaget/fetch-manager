# Fetch Manager
Downloading Manager

## Install
```bash
npm install
```

### Use
```javascript
int maxConcurrentJobs = 5;
int maxRetries = 2;
let fm = new FetchManager(maxConcurrentJobs, maxRetries);
let url = "http://{...}";

//for blobs
fm.add(url, options).then((r) => {console.log("success: " + r)}).catch((e) => {console.log(e)});

//json
fm.add(url, options).then((r) => r.json()).then((r) => {console.log("success: " + r)}).catch((e) => {console.log(e)});
```

Additional methods:

```javascript
fm.getAllDownloads(); //get all active and queued downloads
fm.getStatus(id); // return status of a task (active or queued)
fm.cancel(id); // cancels a task, return promise
```

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `npm run test`

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)
* `npm run test:watch` - same as above but in a watch mode

## Acknowledgements

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
