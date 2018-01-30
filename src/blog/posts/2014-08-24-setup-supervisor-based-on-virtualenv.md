---
title: 配置基于 virtualenv 的 supervisor
date: 2014-08-24 00:00:00 Z
path: /setup-supervisor-based-on-virtualenv
tags:
- python
- virtualenv
- supervisor
layout: post
topics:
- backend
---

supervisor 是基于 python 的任务管理工具，用来自动运行各种后台任务，当然你也能直接利用 nohup 命令使任务自动后台运行，但如果要重启任务，每次都自己手动 kill 掉任务进程，这样很繁琐，而且一旦程序错误导致进程退出的话，系统也无法自动重载任务。<!--more-->

virtualenv 是 python 的一个虚拟环境管理工具，用来部署运行不同的 python 版本，很多 linux 发行版本的 python 都是 2.x，例如要运行 3.x 版本的 python 程序，如果直接升级系统的 python 版本的话，由于 python 3.x 无法向前兼容 2.x 版本会造成系统依赖失效。

## 安装配置 virtualenv

```shell
pip install virtualenv
```

如果系统未安装 pip，可直接从源文件安装，记得用当前最新版本号代替 X.X

```shell
curl -O https://pypi.python.org/packages/source/v/virtualenv/virtualenv-X.X.tar.gz
tar xvfz virtualenv-X.X.tar.gz
cd virtualenv-X.X
python setup.py install
```

在项目目录下通过以下命令初始化和激活虚拟环境

```shell
virtualenv ENV
cd ENV
source bin/activate
```

## 安装配置 supervisor

```shell
pip install supervisor
```

ubuntu server 上可直接 apt-get 安装

```shell
sudo apt-get install supervisor
```

通过以下命令生成 supervisor 示例配置文件

```shell
echo_supervisord_conf > /etc/supervisord.conf
```

修改 supervisord.conf 文件，通过添加 [program:name] 来新建一个任务，例如：

```shell
[program:tornado]
directory=/home/user/website/example.com
command=python server.py
autorestart=true
stdout_logfile=/var/log/example.com/out.log
stderr_log=/var/log/example.com/err.log
```

但我们利用了 virtualenv 来生成了不同的虚拟环境，这里的 command 直接是 python server.py 的肯定是会出错的，所以我们需要改成这样：

```shell
[program:tornado]
directory=/home/user/website/example.com
command=/home/user/website/example.com/ENV/bin/python server.py
autorestart=true
stdout_logfile=/var/log/example.com/out.log
stderr_log=/var/log/example.com/err.log
```

接下来运行以下命令运动 supervisor 服务：

```shell
supervisord -c /etc/supervisord.conf
supervisorctl start tornado
```

重载 supervisor 里的任务可运行：

```shell
supervisorctl restart tornado
```
