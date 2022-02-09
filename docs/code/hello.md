---
date: 2022-02-10
title: VitePress
description: vitepress 搭建个人博客
tags:
- html
- JavaScript
- TypeScript
- vitejs
- Vue
- vitepress
---

# VitePress

## 入门项目搭建

[VitePress](https://vitepress.vuejs.org/) 是 [VuePress](https://vuepress.vuejs.org/)的兄弟, 它建立在 [Vite](https://vitejs.dev/)上。

本节将帮助您从头开始构建一个基本的 VitePress 文档站点。如果您已经有一个现有项目并希望在项目中保留文档，请从第 3 步开始。

- **Step. 1**：创建并更改为新目录。

  ```bash
  $ mkdir vitepress-starter && cd vitepress-starter
  ```

- **Step. 2**：使用您喜欢的包管理器进行初始化。

  ```bash
  $ yarn init
  ```

- **Step. 3**：本地安装VitePress。

  ```bash
  $ yarn add --dev vitepress
  ```

- **Step. 4**：创建您的第一个文档。

  ```bash
  $ mkdir docs && echo '# Hello VitePress' > docs/index.md
  ```

- **Step. 5**：添加一些脚本到`package.json`.

  ```json
  {
    "scripts": {
      "docs:dev": "vitepress dev docs",
      "docs:build": "vitepress build docs",
      "docs:serve": "vitepress serve docs"
    }
  }
  ```

- **Step. 6**：在本地服务器上服务文档站点。

  ```bash
  $ yarn docs:dev
  ```

  VitePress 将在`http://localhost:3000`.

到目前为止，您应该拥有一个基本但功能强大的 VitePress 文档站点。

当您的文档站点开始成形时，请务必阅读[部署指南](https://vitepress.vuejs.org/guide/deploy.html)。



### 在服务器上构建项目

本地通过`yarn docs:build`打包📦项目，并通过ssh + scp上传至服务器

编写build.sh

```shell
echo "开始打包 📦"
yarn docs:build
echo "开始部署 👇"
ssh root@192.168.1.1 rm -rf /opt/www/blog/* && \
scp -r ./docs/.vitepress/dist/* root@192.168.1.1:/opt/www/blog
echo "部署完成 ✅"
```

 SSH免密登录 👉[传送门](https://yaojunluo.com/moyu/server.html#%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95)👈







> <!--外部链接-->
>
> - 官方文档：[https://vitepress.vuejs.org/](https://vitepress.vuejs.org/) 
> - 项目链接：[https://github.com/yaojunluo/vitepress-blog](https://github.com/yaojunluo/vitepress-blog)