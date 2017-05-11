module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            outputDir: '/src'
        },
        clean: [
            'dist/*.*', 'dist/**', 'src/js/main-es6.js', 'src/css/main.css'
        ],
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: [
                        'README.md'
                    ],
                    dest: 'dist/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'src/vendors/font-awesome/fonts/',
                    src: ['*.*'],
                    dest: 'dist/fonts'
                }, {
                    expand: true,
                    cwd: 'src/vendors/fonts/',
                    src: ['*.*'],
                    dest: 'dist/fonts'
                }, {
                    expand: true,
                    cwd: 'src/images/',
                    src: ['*.*'],
                    dest: 'dist/images'
                }]
            }
        },
        less: {
            development: {
                files: {
                    'src/css/main.css': 'src/less/main.less'
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            options: {
                esversion: 6
            },
            all: ['Gruntfile.js', 'src/js/main.js']
        },
        babel: {
            options: {
                presets: ['es2015']
            },
            files: {
                expand: true,
                cwd: 'src/js',
                src: ['main.js'],
                dest: 'src/js/',
                ext: '-es6.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: {
                    dead_code: true, //remove unreachable code
                    conditionals: true, //apply optimizations for if-s and conditional expressions
                    booleans: true, //various optimizations for boolean context
                    unused: true, //drop unreferenced functions and variables
                    if_return: true, //optimizations for if/return and if/continue
                    join_vars: true, //join consecutive var statements
                    //drop_console: true //Pass true to discard calls to console.
                }
            },
            dist: {
                files: {
                    'dist/js/main.min.js': ['src/js/main-es6.js']
                }
            }
        },
        watch: {
            less: {
                files: [
                    'src/less/*.less', 'src/less/**/*.less'
                ],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'babel', 'uglify']
            }
        },
    });
    grunt.registerTask('mincss', ['cssmin']);
    grunt.registerTask('minjs', ['uglify']);
    grunt.registerTask('css', ['less']);
    grunt.registerTask(['watch', 'watch']);
    grunt.registerTask(['babel', 'babel']);
    grunt.registerTask('build', [
        'clean',
        'less',
        'cssmin',
        'babel',
        'uglify',
        'copy'
    ]);
};