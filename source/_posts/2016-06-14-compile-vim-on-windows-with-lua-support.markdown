---
layout: post
title: "Windows 下使用 MinGW 编译安装 (g)vim 添加 lua 等编程语言支持"
date: 2016-06-14 10:39:40 +0800
comments: true
categories:
    - editor
tags:
    - vim
    - editor
    - MinGW
---

vim 一些插件需要其它编程语言支持，比如 neocomplete 自动补全插件需要 lua
官方下载的 vim 版本是不带这种第三方语言支持的，得自己手动编译一个支持的版本。但是 Windows 下编译源代码需要选择一个 GUN 工具集，比较流行的有 Cygwin, MinGW。主要是为了使用一些编译源码的工具，比如 gcc, make等
<!--more-->

需要下载的链接都在这里了：

* [MinGW-14.0(Distro)](https://nuwen.net/files/mingw/mingw-14.0.exe)
* [lua-5.2.4_Win64_bin](http://tenet.dl.sourceforge.net/project/luabinaries/5.2.4/Tools%20Executables/lua-5.2.4_Win64_bin.zip)
* [lua-5.2.4_Win64_dllw4_lib](http://tenet.dl.sourceforge.net/project/luabinaries/5.2.4/Windows%20Libraries/Dynamic/lua-5.2.4_Win64_dllw4_lib.zip)
* [Vim](https://github.com/vim/vim)

我自己的电脑环境配置是：__Windows 7 SP1 64bit 企业版__

## MinGW

官方的 MinGW 安装了需要自己手动选择工具再安装到系统，有个简单的办法，直接使用上页的链接下载打好包的 Distro 版本，下载完就解压到任意目录即可，我放在了 C:\MinGW

## Lua

下载上面链接中 Windows 64bit 中的编译好的二进制文件 和 库文件，放在一个目录，比如我放在 C:\lua, 如图：

![lua dir](https://cloud.githubusercontent.com/assets/458894/16029645/de798c1c-321c-11e6-8ad5-39b852159e0e.png)

## Vim

去 vim 官方 github 仓库下载最新源代码，解压到任意目录。进入源码 src 目录，打开 os_mswin.c 注释掉下面的代码，这样 vim 就可以支持非等宽字体了

```c
#ifndef FEAT_PROPORTIONAL_FONTS
    /* Ignore non-monospace fonts without further ado */
    /*
    * hzmangel: I need non-monospace fonts!
    if ((ntm->tmPitchAndFamily & 1) != 0)
    return 1;
    */
#endif
```

## 编译源文件

打开 MinGW 命令窗口 (__C:\MinGW\open_distro_window.bat__)，cd 到 vim 源代码的 src 目录，执行以下命令：

```bash
make -f Make_ming.mak GUI=yes FEATURES=HUGE MBYTE=yes IME=yes GIME=yes DYNAMIC_IME=yes OLE=yes PYTHON="C:\Python27" DYNAMIC_PYTHON=yes PYTHON_VER=27 CSCOPE=yes DEBUG=no LUA="C:\Lua" DYNAMIC_LUA=yes LUA_VER=52 USERNAME=keelii USERDOMAIN=keeliizhou@gmail.com ARCH=x86-64 gvim.exe
```

注意：我系统之前安装过 python27 到 C 盘，你可以根据自己的情况选择。关于 lua 的两个参数要写对：lua 安装目录 __LUA="C:\Lua"__ 和 lua 版本 __LUA_VER=52__，其它编译语言也大同小异

如果编译成功的话不会有错误提示，并在当前目录生成 gvim.exe, 这个 exe 就是我们需要的带有 lua 支持的 vim 可执行文件，把这个文件和 __C:\lua\lua.dll__ 复制到你的 vim runtime文件夹，这时候就可以把 runtime 重命名一个放到其它你想要的目录，点击 gvim.exe 就可以了

第一次执行 vim 需要先注册一下，出现弹窗口点确定就行了。

进入命令模式，输出 echo has('lua') 来验证下是否已开启 lua 支持，如果显示 1 就说明 OK 了

![echo has lua](https://cloud.githubusercontent.com/assets/458894/16029743/d6340b12-321d-11e6-8eec-e7d13156d12a.png)

![has lua support](https://cloud.githubusercontent.com/assets/458894/16029744/d666cd68-321d-11e6-95a0-0ac09dffef1a.png)

## 编译问题更新

发现编译完直接使用会有 「找不到 VIMRUN.EXE」提示，解决方法：从官方安装版的 vim 根目录把 vimrun.exe 复制到你的 runtime 文件夹下即可

知友 @fantiq 反馈某些情况下会报下面的错误，原因可能是 MinGW 下的 mkdir 命令有问题，无法创建目录，手动执行`mkdir gobjx86-64` 就可以解决了

```bash
mkdir -p gobjx86-64
process_begin: CreateProcess(NULL, mkdir -p gobjx86-64, ...) failed.
make (e=2): 系统找不到指定的文件。
make: *** [Make_cyg_ming.mak:860: gobjx86-64] Error 2
```
