module.exports = function(grunt){

  grunt.initConfig({
    concat: {
      options: {
        separator: ';\n',
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/\/\/# sourceMappingURL=([A-z0-9\-\.\_]+)/g, '').trim();
        },
      },
      dist: {
        src: [
          './bower_components/angular/angular.min.js',
          './bower_components/angular-route/angular-route.min.js',
          './bower_components/ngstorage/ngStorage.min.js',
          './bower_components/oauth-ng/dist/oauth-ng.js',
          './js/app.js',
          './dist/todo-templates.min.js'
        ],
        dest: './dist/todo.min.js'
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        rebase: ''
      },
      dist: {
        files: {
          './dist/todo.min.css': [
            './bower_components/bootstrap/dist/css/bootstrap.css', 
            './bower_components/bootstrap/dist/css/bootstrap-theme.css', 
            './css/app.css'
          ]
        }
      }
    },
    ngtemplates: {
      todoApp: {
        src: 'partials/*.html',
        dest: 'dist/todo-templates.min.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['ngtemplates', 'concat', 'cssmin']);

};
