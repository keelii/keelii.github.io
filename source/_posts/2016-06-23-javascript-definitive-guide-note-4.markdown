---
layout: post
title: "《JavaScript 权威指南》读书笔记 5 - 语句"
date: 2016-06-23 19:10:28 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

## 语句（statement）

表达式在 JavaScript 中是短语，那么语句就是 JavaScript 整句或命令，语句以分号结束。表达式计算出一个值，语句用来执行以使某件事情发生

<!--more-->

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

```javascript
var name_1 [= value_1] [,..., name_n [= value_n]]
```

如果 var 语句出现在函数体内，那么它定义的是一个 __局部变量__，其作用域就是这个函数，如果在顶层代码中使用 var 语句，它声明的是 __全局变量__，整个程序中都是可用的

全局变量是全局对象的属性。然而通过 var 声明的全局变量 __无法__ 通过 delete 删除

如果 var 语句中的变量没有指定初始化表达式，那么这个变量的值初始为 undefined

#### function

函数声明的语句的语法如下：

```javascript
function fun_name([arg1 [, arg2 [..., argn]]]) {
    statements
}
```

```javascript
var f = function(x) { return x+1; };        // 通过 var 声明函数
function f(x) { return x+1; }
```

### 条件语句

#### if

```javascript
if (expression) {
    statement
}
```

这种形式中，需要计算 expression 的值，如果结果是真值，那么就执行 statement

为了避免歧义，建议 __总是__ 给 if 语句添加花括号


#### else if

```javascript
if (expression) {
    statement
} else if (expression) {
    statement
}
```

#### switch

```javascript
switch(expression) {
    statement
}
```

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

for 循环的 __执行顺序__ 是：

1. initialize
2. test 条件为真
3. statement
4. increment

```javascript
for (initialize; test; increment) {
    statement
}
```

多数情况下与之等价的 while 循环写法：

```javascript
initialize;
while(test) {
    statement
    increment;
}
```

#### for/in

```javascript
for (variable in object) {
    statement
}
```

variable 通常是一个变量名（也可以是个表达式），也可以是一个可以产生左值的表达式或者一个通过 var 语句声明的变量，总之必须是一个适用于赋值表达式左侧的值。object 是一个 __表达式__，这个表达式计算结果是一个对象

在执行 for/in 语句的过程中，JavaScript 解释器首先计算 object 表达式。如果表达式为 null 或者 undefined，解释器将会跳过循环并执行后续代码（ECMAScript 3 可能会抛出一个类型错误异常）。如果表达式等于一个原始值，这个原始值将会转换为与之对应的 [包装对象](/2016/06/16/javascript-definitive-guide-note-2/)（wrapper object）否则，expression 本身已经是对象了。JavaScript 会依次遍历 __可枚举__ 的对象属性来执行循环体语句

for/in 循环并不会遍历对象的所有属性，只有「可枚举」（emumerable）的属性才会遍历到。JavaScript 语言核心所定义的内置方法就 __不是__「可枚举的」，比如，所有对象都有方法 toString()，但 for/in 循环并不枚举 toString 这个属性，还有很多内置属性也是不可枚举的（nonenumerable）。而代码中定义的所有属性和方法都是可枚举的

__属性枚举的顺序__

ECMAScript 规范并没有指定 for/in 循环按照何种顺序来枚举对象属性。但实际上，主流浏览器厂商的 JavaScript 实现是按照 __属性定义的先后顺序__ 来枚举简单对象的属性

### 跳转

JavaScript 中另一类语句是跳转语句（jump statement）。通常有 break, continue, return, throw

#### 标签语句

语句是可以添加标签的，标签由语句前的标识符和冒号组成：

```javascript
indetifier: statement
```

标识符必须是一个合法的 JavaScript 标识符

```javascript
mainloop: while(token != null) {
    // statement
    continue mainloop;
}
```

#### break 语句

单独使用 break 语句的作用是立即退出最内层的 __循环__ 或者 __switch 语句__，break 关键字后面也可以跟一个语句标签，当 break 和标签一块使用时，程序将跳转到这个标签所标识的语句块的结束

__不管 break 语句带不带标签，它的控制权都无法超过函数的边界__

#### continue 语句

类似于 break，但是它不退出循环，而是转而执行下一次循环。continue 语句只能在循环体内使用，其它地方使用会报错

