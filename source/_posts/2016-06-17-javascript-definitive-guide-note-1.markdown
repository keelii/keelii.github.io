---
layout: post
title: "《JavaScript 权威指南》读书笔记 2 - 词法结构"
date: 2016-06-16 13:06:13 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

## 词法结构（Lexical Structure）

词法结构是程序语言的一套基础性规则，用来描述如何使用这门语言来编写程序

<!--more-->

### 字符集

JavasSript 程序是用 [Unicode](https://zh.wikipedia.org/wiki/Unicode) __字符集__ 编写的，Unicode 是 ASCII 和 Latin-1 的超集，支持几乎所有在用的语言。ECMAScript 3 要求 JavaScript 的实现必须支持 Unicode 2.1 及后续版本，ECMAScript 5 则要求支持 Unicode 3 及其以后的版本

### 区分大小写

JavaScript 是区分大小写的。关键字、变量、函数名和所有的标识符（identifier）都必须采取一致的大小写形式

需要注意的是 HTML, HTML 5（标签、属性名）并不区分大小写，XHTML 是区分大小写的，但是现代浏览器通常有容错能力，即使标签名、属性名大小写乱用也会正常解析。特别注意 HTML 标签的 __属性值__ 是区分大小写的，比如

```html
<!-- select 和 Select 是两个不同的 CSS 选择器 -->
<div class="selector Selector"></div>
```

### 空格、换行和格式控制符号

JavaScript 会忽略程序中标识（token）之间的空格。多数情况下，JavaScript 会忽略换行符。

JavaScript 会识别下面的空白字符

* 普通空格字符（\u0020）
* 水平制表符（\u0009）
* 垂直制表符（\u000b）
* 换页符（\u000c）
* 不中断空白符（\u00a0）
* 字节序标记（\ufeff）

JavaScript 会识别下面的字符识别为行结束符

* 换行符（\u000a）
* 回车符（\u000d）
* 行分割符（\u2028）
* 段分割符（\u2029）

__回车符加换行符在一起被解析为一个单行结束符__

### Unicode 转义序列

在有的计算机硬件和软件里面无法显示 Unicode 字符全集，JavaScript 定义了一种特殊序列，使用 6 个 ASCII 字符来代表任意 16 位 Unicode 内码。这些内码均以 \u 为前缀，其后跟随 4 个十六进制数。这种 Unicode 转义写法可以用在 JavaScript 字符串直接量、正则表达式直接量和标识符（除关键字）中。例如：

{% raw %}
```javascript
"\u4F60\u597D\uFF0C\u4E16\u754C" === "你好，世界"   // => true
// 注意由于 \u 后面的 4 个16进制数并不区分大小写，所以 unicode 码并不区分大小写
"\u4f60\u597d\uff0c\u4e16\u754c" === "你好，世界"   // => true
```
{% endraw %}


注意中的 Unicode 码是不会被 JavaScript 转义的

### 注释

注释类似 Java 和 C，多行注释 __不能嵌套__

{% raw %}
```javascript
// 这是单行注释
/* 这是多行注释 */
/**
 * 这也是多行注释
 */
```
{% endraw %}

### 直接量

直接量（literal）就是程序中直接使用的数据值


{% raw %}
```javascript
12             // 数字
1.2            // 小数数字
'hello'        // 字符串
true           // 布尔真
false          // 布尔假
/javascript/gi // 正则表达式直接量
```
{% endraw %}

### 标识符和保留字

__标识符__ （indetifiers）就是一个名字，用来对变量和函数命名，JavaScript 标识符必须以字母、下划线（_）或美元符（$）开头

也可以使用 Unicode 字符全集，比如：

```javascript
var 你好 = '你';
var π = 3.14;
你好                // => "你"
π                   // => 3.14
```

__保留字__（Reserved Words）是 JavaScript 用做自己关键字的标识符，写程序的时候要避免使用这些标识符来命名

> break delete function return typeof case do if switch var catch else in this void continue false instanceof throw while debugger finally new true with default for null try

ECMAScript 5 中多保留了这些关键字，未来可能会用到

> class const enum export extends import super

下面这些关键字在普通 JavaScript 代码中是合法的，但是在严格模式下是保留字：

implements let private public yield interface package protected static

JavaScript 中定义了很多全局变量和当函数，要 __避免__ 使用这些名字做变量名或函数名，比如：arguments encodeURI JSON Math 等

### 可选分号

通常来说 JavaScript 语句通常用分号（;）分隔，但是多数情况下 JavaScript 解析器会自动添加分号，所以有的程序员不喜欢加分号，如果代码有正确的书写这样也是可行的

这样两个分号可以省略

```javascript
var a = 3;
var b = 4;
```

如果写在一行就不能省略

```javascript
var a = 3; var b = 4;
```

下面的代码

```javascript
var a
a
=
3
console.log(a)
```
JavaScript 将其解析为：

```javascript
var a; a = 3; console.log(a);
```

> 一般情况下如果一条语句以「(」、「[」、「/」，「+」或「-」开始，那么它极有可能和前一条语句合在一起解析

## 引用

* Unicode https://zh.wikipedia.org/wiki/Unicode
