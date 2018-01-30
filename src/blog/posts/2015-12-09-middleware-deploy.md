---
title: 前端中间件实践和代码部署
date: 2015-12-09 00:00:00 Z
path: /middleware-deploy
tags:
- deploy
- python
- docker
layout: post
topics:
- frontend
---

说到前端中间件，大多数人想到的估计会是nodejs但通常一个页面的数据是由多个接口提供，如果使用 nodejs 难免会陷入 callback hell 的局面. <!--more-->而解决 callback hell 的方案无非是 es6 中的 <code>Promise</code>， <code>Generator</code> 和 es7 提出的 <code>Async</code> 特性， 但 <code>Promise</code>， <code>Generator</code> 的解决方案并不大优雅， 对于我们这种技术能力有些薄弱的技术团队， 在后期的维护和拓展上有一些难度， 对于 <code>Async</code> 现在并没有哪一个版本的 nodejs 支持.

## python
最后决定使用 Python 来实现中间件， 配合 tornado 异步 web 框架， 在性能上应该不会和 node 有太大的差别， 毕竟 Python 同步的写法更让人理解， Python 3.5.1 加入了 <code>Async</code> 语法糖，更好的支持了协程， tornado 最新版本也马上支持了 <code>Async</code>， tornado 的 Non-blocking HTTP server 和 Asynchronous HTTP client 也有巨大的优势， 能爽快的这样写代码了:

```python
class Index(tornado.web.requstHandler):
    async def get(self):
        http_client = AsyncHTTPClient()
        response = await http_client.fetch('/api/index')
        data = json.loads(response.body.encoding('utf8'))
        self.render('index.html', **data)
```

## docker
公司的测试和生产环境上部署的是 centos, 通过手动编译 python 3.5.1 总是会安装上一个缺少类库依赖的版本，在网上找了一圈也没找到可直接安装的编译版本，centos 还真是一个稳(luo)定(hou)的发行版本，所以寻思着是否能通过 docker 运行一个 debian 的实例来解决，因为之前没有接触到 docker，一直认为运行 docker 就是运行一个虚拟主机，然后在虚拟机里面安装这种依赖，然后运行应用程序。

但渐渐发现 docker 更像是一种服务，在 docker 中安装好各种依赖和环境，然后把项目文件挂载进 docker，最后执行应用启动命令，docker 会一直保持这条命令，只到错误退出，所以这更像是一个服务。同时你能把执行各种应用程序的 docker 镜像分享出去，当然你也可直接下载社区共享的各种应用程序的 docker 镜像，挂载自己项目的目录，然后直接运行。

## 总结
现在的前端开发不再是几年前写写页面，写写脚本这么简单了，有让你眼花缭乱的前端框架供你选择，重要的要了解各种框架的利弊、适用场景，根据自己的项目类型和团队技术水平，选择最合适的框架，选择项目的构建工具，甚至要了解和搭建项目运行环境，编写测试和发布脚本。
