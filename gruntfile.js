var serverConfig = require('./webpack.server.config.js');
var nodemonConfig = require('./nodemon.dev.json');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    webpack: {
      server: Object.assign({}, serverConfig, {
        watch: true, // use webpacks watcher
      }),
    },

    nodemon: {
      server: {
        script: '<%= pkg.main %>',
        options: nodemonConfig,
      },
    },

  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('default', ['webpack', 'nodemon']);

};
