---
title: 使用 ssh key 登陆 OpenWrt
date: 2014-08-19 00:00:00 Z
path: /openwrt-authorized-key
tags:
- openwrt
- ssh
layout: post
topics:
- device
---

自己在路由器上跑了个不稳定版本的 OpenWrt，再加上 Netgear 4300 的性能也一般，在上面跑 shadowsocks，
过段时间还是需要重启下的，每次重启都需要重新设定一次路由规则，所以要经常链接路由 SSH，但每次都要输密码就很繁琐，不过 OpenWrt 也是基于 linux 的开源版本，肯定是能通过 ssh key 免密码登陆的。<!--more-->

## 本地生成 key
打开用户根目录创建 .ssh 目录，并生成 key( 之前有创建过请忽略)

```shell
cd ~/ mkdir .ssh && cd .ssh
ssh-keygen -t dsa
```

## 上传 key
把本地生成的 key 上传到 OpenWrt，同时创建authorized_key

```shell
scp ~/.ssh/id_dsa.pub root@192.168.1.1:/tmp
ssh root@192.168.1.1
cd /etc/dropbear
cat /tmp/id_*.pub >> authorized_keys
chmod 0600 authorized_keys
```
