Instanette
==========

A demo Node / Backbone / Marionette app using the Instagram api. In order to run it you'll need to have redis installed and running locally on port 6379. You'll also need Google's [Zopfli](https://code.google.com/p/zopfli/) library installed globally for the build process.

(Use [homebrew](http://brew.sh/) and that will all be a snap!)

**Getting ready**

 1. Grab the repo from git
 2. Run `npm install`
 3. Run `grunt` to build the public-optimized directory and lint the source
 4. Put your Instagram and Google API keys in `config/local.js`

**Starting the app**

Instanette uses the [config](https://www.npmjs.org/package/config) library to swap out configurations based on the NODE_ENV environment variable specified. Locally you can start the app with the command `NODE_ENV=dev node app` to use the unbundled source. Leaving off the environment variable will default to the bundled source.

NOTE: the values specified in the `local.js` file override all others.