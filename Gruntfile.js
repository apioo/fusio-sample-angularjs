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
          './node_modules/angular/angular.min.js',
          './node_modules/angular-route/angular-route.min.js',
          './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
          './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
          './node_modules/angular-no-captcha/build/angular-no-captcha.min.js',
          './node_modules/satellizer/dist/satellizer.min.js',
          './app/auth/auth.js',
          './app/todo/todo.js',
          './app/app.js',
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
            './node_modules/bootstrap/dist/css/bootstrap.css', 
            './node_modules/bootstrap/dist/css/bootstrap-theme.css', 
            './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css', 
            './css/app.css'
          ]
        }
      }
    },
    ngtemplates: {
      todoApp: {
        src: 'app/*.html',
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
