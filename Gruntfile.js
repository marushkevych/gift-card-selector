
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
        }
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('test', ['jasmine:unit']);


};
