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



## 部分命令帮助信息（待补充）

``` shell
Usage: dscan [options] [command]

Options:
  -V, --version         output the version number
  -h, --help            display help for command

Commands:
  config [key] [value]  设置或读取配置
  get                   获取用户的豆瓣书/影/音资源
```

``` shell
Usage: dscan get [options] [command]

获取用户的豆瓣书/影/音资源

Options:
  -h, --help       display help for command

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
```

