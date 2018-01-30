---
title: 使用 shadowsocks 正确上网
date: 2014-06-12 00:00:00 Z
path: /usage-of-shadowsocks
tags:
- proxy
- shadowsocks
layout: post
topics:
- network
---

众所周知的原因，每年的5月35号左右，Google 的全线服务会被无情的封锁一段时间，对于程序员来说，少了 Google 就等于要花费更多的时间和精力和寻找资料和文档，所以如何正确上网很重要。<!--more-->

首先你需要一台 vps，推荐最近新起的 vps 服务提供商 [DigitalOcean](https://www.digitalocean.com/?refcode=08226ee9093c)，这家服务商的 vps 物美价廉，最低每个月才 $5，也就是差不多 rmb30，而且还它标配的是 SSD 硬盘，除了能作为代理外，在上面跑一些自己的小网站还是没问题的.

购买 vps 后，在上面安装 nodejs， 如果你装的系统是 ubuntu 或是 debian，直接运行 apt-get install nodejs 安装 nodejs，当然你也可以下载 nodejs 安装包，自己手动编译安装。

接下来安装 shadowsocks-nodejs，直接运行 npm install -g shadowsocks，在任意的一个目录下创建 config.json，内容如下

```javascript
{
    "server":"0.0.0.0"，
    "server_port":8388，
    "local_port":1080，
    "password":"password"，
    "timeout":600，
    "method":"aes-256-cfb"，
    "local_address":"127.0.0.1"
}
```

在当前目录下运行 nohup ssserver > log & 使其后台自动运行， 当然你也能配置 [Supervisor](https://github.com/clowwindy/shadowsocks-nodejs/wiki/Configure-Shadowsocks-nodejs-with-Supervisor)，让其后台自动运行

然后回到本地(自己的电脑)，同样安装 shadowsocks-nodejs，也是在任意的一个目录下创建 config.json，内容如下

```javascript
{
    "server":"0.0.0.0"， //这里填写你 vps 的ip地址
    "server_port":8388，
    "local_port":1080， //这里填写本地的代理端口，如端口被占用的话，可随意更改
    "password":"password"，
    "timeout":600，
    "method":"aes-256-cfb"，
    "local_address":"127.0.0.1"
}
```

接下来在当前目录运行 sslocal。
