---
title: React Server Rendering
date: 2016-07-21 00:00:00 Z
path: /react-server-side-rendering
tags:
- react
- redux
- node
cover: https://o8nlgbnd5.qnssl.com/Resources-to-Get-You-Started-with-ReactJS.jpg
layout: post
topics:
- frontend
---

得益于 virtual DOM 和 jsx, React 并不需要依赖于 DOM, 所以能在服务器上渲染 React 应用, 并且向客户端发送 HTML 代码. <!--more-->



## Babel es6+

Node 目前只支持部分 es6 特性，我们需要 Babel 把代码转换一次，新建 <code>.babelrc</code> 文件

```javascript
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": ["babel-plugin-transform-decorators-legacy"]
}
```

为了自动转换代码，我们使用 gulp

```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task("transform", () => {
    return gulp.src("app/**/*.js")
        .pipe(babel({
            presets: ["es2015", "react", "stage-0"],
            plugins: ["babel-plugin-transform-decorators-legacy"]
        }))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", ()=> {
    gulp.watch("app/**/*.js", ["transform"]);
});

gulp.task("default", ["transform", "watch"]);
```



## Async

React 在 server 中的 Lifecycle 有些不一样, 因为服务器对客户端是单向的，这样基本上只会出输出我们在 jsx 中定义好的 markup 代码，异步请求的数据并不会被渲染，所以我们需要定义一些钩子，让异步请求完成后再向客户端发送数据。



React + Redux + React Router + immutable 应该是现在最稳定和常见的 React 应用组合，下面将以这个为例子：

### Middleware

在 redux 中加入 promise middleware, 自动处理含有 promise 的 action：

```javascript
export default function promiseMiddleware() {
    return (next) => (action) => {
        const {promise, type, ...rest} = action;
        if(!promise) {
            return next(action);
        }

        const SUCCESS = type + "_SUCCESS";
        const REQUEST = type + "_PENDING";
        const FAILURE = type + "_FAILURE";

        next({...rest, type: REQUEST});

        return promise.then((result) => {
            const data = result && result.data ? result.data : result;
            next({...rest, data, type: SUCCESS})
        }).catch((error)=> {
            console.log(error);
            next({...rest, error, type: FAILURE})
        });
    }
}
```

### Action

在 action 中添加 promise：

```javascript
import request from "axios";

export const GET_POST = "GET_POST";

export function getPost(params) {
    return {
        type: GET_POST,
        promise: request.get(`/posts/${params.id}`)
    }
}
```

### Reducer

middleware 会自动添加 promise 中各种状态的 action type, 所以在 reducer 中直接处理：

```javascript
import {GET_POST} from "../actions/post";
import {Map, List, fromJS} from "immutable";

const initState = Map({
    post: Map(),
    isFetching: false
});

export default (state=initState, action) => {
    switch (action.type) {
        case `${GET_POST}_PENDING`:
            return state.set("isFetching", true);
        case `${GET_POST}_SUCCESS`:
            return state.set("isFetching", false).set("post", fromJS(action.data));
        default:
            return state;
    }
};
```

### Container

在 Container 中加入 promises 钩子:

```javascript
import React, {Component} from "react";
import {connect} from "react-redux";
import {getPost} from "../actions/post";

@connect(state => {
    return {
        post: state.post.get("post")
    }
})
export default class Post extends Component {

    constructor(props) {
        super(props);
    }

    static promises = [
        getPost
    ]

    render() {
        const {post}  = this.props;
        return (
            <div>
                <h1>{post.get("title")}</h1>
          		<div>{post.get("content")}</div>
            </div>
        );
    }
}
```

## Server

在当前 route component 的所有 promise resolve 后才会向客户端发送数据

```javascript
import { renderToString } from "react-dom/server";
import { RouterContext } from "react-router";
import { Provider } from "react-redux";

function fetchComponentData(dispatch, components, params) {

    const promises = components.reduce((prev, current) => {
        return (current && current.promises || [])
            .concat(current && current.WrappedComponent ? current.WrappedComponent.promises : [] || [])
            .concat(prev || []);
    }, []);

    const fetch = promises.map(promise => dispatch(promise(params)));

    return Promise.all(fetch);
}

app.use("/", function(req, res){
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
            console.log(error);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                .then(()=> {
                    const rootMarkup = renderToString(
                        <Provider store={store}>
                            <RouterContext { ...renderProps } />
                        </Provider>
                    );
                    const initialState = store.getState();
                    res.status(200).send(
                      	`
                          <!DOCTYPE HTML>
                          <head>
                              <script>window.__INIT_STATE__ = ${JSON.stringify(initialState)}</script>
                          </head>
                          <html>
                              <body>
                                  <div id="root">${rootMarkup}</div>
                              </body>
                          </html>
                      `;
                    );
                }).catch((error)=> {
                    console.log(error);
                    res.status(500).send(error);
                });
        } else {
            res.status(404).send('Not found')
        }
})
```

