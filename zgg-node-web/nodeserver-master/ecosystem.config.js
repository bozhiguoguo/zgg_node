module.exports = {
    apps : [{
        name        : "zgg-pc",
        script      : "./bin/www",
        watch       : true,
        env: {
            "NODE_ENV": "development",
        },
        env_production : {
            "NODE_ENV": "production"
        }
    },{
        name       : "api-app",
        script     : "./api.js",
        instances  : 4,
        exec_mode  : "cluster"
    }]
}