module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch:{
            ts: {
                files: "src/**/*.ts",
                tasks: ['ts']
            }
        },

        ts: {
            a : {
                src : ['*.ts', '**/*.ts' , '!node_modules/**/*.ts' , '!tscCompilar/**/*.ts'],
                
                options: {
                        module: 'commonjs',
                        declaration : false,
                        verbose :true,
                        fast : 'never',
                        sourceMap : false
                    }
                }
        }

    });

    grunt.registerTask("default", ["ts"]);
};