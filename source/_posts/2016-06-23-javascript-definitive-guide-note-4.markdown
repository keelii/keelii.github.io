---
layout: post
title: "《JavaScript 权威指南》读书笔记 5 - 语句"
date: 2016-06-20 19:10:28 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

## 语句（statement）

表达式在 JavaScript 中是短语，那么语句就是 JavaScript 整句或命令，语句以分号结束，表达式计算出一个值，语句用来执行以使某件事情发生

### 表达式语句

赋值语句、递增/减运算、delete 运算符删除对象属性、函数调用都是表达式语句

```javascript
gretting = "Hello " + name;
i *= 3;
count++;
delete o.x;
alert(greeting)
window.close();
Math.cos(x)
cs = Math.cos(x);
```

### 复合语句和空语句

逗号运算符将几个表达式连接在一起形成一个表达式，同样，JavaScript 中还可以将多条语句联合在一起，形成一条复合语句（compound statement）。只须用花括号括起来即可，下面几行代码就可以当成一条单独语句

```javascript
{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(x) = " cx);
}
```

需要注意的两点：

* 语句块的结尾不需要分号。块中的原始语句 __必须__ 以分号结束
* 语句块中的行缩进不是必须的，但是合理的缩进更容易理解
* 语句块并没有块级作用域名，语句块中声明的变量不是语句块私有的

空语句（empty statement）允许包含 0 条语句，空语句在初化一个数组时偶尔会用到

```javascript
var a = Array(50);
a                                           // => [undefined,,,,undefined]
for (i = 0; i < a.length; a[i++] = 0) ;     // 初始化一个数组，注意末尾的分号不能少
a                                           // => [0,,,0]
```

这个循环中，所有操作都在表达式 a[i++]=0 中完成，这里并不需要任何循环体。然而 JavaScript 需要循环体中 __至少包含一条语句__，因此，这里只使用了一个单独的分号来表示一条空语句

### 声明语句

var 和 function 都是声明语句，声明语句本身什么也不做，只用来更好地组织代码的语义

#### var

var 语句用来声明一个或者多个变量，用法如下：

> var name_1 [= value_1] [,..., name_n [= value_n]]

如果 var 语句出现在函数体内，那么它定义的是一个 __局部变量__，其作用域就是这个函数，如果在顶层代码中使用 var 语句，它声明的是 __全局变量__，整个程序中都是可用的

全局变量是全局对象的属性。然而通过 var 声明的全局变量无法通过 delete 删除

如果 var 语句中的变量没有指定初始化表达式，那么这个变量的值初始为 undefined

#### function

函数声明的语句的语法如下：

>function fun_name([arg1 [, arg2 [..., argn]]]) {
>    statements
>}

```javascript
var f = function(x) { return x+1; };        // 通过 var 声明函数
function f(x) { return x+1; }
```

### 条件语句

#### if

>if (expression)
>    statement

这种形式中，需要计算 expression 的值，如果结果是真值，那么就执行 statement

为了避免歧义，建议 __总是__ 给 if 语句添加花括号


#### else if

>if (expression) {
>    statement
>} else if (expression) {
>    statement
>}

#### switch

>switch(expression) {
>    statement
>}

### 循环

#### while

```javascript
var count = 0;
while (count < 10) {
    console.log(count);
    count++
}
```

#### do/while

```javascript
function printArray(a) {
    var len = a.length, i = 0;
    if (len == 0) {
        console.log('Empty Array);
    } else {
        do {
            console.log(a[i]);
        } while(++i < len);
    }
}
```

#### for

>for (initialize; test; increment)
>    statement

多数情况下与之等价的 while 循环写法：

>initialize;
>while(test) {
>    statement
>    increment;
>}

#### for/in

>for (variable in object)
>    statement

variable 通常是一个变量名（也可以是个表达式），也可以是一个可以产生左值的表达式或者一个通过 var 语句声明的变量，总之必须是一个适用于赋值表达式左侧的值。object 是一个 __表达式__，这个表达式计算结果是一个对象

在执行 for/in 语句的过程中，JavaScript 解释器首先计算 object 表达式。如果表达式为 null 或者 undefined，解释器将会跳过循环并挂靠后续代码（ECMAScript 3 可能会招聘一个类型错误异常）。如果表达式等于一个原始值，这个原始值将会转换为与之对应的包装对象（wrapper object）否则，expression 本身已经是对象了。JavaScript 会依次遍历 __可枚举__ 的对象属性来执行循环体语句
