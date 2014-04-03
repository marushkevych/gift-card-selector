
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '',
                    keepalive: false
                }
            }
        },
        jasmine: {
            unit: {
                src: ['lib/*.js','prototype/*.js', 'src/utils/*.js'],
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
                    'dist/controller.min.js': ['dist/controller.js']
                }
            }
        },
        // Grunt task for node-browserify
        watchify: {
            dev: {
                options: {
                    keepalive: true
                },
                src: './src/**/*.js',
                dest: 'prototype/controller.js'
            },
            test: {
                src: './src/**/*.js',
                dest: 'prototype/controller.js'
            },
            dist: {
                src: './src/**/*.js',
                dest: 'dist/controller.js'
            }
            
        },        
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-watchify');

    grunt.registerTask('watch', ['watchify:dev']); // watch for changes and build the dev bundle
    grunt.registerTask('server', ['connect:server','watchify:dev']);
    grunt.registerTask('test', ['watchify:test','jasmine:unit']);
    grunt.registerTask('dist', ['watchify:dist','uglify']);
    
    // Default task(s).
    grunt.registerTask('default', ['test',  'dist']);

};
