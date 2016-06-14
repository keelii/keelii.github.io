---
layout: post
title: "免费 https 证书（Let's Encrypt）申请与配置"
date: 2016-06-12 18:04:47 +0800
comments: true
categories: WebDev
tag: https
---

之前要申请免费的 https 证书操作步骤相当麻烦，今天看到有人在讨论，就搜索了一下。发现现在申请步骤简单多了。
<!--more-->

## 1. 下载 certbot

```bash
git clone https://github.com/certbot/certbot
cd certbot
./certbot-auto --help
```

解压打开执行就会有相关提示

## 2. 生成免费证书

```bash
./certbot-auto certonly --webroot --agree-tos -v -t --email 邮箱地址 -w 网站根目录 -d 网站域名
./certbot-auto certonly --webroot --agree-tos -v -t --email keeliizhou@gmail.com -w /path/to/your/web/root -d note.crazy4code.com
```

__注意__ 这里 默认会自动生成 /__网站根目录__/.well-known/acme-challenge，然后 shell 脚本会对应的访问 __网站域名__/.well-known/acme-challenge

如果返回正常就确认了你对这个网站的所有权，就能顺利生成

## 3. 获取证书

如果上面的步骤正常 shell 脚本会展示如下信息：

```
- Congratulations! Your certificate and chain have been saved at
/etc/letsencrypt/live/网站域名/fullchain.pem
...
```

## 4. 生成 dhparams

使用 openssl 工具生成 dhparams

```bash
openssl dhparam -out /etc/ssl/certs/dhparams.pem 2048
```

## 5. 配置 Nginx

打开 nginx server 配置文件加入如下设置：

```nginx
listen 443

ssl on;
ssl_certificate /etc/letsencrypt/live/网站域名/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/网站域名/privkey.pem;
ssl_dhparam /etc/ssl/certs/dhparams.pem;
ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers HIGH:!aNULL:!MD5;
```

然后重启 nginx 服务就可以了

## 6. 强制跳转 https

https 默认是监听 443 端口的，没开启 https 访问的话一般默认是 80 端口。如果你确定网站 80 端口上的站点都支持 https 的话加入下面的配件可以自动重定向到 https

```nginx
server {
    listen 80;
    server_name your.domain.com;
    return 301 https://$server_name$request_uri;
}
```
