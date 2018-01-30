---
title: 使用 webpack 写 angular
date: 2015-11-12 00:00:00 Z
path: /angular-webpack
tags:
- javascript
- webpack
- angular
layout: post
topics:
- frontend
---

[webpack](https://webpack.github.io) 是一款 js 模块管理工具， 能使用 commonjs 或者 es6 方式来管理 js 模块， 利用其 loader 插件还能做一些炫酷的事情， 比如利用 babel-loader 就能放心大胆的使用 es6 的新特性， 或者利用 jsx-loader 自动转换 jsx 为 js 文件.<!--more-->

## 配置 webpack

主要配置 babel-loader， 能让 webpack 自动把 es6 代码转换为 es5 代码

```javascript
module.exports = {
    ...
    resolveLoader: {
        modulesDirectories: ['node_modules']
    }，
    resolve: {
        extensions: ['', '.js']
    }，
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015',
                exclude: /(node_modules|lib)/
            }
        ]
    }
    ...
}
```

如果你打算把 angular 作为单独的库文件在页面中引入的话， 别忘了加入 externals 配置中

```javascript
...
externals: {
    'angular': 'angular'
}
...
```

## 使用 es6 class 作为 controller

es6 终于加入了 class 关键词， 可以愉快的使用 class 了

```javascript
export default class HomeController {
    constructor() {
        this.name = 'home'
    }

    getName() {
        return this.name;
    }
}

angular.module('app', []).controller('HomeController', HomeController);
```

## 异步加载 controller

```javascript
angular.module('app', []).config(function($locationProvider){
    $locationProvider
    .when('/', function(){
        templateUrl: require('file!../templates/index.html'),
        resolve: {
            load: function(){
                return new Promise(function(resolve, reject){
                    require.ensure([]， function(require){
                        require('../controllers/home.js');
                        resolve();
                    });
                });
            },
        },
        controller: 'HomeController',
        controllerAs: 'vm'
    })
})
```
