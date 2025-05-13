# 介绍

开源安全测试工具的展示页面的一个小demo

# 运行
```
npm install
npm run dev
```
共两个演示页面
- http://localhost:5174/SecurityTools-Assessment-WEB/
- http://localhost:5174/SecurityTools-Assessment-WEB/tool/codeql

# 部署
先编译
```
npm run build
```
然后参考
https://docs.atomgit.com/app/pageshelp
https://docs.atomgit.com/app/pages


个人 pages 仓库：(注：除了下面的操作还需要到仓库里设置一下page页面的分支)

1.创建或选择个人名下的一个仓库（如 B 仓库，B仓库需为空仓）作为 pages 仓库

2.将本应用安装到个人名下的 B 仓库

3.将编译好的内容（dist 或build 等编译结果目录，入口文件为 index.html）初始化为单独的 git 仓，推送到 B 仓库

4.访问 pages 站点，地址规则为： https://username.atomgit.net/B (username为用户的用户名，如 john， https://john.atomgit.net/docs)

您也可在仓库的【设置】-【pages】中查看和管理 pages 地址和设置信息

