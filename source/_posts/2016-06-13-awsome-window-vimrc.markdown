---
layout: post
title: "可能是 Windows 下最漂亮的 Gvim 配置了"
date: 2016-06-13 21:25:57 +0800
comments: true
categories:
    - editor
tags:
    - vim
    - gVim
---

一直以来被称为编辑器之神的 vim 在 Windows 下很难发挥其强大的功能，本文从实用的角度阐述如何调校出一个比较好用的 vim

不过仍然要说明下，在众多 vim 构建版本中 Mac OS 平台的 MacVim 是我认为最好用的一个版本。由于自己公司主力用 Windows，又因笔者是一枚对编辑器颜值体验有要求的前端工程师， 所以才有了下文 ^!^

<!--more-->

先说明下开发环境：

* ThinkPad T450 (公司标配)
* Windows 7 SP1 64bit 企业版
* 编程语言 Javascript, HTML, CSS, NodeJS, Python

## 前言

本文旨在配置和使用 vim，并不适合太初级的 vim 用户，本文作者也不是 vim 死忠粉，经常混用 Webstrom 和 vim

## 开始

开始之前我们先看一眼 Windows 上安装 Gvim 的默认界面，我们将从这里开始一步步的学习和配置

[![gvim-default](https://cloud.githubusercontent.com/assets/458894/16011259/36c5df9e-31b7-11e6-8db5-ad09584ed39b.png)](https://cloud.githubusercontent.com/assets/458894/16011259/36c5df9e-31b7-11e6-8db5-ad09584ed39b.png)

## 配置 _vimrc

由于 vimrc 里面会有很多的配置项，为了避免混乱，我大概按自己的使用习惯分成了几个小组：

* Startup         - 编辑器启动时需要添加的一些配置
* General         - 通用配置
* Lang & Encoding - 语言和编码
* GUI             - 界面
* Format          - 基本的代码格式
* Keymap          - 通用的快捷键
* Plugin          - 插件相关（包括和当前插件相关的配置和快捷键等）
* Function        - vimrc 里面用到的常用方法

## Startup

{% raw %}
```vim
" Startup {{{
filetype indent plugin on


" vim 文件折叠方式为 marker
augroup ft_vim
    au!

    au FileType vim setlocal foldmethod=marker
augroup END
" }}}
```
{% endraw %}

设置 vim 相关文件打开后默认折叠方式为 marker，约定俗成的用三个花括号注释包裹起来，这样在你打开配置文件的时候 vim 就会帮你折叠起来，配置文件看起来就简洁多了，如图:

[![vim-fold-config](https://cloud.githubusercontent.com/assets/458894/16011261/372e3f3a-31b7-11e6-8e3f-16a8aa9c4fe2.png)](https://cloud.githubusercontent.com/assets/458894/16011261/372e3f3a-31b7-11e6-8e3f-16a8aa9c4fe2.png)

## General

{% raw %}
```vim
" General {{{
set nocompatible
set nobackup
set noswapfile
set history=1024
set autochdir
set whichwrap=b,s,<,>,[,]
set nobomb
set backspace=indent,eol,start whichwrap+=<,>,[,]
" Vim 的默认寄存器和系统剪贴板共享
set clipboard+=unnamed
" 设置 alt 键不映射到菜单栏
set winaltkeys=no
" }}}
```
{% endraw %}

基本上一眼就能看出来这是些啥玩意，不过后面两项目我个人感觉比较好用：

clipboard+=unnamed 比如你在其它地方 copy 了一段文字回到 vim 里面可以粘贴进来

winaltkeys=no 一般 windows 下应用程序的 alt 是用来定位菜单栏目的快捷键，我们需要禁用它，因为我们后面很多设置都需要使用 alt，需要使用 alt 来定位菜单的情况很少

## Lang & Encoding

{% raw %}
```vim
" Lang & Encoding {{{
set fileencodings=utf-8,gbk2312,gbk,gb18030,cp936
set encoding=utf-8
set langmenu=zh_CN
let $LANG = 'en_US.UTF-8'
"language messages zh_CN.UTF-8
" }}}
```
{% endraw %}

vim 里面设置编码的地方很多，上面这些配置可以保证不会出现乱码，像文件菜单、vim默认语言建议设置成 en_US

## GUI

{% raw %}
```vim
" GUI {{{
colorscheme Tomorrow-Night

source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim
set cursorline
set hlsearch
set number
" 窗口大小
set lines=35 columns=140
" 分割出来的窗口位于当前窗口下边/右边
set splitbelow
set splitright
"不显示工具/菜单栏
set guioptions-=T
set guioptions-=m
set guioptions-=L
set guioptions-=r
set guioptions-=b
" 使用内置 tab 样式而不是 gui
set guioptions-=e
set nolist
" set listchars=tab:▶\ ,eol:¬,trail:·,extends:>,precedes:<
set guifont=Inconsolata:h12:cANSI
" }}}
```
{% endraw %}

编辑器配色建议使用 Tomorrow-Night，下载文件 copy 到 colors 目录即可

从上面的设置可以看出来，为了得到一个简洁漂亮的界面，我们去掉了菜单栏、各种滚动条、使用 vim 内置 tab 而不是 gvim 系统的 tab 样式，注意很多开发者喜欢显示不可见字符，比如：tab 制表符、换行符号、尾空格等。

我自己并不喜欢这样，因为这样只会使界面看起来更零乱，尤其是某插件纵向标尺

字体方面个人推荐 Inconsolata 这个在我看来是 Windows 平台最漂亮的等宽字体了

此时你的编辑器应该好看了很多：

[![more-beauty-vim](https://cloud.githubusercontent.com/assets/458894/16011263/373facd4-31b7-11e6-8311-9b0c09d2425f.png)](https://cloud.githubusercontent.com/assets/458894/16011263/373facd4-31b7-11e6-8311-9b0c09d2425f.png)

## Format

{% raw %}
```vim
" Format {{{
set autoindent
set smartindent
set tabstop=4
set expandtab
set softtabstop=4
set foldmethod=indent
syntax on
" }}}
```
{% endraw %}

这个设置容易引起争议，我自己是这么个设置，大家按个人喜好就行了，反正我是不建议使用 tab 的，对代码格式有强迫症的人一般都会设置 foldmethod=indent

## Keymap

可以说快捷键是每个编辑器必备的功能，科学的设置快捷键能很大程度的提高效率。快捷键的设置要遵循一个规则：尽量不要修改系统默认配置的快捷键，非要设置的话选择好相应的模式

{% raw %}
```vim
" Keymap {{{
let mapleader=","

nmap <leader>s :source $VIM/_vimrc<cr>
nmap <leader>e :e $VIM/_vimrc<cr>

map <leader>tn :tabnew<cr>
map <leader>tc :tabclose<cr>
map <leader>th :tabp<cr>
map <leader>tl :tabn<cr>

" 移动分割窗口
nmap <C-j> <C-W>j
nmap <C-k> <C-W>k
nmap <C-h> <C-W>h
nmap <C-l> <C-W>l

" 正常模式下 alt+j,k,h,l 调整分割窗口大小
nnoremap <M-j> :resize +5<cr>
nnoremap <M-k> :resize -5<cr>
nnoremap <M-h> :vertical resize -5<cr>
nnoremap <M-l> :vertical resize +5<cr>

" 插入模式移动光标 alt + 方向键
inoremap <M-j> <Down>
inoremap <M-k> <Up>
inoremap <M-h> <left>
inoremap <M-l> <Right>

" IDE like delete
inoremap <C-BS> <Esc>bdei

nnoremap vv ^vg_
" 转换当前行为大写
inoremap <C-u> <esc>mzgUiw`za
" 命令模式下的行首尾
cnoremap <C-a> <home>
cnoremap <C-e> <end>

nnoremap <F2> :setlocal number!<cr>
nnoremap <leader>w :set wrap!<cr>

imap <C-v> "+gP
vmap <C-c> "+y
vnoremap <BS> d
vnoremap <C-C> "+y
vnoremap <C-Insert> "+y
imap <C-V>		"+gP
map <S-Insert>		"+gP
cmap <C-V>		<C-R>+
cmap <S-Insert>		<C-R>+

exe 'inoremap <script> <C-V>' paste#paste_cmd['i']
exe 'vnoremap <script> <C-V>' paste#paste_cmd['v']

" 打开当前目录 windows
map <leader>ex :!start explorer %:p:h<CR>

" 打开当前目录CMD
map <leader>cmd :!start<cr>
" 打印当前时间
map <F3> a<C-R>=strftime("%Y-%m-%d %a %I:%M %p")<CR><Esc>

" 复制当前文件/路径到剪贴板
nmap ,fn :let @*=substitute(expand("%"), "/", "\\", "g")<CR>
nmap ,fp :let @*=substitute(expand("%:p"), "/", "\\", "g")<CR>

" 设置切换Buffer快捷键"
nnoremap <C-left> :bn<CR>
nnoremap <C-right> :bp<CR>

" }}}
```
{% endraw %}

首页我们设置了 leaderkey 为逗号「,」，不要问为什么约定的就是它。别设置成空格就行了

注意「,e」和「,s」分别用编辑配置文件，刷新配置文件，后面的路径要按你自己的情况去写，我默认使用了 vim 安装目录里面的 vimrc

分屏编辑操作的时候经常要在不同的屏之间跳来跳去 「Ctrl + vim方向」设置跳转方便顺滑的切换，顺便说下我个人的习惯是在当前tab下编辑一个项目的文件，如果要临时维护其它项目就新开tab，每个tab单独编辑一个项目文件

后面还设置了一些和 Windows 默认编辑操作兼容的快捷键，比如：复制，粘贴

注意有个细节，因为 vim 里面多行操作快捷键是 Ctrl + v 和 windows 粘贴冲突了，一个机智的做法是仅仅在 vim 插件模式设置 Ctrl 为粘贴，正常模式 Ctril + v 进入多选模式，两全其美

插入模式下要移动光标 还得 ESC 一下进入插入模式，这样太麻烦了，使用 「alt + vim方向」就简单多了

## Plugin

插件方面根据我自己的工作内容和个人喜好，选择了以下几个，全部使用 vundle 来管理：

* NERDTree
* Vim-multiple-cursors
* Tabular
* Airline
* Ctrlp
* NERDCommenter
* Emmet
* SnipMate
* Fugitive
* Neocomplete

具体配置我就不帖代码了，可以上git上参观

SnipMate 这个插件很早之前的那个版本不维护了，现在最新版的非常强大，不过有另外两个依赖，默认是没有任何内置的 snippet 的，如果需要样版，可以安装这个插件（其实就是个git仓库，你可以换成自己的）

这里需要注意下 Neocomplete 这个代码实例插件是需要 lua 支持的，可能你需要手动编译一个带 lua 支持版本的 gvim，下篇文章 我将记录下自己在 Windows 上编译安装的过程

什么？你说为啥不装 YouCompleteMe，官方作者都不支持的插件就别折腾了吧，Neocomplete 这个实例插件对于我的情况来说已经够用了

## Function

常用方法这里我只有一个，移除尾空格

{% raw %}
```vim
" Function {{{
" Remove trailing whitespace when writing a buffer, but not for diff files.
" From: Vigil
" @see http://blog.bs2.to/post/EdwardLee/17961
function! RemoveTrailingWhitespace()
    if &ft != "diff"
        let b:curcol = col(".")
        let b:curline = line(".")
        silent! %s/\s\+$//
        silent! %s/\(\s*\n\)\+\%$//
        call cursor(b:curline, b:curcol)
    endif
endfunction
autocmd BufWritePre * call RemoveTrailingWhitespace()
" }}}
```
{% endraw %}


No picture U say a ... ?

[![complete-vimrc](https://cloud.githubusercontent.com/assets/458894/16011262/373cd644-31b7-11e6-8a62-f03f32cf5167.png)](https://cloud.githubusercontent.com/assets/458894/16011262/373cd644-31b7-11e6-8a62-f03f32cf5167.png)

这个是动图，不动戳大

[![gif-show-vim](https://cloud.githubusercontent.com/assets/458894/16011260/372e0722-31b7-11e6-887a-226747eec42f.gif)](https://cloud.githubusercontent.com/assets/458894/16011260/372e0722-31b7-11e6-887a-226747eec42f.gif)


## 结语

还有一点没说明，vimrc 里面的一些 windows 独有的设置我并没有加一些判断来兼容其它平台，这个是个人喜好而已，我会单独分开维护不同平台的配置文件，而不是全部放在一起各种逻辑判断

## 引用

[完整配置文件](https://link.zhihu.com/?target=https%3A//gist.github.com/keelii/1aab5f9aa5b47afa651c7fc84b8e9875)
