
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'app',
                    keepalive: true
                }
            }
        },
        jasmine: {
            unit: {
                src: 'app/**/*.js',
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        },
        // minify javascript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['app/controller.js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('test', ['jasmine:unit']);
    
    // Default task(s).
    grunt.registerTask('default', ['test', 'uglify']);

};
