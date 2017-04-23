// Karma configuraiton

module.exports = function(config){
  config.set({
    //base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    //frameworks to used
    //available frameworks: http://npmjs.org/bower/keyword/karma-adapter

    frameworks:['jasmine'],

    //list of files / patterns to load in the browser

    files:[
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/*.js',
      'test/unit/**/*.js',
    ],

    // list of files to exclude

    exclude:[
      'test/protractor.conf.js', 'test/e2e/*.js'
    ],

    //preprocess matching files before serving them to the browser
    //available preprocessors: http://npmjs.org/browse/keyword/karma-preprocessor

    preprocessors:{

    },

    //test results reporter to use
    //possible values:'dots', 'progress'
    //available reporters: http://npmjs.org/browse/keyword/karma-reporter

    reporters:['progress'],

    //web server port
    port:9876,

    //enable /disable colors in the output
    colors: true,

    //level of logging
    //

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers:['Chrome', 'PhantomJS', 'PhantomJS_custom'],

    customLaunchers:{
      'PhantomJS_custom':{
        base:'PhantomJS',
        options:{
          windowName: 'my-window',
          settings:{
            webSecurityEnabled:false
          },
        },
        flags:['--load-images=true'],
        debug:true
      }
    },

    phantomjsLauncher:{
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
    concurrency: Infinity


  })
}
