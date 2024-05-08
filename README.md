[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# douban-scanner

> 豆瓣扫描器，一个用来抓取豆瓣 “书影音” 数据的 CLI 工具

## 安装

确保当前系统已经具备 Node.js 环境

打开终端，执行下面的命令以安装：

``` shell
npm install -g douban-scanner
```

验证是否安装成功：

``` shell
dscan --version
```

获取帮助信息：

``` shell
dscan --help

# 获取特定子命令的帮助信息
dscan config --help
dscan get --help
```



## 使用示例

配置豆瓣账户

``` shell
dscan config user-id xxxxx # user-id 来自 key 为 dbcl2 的 cookie 值中
```

获取用户豆瓣读书数据

``` shell
dscan get book
dscan get book --type wish # 仅获取 “想读” 的书籍数据
```



## 部分命令帮助信息

``` shell
Usage: dscan [options] [command]

Options:
  -v --version          输出版本号
  -h --help             显示命令的帮助

Commands:
  config [key] [value]  设置或读取配置
  get                   获取用户的豆瓣书/影/音资源
  refresh               强制刷新缓存数据
```

``` shell
Usage: dscan get [options] [command]

获取用户的豆瓣书/影/音资源

Options:
  -h --help        显示命令的帮助

Commands:
  book [options]   获取用户的豆瓣读书资源
  movie [options]  获取用户的豆瓣电影资源
  music [options]  获取用户的豆瓣音乐资源
```

``` shell
Usage: dscan get book [options]

获取用户的豆瓣读书资源

Options:
  --type <value>  资源类型 `wish/do/collect`
  -h --help       显示命令的帮助
```

``` shell
Usage: dscan refresh [options] [command]

强制刷新缓存数据

Options:
  -h --help       显示命令的帮助

Commands:
  user            强制刷新用户数据
  book <res-id>   强制刷新豆瓣读书指定资源
  movie <res-id>  强制刷新豆瓣电影指定资源
  music <res-id>  强制刷新豆瓣音乐指定资源
```

## 鸣谢

- 后端爬虫数据缓存服务：[mouban](https://github.com/mythsman/mouban)
- Node.js 环境 CLI 解决方案：[Commander.js](https://github.com/tj/commander.js)
- JavaScript 代码规范：[JavaScript Standard Style](https://standardjs.com/readme-zhcn.html)

