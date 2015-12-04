module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

      files: {
        js: ['src/js/**/*.js'],
        destination: 'dist/'
      },

      uglify: {
        dist: {
          files: {
            '<%= files.destination %>js/main.min.js': ['<%= files.js %>']
          }
        }
      },
      handlebarslayouts:{
        dist:{
          files:{
            'dist/*.html':'src/hbs/pages/*.hbs'
          },
          options: {
            partials: [
              'src/hbs/partials/*.hbs'
            ],
            context: 'src/hbs/datas.json'
          }
        }
      },
      copy: {
        dist: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['*.html'],
            dest: '<%= files.destination %>'
          }]
        }
      },
      compass: {
        dist: {
          options: {
            sassDir: 'src/sass',
            cssDir: 'dist/css',
            environment: 'production'
          }
        }},
      imagemin: {
        dist: {                         // Another target
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'src/',                   // Src matches are relative to this path
            src: ['img/**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: '<%= files.destination %>'                  // Destination path prefix
          }]
        }
      },
      connect: {
        server: {
          options: {
            port: 8000,
            hostname: '*',
            base: '<%= files.destination %>'
          }
        }
      },
      watch: {
        options:{
          livereload: true,
        },
        js: {
          files: '<%= files.js %>',
          tasks: ['uglify:dist'],
        },
        sass:{
          files: 'src/sass/**/*.scss',
          tasks:['compass:dist']
        },
        hbs: {
            files: ['src/hbs/**/**/*.hbs','src/hbs/**/**/*.json'],
            tasks: ['handlebarslayouts'],
          },
      },


  });

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify'); //concatène les fichiers js
grunt.loadNpmTasks('grunt-contrib-copy'); // copie les fichiers
grunt.loadNpmTasks('grunt-contrib-connect'); //pour lancer le serveur
grunt.loadNpmTasks('grunt-contrib-watch'); //relance le grunt a chaque modif
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-handlebars-layouts');

// Default task(s).
grunt.registerTask('default', ['uglify:dist', 'handlebarslayouts','compass:dist','connect','watch']);
grunt.registerTask('push2prod', ['clean', 'uglify:dist','handlebarslayouts','compass','ftpush:prod']);

};