在不同类型的循环中，continue 的行为也是有所区别：

* 在 while 循环中，在循环开始处指定的 expression 会重复检测，如果检测结果为 true，循环休会从头开始执行
* 在 do/while 循环中，程序的执行直接跳到循环结尾处，这里会重新判断循环条件，之后才会继续下一次循环
* 在 for 循环中，首先计算自增表达式，然后再次检测 test 表达式，用以判断是否执行循环体
* 在 for/in 循环中，循环开始遍历下一个属性名，这个属性名赋给了指定的变量

需要注意的是 continue 语句在 while 和 for 循环中的区别，while 循环直接进入一下轮的循环条件判断，但 for 循环首先计算其 increment 表达式，然后判断循环条件，所以 for 循环并不能完全等价模拟出 while 循环

```javascript
// while 语句中的写法会造成死循环，for 语句则不会
// for 语句中的 increment 表达式总是会执行到
var i = 0;
while (i < 10) {
    if (i < 5 ) {
        continue;
    }
    console.log(i);
    i++;
}

for (var k = 1; k < 10; k++) {
    if (k < 5) {
        continue;
    }
    console.log(k);
}
```

#### return 语句

```javascript
return expression;
```

return 语句 __只能__ 出现在函数体内，如果不是的话会报语法错误。当执行到 return 语句的时候，函数终止执行，并返回 expression 的值给调用程序，例如：

```javascript
function square(x) { return x*x; }
square(2)   // => 4
```

return 可以单独使用而不必带有 expression，这样的话函数会向调用程序返回 undefined

#### throw 语句

所谓异常（exception）是当发生了落地生根异常情况或错误时产生的一个信号。抛出异常（throw exception），就是用信号通知发生错误或者异常头部。捕获（catch）异常是指处理这个信号，即采取必要的手段从异常中恢复

```javascript
throw expression;
```

expression 的值可以是任意类型的。当 JavaScript 解释器抛出异常的时候通常采用 Error 类型和其子类型

```javascript
function factorial(x) {
    // 如果输出参数是非法的，则抛出一个异常
    if (x < 0) throw new Error('x 不能是负数');
    for (var f = 1; x > 1; f*= x, x--) ;
    return f;
}
```

当异常招聘时，JavaScript 解释器会 __立即停止__ 当前正在执行的逻辑，并跳转到 __就近的__ 异常处理程序。异常钼是程序是用 try/catch/finally 语句的 catch 从句编写的，JavaScript 会沿着方法的词法结构和调用栈向上传播

#### try/catch/finally 语句

try 从句定义了需要处理的异常所有代码块。catch 从句跟在其后，当 try 块内某处发生了异常时，调用 catch 内的代码逻辑。catch 从句后跟随 finally 块，后者中放置清理代码，不管 try 块中是否产生异常，finally 块内的逻辑总是会执行。尽管 catch 和 finally 都是可先的，但 try 从句需要至少二者之一（catch/finally）与之组成完整的语句。

try, catch 和 finally 语句块都 __必须__ 使用花括号括起来，即使只有一条语句

```javascript
try {
    // 通常来讲，这里的代码会从头执行到尾而不会产生任何问题，
    // 但有时会招聘一个异常，要么是由 throw 语句直接抛出，要
    // 么是通过调用一个方法间接抛出异常
} catch (e) {
    // 当且仅当 try 语句块抛出了异常，才会执行这里的代码
    // 这里可以通过局部变量 e 来警告对 Error 对象或者抛出的其他值的引用
    // 还可以通过 throw 语句重新抛出异常
} finally {
    // 不管 try 语句是否抛出了异常，这里的逻辑总是会执行，终止 try 语句块的方式有：
    // 1. 正常终止，执行完语句块的最后一条语句
    // 2. 通过 break, continue 或 return 语句终止
    // 3. 抛出一个异常，异常被 catch 从句捕获
    // 4. 抛出一个异常，异常未被捕获，继续向上传播
}
```

一般来说 JavaScript 使用 try/catch 语句的时候很少使用 finally。通常在一些后端语言 IO 操作中使用 finally 的比较多，比如打开一个文件，出现异常或者正常执行完 try 从句都需要关闭文件句柄

### 其它语句类型

with, debugger 和 use strict

#### with 语句

with 语句用于临时扩展作用域链，语法如下：

