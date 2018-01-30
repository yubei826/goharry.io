---
title: redis docker
date: 2016-04-04 00:00:00 Z
path: /redis-docker
tags:
- docker
- redis
layout: post
topics:
- backend
---

Redis is an open source key-value store that functions as a data structure server.<!--more-->

下载镜像:

```shell
docker pull redis
```

启动 redis 实例:

```shell
docker run --name some-redis -d redis
```

将 redis docker 链接到应用 docker 上

```shell
docker run --name some-app --link some-redis:redis -d application-that-uses-redis
```

这样在应用 docker 中能通过<code>redis</code>变量直接访问 redis 服务.