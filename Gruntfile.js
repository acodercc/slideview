module.exports = function(grunt){
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        name: 'slideview',
        srcPath: 'src',
        assetsPath: 'assets',
        distPath: 'build',

        clean: ['<%= distPath%>/*'],

        jshint: {
            support: {
                options: {
                    force: true
                },
                files: {
                    src: [
                        'Gruntfile.js',
                        'demo/*.js'
                    ]
                }
            },
            lib: {
                options: {
                    force: false
                },
                files: {
                    src: ['src/*.js']
                }
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['package.json'],
                    dest: '<%= distPath %>'
                },
                {
                    expand: true,
                    cwd: './<%= srcPath %>',
                    src: ['*.js'],
                    dest: '<%= distPath %>',
                    ext: '.debug.js'
                }]
            }
        },


        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['*.debug.js'],
                    dest: '<%= distPath %>',
                    ext: '.js'
                }]
            }
        },

        watch: {
            combo: {
                files: ['package.json'],
                tasks: ['copy']
            },


            js: {
                files: ['<%= srcPath %>/*.js', '<%= srcPath %>/**/*.js'],
                tasks: ['uglify']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    

    grunt.registerTask('dist', ['jshint', 'copy', 'uglify']);
    grunt.registerTask('dev', ['watch']);
    
    grunt.registerTask('default', ['dist']);


};
