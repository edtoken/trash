'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '../assets/js/main.js',
        '../assets/js/app.js',
        '../assets/js/app/*',
        '../assets/js/app/*.js',
        '!../assets/js/app.min.js',
        '!../assets/js/lib/*'
      ]
    },

  // sprite:{
  //   all: {
  //    src: ['../assets/images/sprite_src/*.png'],
  //     destImg: '../assets/images/sprite.png',
  //     destCSS: '../assets/stylesheets/scss/sprites.scss',
  //     algorithm: 'binary-tree',
  //     padding: 2,
  //     // cssFormat: 'scss'
  //     cssFormat: 'css'
  //   }
  // },

     sass: {

      prod : {

          options : {

            cacheLocation:'../../../framework/',
            style: 'compressed',
            unixNewlines:true,

          },

          files: {

            '../assets/stylesheets/css/main.min.css':  [
              '../assets/stylesheets/scss/project.scss',
            ],

            '../assets/stylesheets/css/ie.min.css':  [
              '../assets/stylesheets/scss/ie.scss',
            ],

          }

        },

        dev : {

          options : {

            cacheLocation:'../../../framework/',
            style: 'expanded',
            unixNewlines:true,

          },

          files: {

            '../assets/stylesheets/css/main.css':  [
              '../assets/stylesheets/scss/project.scss',
            ],

            '../assets/stylesheets/css/ie.css':  [
              '../assets/stylesheets/scss/ie.scss',
            ],

          }

        }

      },

       js: {

          files: [
            '<%= jshint.all %>'
          ],

          tasks: ['jshint']
      },

   watch: {
      
      sass: {

        files: [
          '../assets/images/sprite_src/*.png',
          '../assets/stylesheets/scss/bootstrap/*.scss',
          '../assets/stylesheets/scss/*.scss',
          '../assets/js/*',
          'Gruntfile.js',
          '!../assets/js/app.min.js',
          '!../assets/stylesheets/scss/sprites.scss',
        ],

        tasks: ['sass:prod', 'jshint:all'],

      },

      livereload: {

        options: {
          livereload: false
        },

        files: [
           'config.js',
           'Gruntfile.js',
           '../assets/js/app.js',
           '../assets/js/*',
           '../assets/js/app/*',
           '../assets/stylesheets/scss/*project.scss',
           '../assets/stylesheets/scss/*',
           '!../assets/js/app.min.js',
           '!../assets/stylesheets/scss/sprites.scss'
        ]
      }
    },

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wp-version');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default',[
    // 'sass:prod',
    // 'sass:dev',
    // 'uglify:my_target',
    ]);
  grunt.registerTask('dev', [
    // 'watch',
  ]);

};