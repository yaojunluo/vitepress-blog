---
date: 2022-02-09
title: 服务器常用技巧
description: 服务器常见的一些技巧
tags:
- Nginx
- Linux
- Golang
---

# 服务器知识汇总


## SSH
在开发过程中可能会用到的ssh技巧
### 免密登录
免密登录：客户端A（以下简称A）免密访问服务端B（以下简称B）

1. 在A生成一对密钥，基于空口令生成ssh密钥
```bash
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
```
参数说明：
  * -t 加密算法类型，这里是使用rsa算法
  * -P 指定私钥的密码，不需要可以不指定
  * -f 指定生成秘钥对保持的位置
打印信息：
```bash
Your identification has been saved in /Users/xxx/.ssh/id_rsa
Your public key has been saved in /Users/xxx/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:xxxx+xx/xx xxx@xxxs-MacBook-Air.local
The key's randomart image is:
+---[RSA 2048]----+
|     ...*.o.     |
|    o  ++B.o.    |
|   o . . +O.+    |
|    + o .=.* +   |
|     +  A.* o o  |
|       . .o o... |
|           = *o  |
|          o X.o  |
|        B..= *o. |
+----[SHA256]-----+
```

2. 使用`ssh-copy-id`将A的公钥发给B（假设IP为192.168.1.1）

```
ssh-copy-id root@192.168.1.1
```

错误处理：执行`ssh-copy-id`卡住，可能是由于B主机上已经存在A信息，删除B的`~/.ssh/authroized_keys`重新执行命令

3. 运行`ssh root@192.168.1.1`, 免密登录成功


### 远程拷贝 scp
scp工具，基于ssh远程安全登录的，可以将主机A上的文件或目录拷贝给主机B并且改名字，也可以将主机B上的文件或目录下载到主机A中，同时也支持修改文件名。

* **远程拷贝文件**
  
  将A上的/etc/profile文件拷贝到B根目录下
  
  ```bash
  scp /etc/profile root@192.168.1.1:/
  ```
  
  将A上的/etc/profile文件拷贝到B的根目录下,并改名为profile.txt
  
  ```bash
  scp /etc/profile root@192.168.1.1:/profile.txt
  ```
  
  
  
* **远程拷贝目录**
  
  将A上的/bin目录拷贝到B根目录下
  
  ```bash
  scp -r /bin root@A:/home/ （-r 表示递归）
  ```
  
* **下载文件到本地**
  
  将B上的/profile下载到本地并改名为profile.txt
  
  ```bash
  scp root@192.168.1.1:/profile ./profile.txt
  ```
  
* **下载目录到本地**

  将B上的/bin下载到本地并改名为bin.bak
  
  ```bash
  scp -r root@192.168.1.1:/home/bin ./bin.bak
  ```