```javascript
with (object) {
    statement
}
```

这条语句将 object 添加到 __作用域链的头部__，然后执行 statement，最后把作用域链恢复到原始状态

严格模式中是禁止使用 with 语句的，并且在非严格模式里也是 __不推荐__ 使用 with 语句的。使用 with 语句的 JavaScript 代码非常难于优化，并且和没有使用 width 语句的代码相比，运行更慢

在对象嵌套层次很深的时候通常会使用 with 语句来简化代码编写。比如：

```javascript
document.forms[0].address.value = 'a'
document.forms[0].name.value = 'b'
document.forms[0].job.value = 'c'

// 等价于
with (document.forms[0]) {
    address.value = 'a'
    name.value = 'b'
    job.value = 'c'
}
// 使用 with 语句减少了对象访问前缀，但是仍然可以不使用 with 解决这个问题
// 使用变量 f 缓存对象引用
var f = document.forms[0];
f.address.value = 'a'
f.name.value = 'b'
f.job.value = 'c'
```

只有在查找标识符的时候才会用到作用域链，创建新的变量的时候不使用

```javascript
var d = 0;
var o = { a: 1, b: 2, c: 3};

with(o) {
   a = 2;
   d = 1
}
d           // => 1
o           // => {a: 2, b: 2, c: 3}
```

#### debugger 语句

debugger 语句通常什么也不做。当调试程序可用并运行的时候，JavaScript 解释器将会（非必需）以调试模式运行。这条语句用来产生一个断点（breakpoint），JavaScript 代码的挂靠会停止在断点的位置，这时可以使用调试器转出当前的变量、调用栈等

ECMAScript 5 中，debugger 语句正式加入到了语言规范里，在此之前注流浏览器厂商基本都已经实惠过了

#### 'use strict'

'use strict' 是 ECMAScript 5 引入的一条指定。非常类似语句但不是，区别在于：

* 它 __不包含__任何语言的关键字，指令仅仅是一个包含一个特殊字符串直接量的表达式，它是一条没有副作用的表达式语句，什么也没做
* 它只能出现在脚本代码的开始或者函数体的开始、任何实体语句之前。但不必一定出现在脚本或者函数休内的首行

使用 'use strict' 指令的目的是说明（脚本或函数中）后续的代码将会解析为严格代码

严格代码以 __严格模式__ 执行，严格模式悠了语言的重要缺陷，并提供健壮的查氏功能和增强的安全机制，和非严格模式的区别如下：

* 严格模式中 __禁止__ 使用 width 语句
* 严格模式中，所有的变量都要先声明，如果给一个未声明的变量、函数、函数参数、catch 从句参数或全局对象的属性赋值，将会抛出一个引用错误异常
* 严格模式中，调用的函数（不是方法）中的一个 this 值是 undefined（非严格模式下 this 值总是全局对象），可以利用这个特性来判断当前的 JavaScript 是否支持严格模式 `var hasStrictMode = (function() { "use strict"; return this === undefined }())`
* 严格模式中，给只读属性赋值和给不可扩展的对象创建新成员都将抛出一个类型错误异常（非严格模式中不会报错）
* 严格模式中，传入 eval() 的代码不能在调用程序所在的上下文中声明变量或定义函数，非严格模式中可以
* 严格模式中，函数里的 arguments 对象拥有传入函数值的 __静态副本__。非严格模式下，arguments 里的数组元素和函数参数都指向同一个值的引用
* 严格模式中，当 delete 运算符后跟随非法的标识符（变量、函数、当函数参数）时，将会抛出一个语法错误异常
* 严格模式中试图删除一个 __不可配置__ 的属性将抛出一个类型错误异常（非严格模式中，返回 false）
* 严格模式中，一个对象直接量中定义两个或多个 __同名属性__ 将产生一个语法错误
* 严格模式中，函数声明中存在两个或多个同名参数将产生一个语法错误
* 严格模式中，__不允许使用八进制__ 整数直接量（以 0 为前缀）
* 严格模式中，标识符 eval 和 arguments 当做关键字，它们的值是不能更改的，不能给它们赋值，也不能把它们声明为变量、函数名
* 严格模式中，限制了对调用栈的检测能力，在严格模式的函数中，arguments.caller 和 arguments.callee 都会抛出一个类型错误异常
