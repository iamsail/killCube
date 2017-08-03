module.exports = {
	  extends: 'eslint:recommended',
      env: {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'mongo': true,
        'jquery':true
      },
	  globals: {
        "document": true,
        "navigator": true,
        "window": true,
        "angular":true //添加项目所需没有申明的全局变量
      },
      rules : {
        "no-console" : "off",
        "camelcase" : 2,
        "no-var": 2,
        "eqeqeq" : 2
    },

    parserOptions: {
    "sourceType": "module",
    }
};

