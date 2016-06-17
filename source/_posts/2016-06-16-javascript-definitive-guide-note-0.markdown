---
layout: post
title: "《JavaScript 权威指南》读书笔记 1 - 简介"
date: 2016-06-16 13:06:13 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---


> 第一章 主要介绍 JavaScript 的大概情况、基本语法。之前没有 JavaScript 基础的看不懂也没关系，后续章节会有进一步的详细说明，我会通读一遍 《[JavaScript 权威指南](https://book.douban.com/subject/10549733/)》，然后根据个人的理解整理出来我认为重要的核心概念，同时我也会参考原版英文版 [JavaScript The Definitive Guide](http://shop.oreilly.com/product/9780596805531.do)，取一些关键性、重要的单词做补充

> 中文排版指南遵守 [中文文案排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines)，欢迎批评批正

<!--more-->

## JavaScript 简介

JavaScript 是面向 web 的编程语言，是一门 __高阶的__（high-level）、__动态的__（dynamic）、__弱类型的__（untyped）__解释型__（interpreted）编程语言，适合面向对象（oop）和函数式的（functional）编程风格。JavaScript 语法源自 Java 和 C，一等函数（first-class function）来自于 Scheme，它的基于原型继承来自于 Self

### JavaScript 的版本

JavaScript 语言规范由 ECMA 国际发布，版本号一般叫做 ECMAScript x，如：ECMAScript 3, ECMAScript 5, ECMAScript 6，简称 ES x

Mozilla 发布的 JavaScript 版本一般叫做 JavaScript x.x，如：JavaScript 1.3, JavaScript 1.5

Micorsoft 发布的 JavaScript 版本一般叫做 [JScript](https://zh.wikipedia.org/wiki/JScript)

可以这么说 __「Mozilla 和 Micorsoft 开发的浏览器中 JavaScript内核一般都实现了某个 ECMAScript 版本的规范」__

JavaScript 语言核心有很多 API，比如：针对字符串、数组、正则、日期。但这些通常不包括输入输出 API（类似网络、存储、图形相关的特性），输入输出 API 一般是由 JavaScript 的宿主环境（host environment）提供的，通常是浏览器

### JavaScript 语言核心

#### 变量/赋值

快速预览下 JavaScript 变量的用法

```javascript
// 双斜线之后内容是单行注释
/* 这是多行注释 */

// 变更是表示值的一个符号名字，通过 var 关键字声明
var x;              // 声明一个变量 x

// 值可以通过等号赋值给变量
x = 0               // 现在变量 x 的值为 0
x                   // => 0 通过变量获取其值

// JavaScript 支持多种数据类型
x = 1;              // 数字
x = 0.01;           // 整数和实数都是数字（number）类型
x = "hello world"   // 字符串
x = 'JavaScript';   // ...
x = true;           // 布尔值
x = false;          // ...
x = null;           // 是一个特殊的值，意思是「空」
x = undefined;      // 和 null 非常累似

```

#### 对象/数组

JavaScript 中两个非常重要的数据类型是对象和数组

```javascript
// 对象是名/值对的集合，或字符串到值映射的集合
var book = {                // 对象由花括号括起来
    topic: 'JavaScript',    // book 对象的属性 topic 的值是 "JavaScript"
    fat: true
};

// 通过「.」或「[]」来访问对象属性
book.topic                  // => "JavaScript"
book.['fat']                // => true
book.author = 'Flanagan'    // 通过赋值给 book 对象创建一个新属性 author

// JavaScript 数组
var primes = [2, 3, 5, 7];
primes[0]                   // => 2 通过数组下标访问第一个元素
primes.length               // => 4 数组中元素的个数
primes[4] = 9               // => 9 添加新元素
primes[6] = 11              // => 11 此时数组变成 [2, 3, 5, 7, 9, undefined, 11], 长度也变为 7

// 对象数组
var points = [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
];

// 数组对象
var data = {
    listA: [1, 3, 5],
    listB: [2, 4, 6]
};
```

#### 表达式/运算符

通过方括号定义数组元素和通过花括号定义对象属性名和值的语法称为 __初始化表达式__（initializer expression），表达式是 JavaScript 中的一个短语，这个短语可以通过运算得出一个值。通过「.」和「[]」来引用对象属性或数组元素的值就构成一个表达式。上面的代码中注释中箭头（=>）后的值就是表达式的运算结果

JavaScript 中最常见的表达式写法就是像下面代码一样使用运算符（operator）,运算符作用于操作数，生成一个新的值

```javascript
// 最常见的是算术运算符
3 + 2                     // => 5 加法
3 - 2                     // => 1 减法
3 * 2                     // => 6 乘法
3 / 2                     // => 1.5 除法
points[1].x - points[0].x // => 1 复杂的操作数运算
'3' + '2'                 // => '32' 字符串连接

                          // 运算符简写形式
var count = 0;
count++;                  // 自增1
count--;                  // 自减1
count += 2;               // 自加2, 相当于 count = count + 2
count *= 3;               // ...
count                     // => 6 变量名本身也是表达式

var x = 2, y = 3
x == y                    // => false
x != y                    // => true
x < y                     // => true
x <= y                    // => true
x == y                    // => false
'two' == 'three'          // => false
'two' > 'three'           // => true 'tw' 在字母表中的索引大于 'th'
false == (x > y)          // => true

                          // 逻辑运算符
(x == 2) && (y == 3)      // true
(x > 2) && (y < 3)        // false
!(x == y)                 // true
```

如果 JavaScript 中的「短语」是表达式，那么整个句子就称做 __语句__（statement），以分号结束的行都是一条语句。语句和表达式有很多共同之处

> 粗略了讲，表达式仅仅计算出一个值并不进行其它操作，不会改变程序的运行状态，而语句并不包含一个值（或者说它包含的值我们并不关心），但它们改变了程序运行状态


#### 函数

函数是带有名称（named）和参数的 JavaScript 代码片段，可以一次定义多次调用

```javascript

function plus1(x) {        // 定义了一个名为 plus1 的函数，带有参数 x
    return x + 1;          // 返回一个比传入参数大 1 的数值
}                          // 函数代码块是由花括号包裹起来的部分
plus1(3)                   // => 4 函数调用结果为 3+1

var square = function(x) { // 函数是一种值，可以赋值给变量
    return x * x;
};

square(plus1(3))           // => 16 在一个表达式中调用两个函数

```

当函数和对象合写在一起时，当函数就变成了「方法」（method）:

```javascript
// 当函数赋值给对象的属性，我们称为「方法」，所有 JavaScript 对象都含有方法
var a = [];             // 创建一个空数组
a.push(1, 2, 3);        // 调用数组的添加元素方法
a.reverse();            // 调用数组的次序反转方法

// 自定义方法
points.dist = function() {
    var p1 = this[0];
    var p2 = this[1];
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    return Math.sqrt(a*a + b*b) // 勾股定理，用 Math.sqrt 来计算平方根
}
points.dist();                  // => 求得两个点之间的距离
```

#### 面向对象

JavaScript 中的面向对象特性和传统语言的很大的区别，下面展示一个类用来表示 2D 平面中的几何点，这个类实例化后的对象有一个名为 r() 的方法，可以计算该点到原点的距离：

```javascript
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// 通过给构造函数的 prototype 对象赋值，来给 Point 对象定义方法
Point.prototype.r = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
};

// 使用 new 关键字和构造函数来创建一个实例 p
var p = new Point(1, 1);

// Point 的实例对象 p（以及所有 Point 的实例对象）继承了方法 r()
p.r()               // => 1.414...
```

### 客户端的 JavaScript

#### 嵌入到 HTML 中的 JavaScript

JavaScript 代码可以通过 &lt;script&gt; 标签来嵌入到 HTML 文件中

```html
<html>
<head>
    <script src="外链脚本文件.js"></script>
</head>
<body>
    <p>正常 HTML 段落</p>
    <script>
        // 这里可以写 JavaScript 代码
        // 通过弹出一个圣诞框来询问用户一个问题
        function moveon() {
            var answer = confirm('准备好了吗？');
            // 单击「确认」按钮，浏览器会跳转到 jd.com
            if (answer) window.location = 'jd.com';
        }

       setTimeout(moveon, 6000);
    </script>
</body>
</html>
```

#### 使用 JavaScript 操作 DOM

JavaScript 可以通过浏览器提供的 DOM API 来操作 HTML 元素

```javascript
// 调用 debug 传入字符串，JavaScript 会动态创建一个 HTML 节点并字符串内容显示其中
function debug(msg) {
    var log = document.getElementById('debuglog');

    if (!log) {
        log = document.createElement('div');
        log.id = 'debuglog';
        log.innerHTML = '<h1> Debug Log </h1>';
        document.body.appendChild(log);
    }

    var pre = document.createElement('pre');
    var text = document.createTextNode(msg);
    pre.appendChild(text);
    log.appendChild(pre);
}

debug('this is debug message');
```

#### 使用 JavaScript 操作 CSS 样式

JavaScript 可以通过浏览器提供的 DOM API 来操作 HTML 元素，从而影响 CSS 样式

```javascript
// 设置元素的 CSS 属性 display/visiblity
function hide(el, reflow) {
    if (reflow) {
        el.style.display = 'none';    // 隐藏元素
    } else {
        el.style.visibility = 'hide'; // 隐藏元素，但元素仍然占空间
    }
}
// 设置 HTML 元素的 class 属性，class 属性可以是多个（空格分割），如：<div class="c1 c2 c3">
function highlight(e) {
    if (!e.className) {
        e.className = 'hilite';
    } else {
        e.className += ' hilite';
    }
}
```

#### 使用 JavaScript 处理事件

JavaScript 通过注册事件函数来定义文档/用户的行为，比如：点击，鼠标 hover 等

给 HTML 元素添加事件处理程序的一种方法是直接给 HTML 元素添加行内的 on[event name]，比如给按钮绑定点击事件

```html
<script src="debug.js"></script>
<script src="hide.js"></script>
Hello
<button onclick="hide(this, true);debug('hide button1')">Hide1</button>
<button onclick="hide(this);debug('hide button2')">Hide2</button>
World
```

另外一种方法是调用元素的 __添加事件处理函数__，通常是 addEventListener 或 attachEvent（IE专用）

```javascript
// 注册 onload 事件，效果和在 HTML 上写 onload 是一样的
// 不过只有部分 HTML 元素支持，比如： img 标签的 onload
window.onload = function() {
    var images = document.getElementsByTagName('img');

    for (var i = 0, l = images.length; i < l; i++) {
        var image = images[i];
        if ( image.addEventListener )
            image.addEventListener('click', hide, false);
        else
            image.attachEvent('onclick', hide);
    }

    function hide(event) { event.target.style.visibility = 'hidden'; }
}
```
#### 使用 jQuery 库

使用 jQuery 类库会使 DOM 操作、事件绑定等操作非常方便，而且不用担心浏览器兼容问题（JavaScript api 层面的兼容）

```javascript
function debug(msg) {
    var $log = $('#debuglog');
    if (!$log.length) {
        log = $('<div id="debuglog"><h1>Debug Log</h1></div>');
        log.appendTo(document.body)
    }

    log.append($('<pre />').text(msg))
}
```

## 引用

* ECMAScript https://zh.wikipedia.org/wiki/ECMAScript
* JScript https://zh.wikipedia.org/wiki/JScript
