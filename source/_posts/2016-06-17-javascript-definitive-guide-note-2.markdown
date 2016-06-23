---
layout: post
title: "《JavaScript 权威指南》读书笔记 3 - 类型、值和变量"
date: 2016-06-16 13:06:13 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

## 类型、值和变量

JavaScript 中的数据类型分为两类：原始类型（primitive type）和对象类型（object type）。原始类型包括数字、字符串和布尔值

JavaScript 中有两个特殊的原始值：null（空）和 undefined（未定义），它们不是数字、字符串或布尔值。它们通常代表了各自特殊类型的唯一的成员

除此之外的就是对象了。对象是属性（property）的集合，每个属性都由「名/值对」（值可以是原始值或者对象）构成。JavaScript 对象很多时候也是 JSON/map/hash/dict，只是在不同语言中叫法不一样
<!--more-->

普通对象是「命名值」的 __无序__ 集合。数组则是一种有序集合对象

JavaScript 还定义了另一种特殊对象 —— 函数。如果用来初始化（使用 new 运算符）一个新建的对象，我们把这个函数称作 __构造函数__（constructor）。每个构造函数定义了一类（class）对象 —— 由构造函数初始化的对象组成的集合，常用的 JavaScript 核心类有 Array, Function, Date, RegExp, Error 等

JavaScript 解释器（interpreter）有自己的内存管理机制，可以自动对内存进行垃圾回收 GC（garbage collection）。当 __不再有任何引用指向一个对象__，解释器就会自动释放它占用的内存资源

JavaScript 是一种面向对象的语言，几乎一切皆对象。数据类型本身可以定义方法（method）来使用

从技术上讲，只有 JavaScript 对象才能拥有方法。然而数字、字符串和布尔值也可以拥有自己的方法。但是 null 和 undefined 是无法拥有方法的值

JavaScript 数据类型还可以分为：可以拥有方法和不可以拥有方法类型、__可变__（nutable）类型和 __不可变__（imutable）类型

> JavaScript 程序可以更改对象属性值和数组元素的值。数字、布尔值、null 和 undefined 属于不可变类型 —— 比如，修改一个数值的内容本身就说不通。字符串可以看成由字符组成的数组，你可能会认为它是可变的。然而在 JavaScript 中，字符串是不可变的。可以访问字符串任意位置的文本，但不能修改其内容

JavaScript 可以自由地进行数据类型转换。比如程序期望使用字符串的地方使用了数字， JavaScript 会自动将数字转换为字符串。期望使用布尔值的地方使用了非布尔值也会自动进行相应转换

JavaScript 变量是无/弱类型的（untyped）,变量可以被赋予任何类型的值，也可以动态改变不同类型的值。JavaScript 采用 __词法作用域__（lexical scoping）。不在任何函数内声明的变量称做全局变量（global variable），函数内声明的变量具有函数作用域（function scope），且只在函数内可见

### 数字

JavaScript __不区分__ 整数和浮点数。所有的数字均用浮点数值表示。JavaScript 采用 [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754) 标准定义的 64 位浮点格式表示数字

当一个数字直接出现在 JavaScript 程序中，我们称为数字直接量（numberic literal）。JavaScript 支持多种格式的籽安直接量。注意，在任何数字直接量前添加负号（-）可以得到它们的负值。但负号是 __一元 [求反](https://zh.wikipedia.org/wiki/位操作)__ 运算符，并不是数字直接量语法组成部分

#### 整型直接量

十进制整数，例如：

```javascript
0
3
1000000
```

十六进制值，指直接量以「」或为前缀，其后跟随十六进制数串的直接量。十六进制值是 0 ~ 9 之间的数字和 a(A) ~ f(F) 之前的字母构成，a ~ f 的字母对应的表示数字 10 ~ 15

```javascript
0x2Af5         // 8192 + 2560 + 240 + 5 = 10996（十进制）
/*
+-------------------------------------------------+
|                                                 |
|       2          A          F          5        |
|                                                 |
|       3          2          1          0        |
|                                                 |
|    2*16^3      A*16^2     F*16^1     5*16^0     |
|                                                 |
|    2*4096      10*256     15*16       5*1       |
|                                                 |
|     8192   +    2560   +   240    +    5        |
|                                                 |
|       十六进制 2AF5 转换成十进制为10996         |
|                                                 |
+-------------------------------------------------+
*/
```

ECMAScript 标准 __不支持__ 八进制直接量，ECMAScript 6 严格模式下不能使用八进制

#### 浮点型直接量

浮点型直接量可以含有小数点，采用传统实数的写法。此外，还可以使用指数记数法表示浮点型直接量，即在实数后跟字母 e 或 E，后面再跟正负号，其后再加一个整形指数。这种记数方法表示的数值，是由前面的实数乘以 10 的指数次幂，例如：

```javascript
3.14
2134.789
.33          // 0.33
6.02e23      // 6.02 乘以 10 的 23 次方
1.47e-32     // 1.47 乘以 10 的负 32 次方
```

#### JavaScript 中的算术运算

JavaScript 中的算术运算在 __溢出__（overflow）、__下溢__（underflow）或被零整除时不会报错，当数字运算结果超过了 JavaScript 所能表示的数字上限（溢出），结果为一个特殊的无穷大（infinity）值，相应的也有负无穷大（-infinity）值

下溢是当运算结果无限接近于零并比 JavaScript 能表示的最小值还小的时候发生的一种情况。这种情况下，JavaScript 将会返回 0。当一个负数发生下溢时，JavaScript 返回一个特殊的值「负零」，这个值几乎和正常的零完全一样

实零带除在 JavaScript 中并不报错：它会返回正或者负无穷大。但有一个例外，零除以零是没有意义的，这种整除运算结果也是一个非数字（not-a-number）值，用 NaN 表示

```javascript
1/0                      // => Infinity
-1/0                     // => -Infinity
Number.NEGATIVE_INFINITY // => -Infinity
Number.MAX_VALUE         // => 1.7976931348623157e+308
Number.MAX_VALUE + 1     // => Infinity （经测试在 Chrome 里面并不是）
0/0                      // => NaN
Number.MIN_VALUE / 2     // => 0 发生下溢
-Number.MIN_VALUE / 2    // => -0 负零
-1/Infinity              // => -0
NaN == NaN               // => false
isNaN('hello')           // => false
isFinite(123)            // => true 参数不是 NaN, Infinity 或 -Infinity 时返回 true
isFinite(-1/0)           // => false
```

JavaScript 中的非数字值（NaN）和任何值都不相等，包括 NaN，`NaN == NaN` 返回 `false` 但是可以使用 isNaN 判断一个值是不是 NaN

#### 二进制浮点数和四舍五入错误

IEEE-754 浮点表示法是一种二进制表示法，但是并不能精确表示十进制分数，在任何使用二进制浮点数的编程语言中都会有这个问题

下面的代码中 x 和 y 的值非常 __接近__ 彼此和最终正确值。这种计算结果可以用途大多数的计算任务，__这个问题也只有在比较两个值是否相等的时候才会出现__

```javascript
0.3 - 0.2           // => 0.09999999999999998
0.2 - 0.1           // => 0.1
var x = 0.3 - 0.2;
var y = 0.2 - 0.1;
x == y              // => false
```

#### 日期和时间

JavaScript 语言核心包括 Date() 构造函数，用来创建表示日期和时间对象，大致使用方法如下：

```javascript
var then = new Date(2011, 0, 1);                // 2011 年 1 月 1 日
var later = new Date(2011, 0, 1, 17, 10, 30)    // 下午 5 点 10 分 30 秒
var elapsed = now - then;                       // 日期减法：计算时间间隔的毫秒数
later.getFullYear();                            // => 2011
later.getMonth();                               // => 0 月份从 0 开始
...
```

### 文本

__字符串__（string）是一组 16 位值组成的不可变的有序序列，每个字符通常来自于 Unicode 字符集。字符串的长度（length）是其所含 16 位值的个数。字符串索引从零开始

```javascript
""  // 空字符串
'testing'
"3.14"
"Wouldn't you prefer O'Reilly's book?"
"This string\nhas Two lines"  // 显示为两行
"one\
long\
line"   // 显示为单行，但是可以分行书写
```

#### 转义字符

JavaScript 中转文字符用反斜线（\）加一个字符表示，比如 \n 就是一个转义字符，表示一个换行符

| 转义字符 | 含义                               | Unicode |
| ------   | -----------------------            | :-----: |
| \o       | NUL 字符                           | \u0000  |
| \b       | 退格符                             | \u0008  |
| \t       | 水平制表符                         | \u0009  |
| \n       | 换行符                             | \u0009  |
| \v       | 垂直制表符                         | \u0009  |
| \f       | 换页符                             | \u0009  |
| \r       | 回车符                             | \u0009  |
| \"       | 双引号                             | \u0009  |
| \'       | 单引号                             | \u0009  |
| \\       | 反斜线                             | \u0009  |
| \xXX     | 2位十六进制数XX指定的 Latin-1 字符 |         |
| \uXXXX   | 4位十六进制数XX指定的 Unicode 字符 |         |

#### 字符串的使用

加号（+）运算符作用于字符串表示链接，字符串通过访问 length 属性得到长度

```javascript
var s = "hello world"
s.charAt(0)                 // => "h" 下标为 0 的字符
s.substring(1, 4)           // => "ell" 下标从 1 ~ 4 的字符
s.slice(1, 4)               // => "ell" 同上
s.slice(-3)                 // => "rld" 最后三个字符
s.indexOf("l")              // => 2 字符 l 首次出现的下标
s.lastIndexOf("l")          // => 10 字符 l 最后一次出现的下标
s.split(", ")               // => ["hello", "world"] 分割字符串
s.replace("h", "H")         // => "Hello, world" 全文字替换
s.toUpperCase()             // => "HELLO, WORLD"
```

一定要记住，在 JavaScript 中字符串是固定不变的，类似 replace() 和 toUpperCase() 的方法都 __返回新字符串__，原字符串本身并没有发生改变。在 ECMAScript 5 中字符串可以当做只读数组，可以通过下标访问单位字符

#### 模式匹配

JavaScript 定义了 RegExp() 构造函数，用来创建表示文本匹配模式的对象。这些模式称为「正则表达式」（regular expression）， JavaScript 采用 Perl 中的正则表达式语法。String 和 RegExp 对象均定义了正则模式匹配、查找和替换的函数

```javascript
/^HTML/                       // 匹配以 HTML 开始的字符串
/[1-9][0-9]*/                 // 匹配一个非零数字，后面是任意个数字
/\bjavascript/i               // 匹配单词「javascript」，忽略大小写

var text = "testing: 1, 2, 3"
var pattern = /\d+/g          // 匹配所有包含一个或者多个数字的实例
pattern.test(text)            // => true 匹配成功
text.search(pattern)          // => 9 首次匹配成功的位置
text.match(pattern)           // => ["1", "2", "3"] 所有匹配组成的数组
text.replace(pattern, "#")    // => "testing: #, #, #"
text.split(/\D+/)             // => ["", "1", "2", "3"] 用非数字字符截取字符串
```

### 布尔值

JavaScript 中比较语句的结果通常都是布尔值，布尔值通常用于控制结构中。任意 JavaScript 的值都可以转换成布尔值。所有对象（数组）都会转换成 true, 面这些则都是 false

```javascript
undefined
null
0
-0
NaN
""     // 空字符串
```

### null 和 undefined

null 是 JavaScript 语言的关键字，执行 typeof 运算返回 「object」，也就是说，可以将 null 认为是一个特殊的对象值，含义是「非对象」。但实际上，通常认为 null 是它自有类型的唯一一个成员，它可以表示数字、字符串或对象是「无值」的

undefined 是一种取值，表明变量没有初始化，如果要查询对象属性或者数组元素的值时返回 undefined 则说明这个属性或者元素不存在。如果函数没有返回任何值，则返回 undefined引用没有提供实参的函数形参的值也只会得到 undefined。

undefined 不是关键字，是 JavaScript 预定义的全局变量，它的值就是「未定义」。ECMAScript 3 中，undefined 是 __可读/写的变量__，可以给它赋任意值。这个错误在 ECMAScript 5 中做了修正，变成了只读的。如果执行 typeof 运算得到 undefined 类型，则返回 "undefied"

null 和 undefined 都 __不包含任何属性和方法__

### 全局对象

全局对象的属性是全局定义的符号，JavaScript 程序可以直接使用。当解释器启动时，它将创建一个新的全局对象，并给它一组初始属性：

全局属性，比如 undefined, Infinity 和 NaN
全局函数，比如 isNaN(), parseInt(), eval()
构造函数，比如 Date(), RegExp(), String(), Object() 和 Array()
全局对象，比如 Math 和 JSON

全局对象的 __初始属性__ 并不是保留字（可以被污染/重写），但它们应该当做保留字来对待。对于客户端的 JavaScript 来讲，Window 对象定义了一些额外的全局属性

### 包装对象

```javascript
var s = "test", n = 1, b = true;
var S = new String(s);
var N = new Number(N);
var B = new Boolean(b);

s == S                  // => true
s === S                 // => false
typeof s                // => "string"
typeof S                // => "object"
```

可以通过 Number() 或 Boolean() 构造函数来显式创建包装对象，JavaScript 会在必要的时候将包装对象转换成原始值。上段代码中的对象 S, N 和 B 常常但不总是表现的和值 s, n 和 b 一样。「==」运算符将原始值和其包装对象视为相等，但「===」全等运算符将它们视为不等，通过 typeof 运算符可以看到原始值和其包装对象的不同

### 不可变的原始值和可变的对象引用

JavaScript 中原始值（undefined, null, 布尔值，数字和字符串）和对象（包括数组和函数）有着根本的区别，__原始值是不可更改的__，比如字符串的所有方法都是新返回一个值

```javascript
var s = "hello";
s.toUpperCase();    // => "HELLO"
s                   // => "hello"
```

对象和原始值不同，首先，它他是 __可变的__ —— 值可以修改

```javascript
var o = { x: 1};
o.x = 2;
oxy = 3;

var a = [1,2,3]
a[0] = 0;
a[3] = 4;
```

__对象的比较并非值的比较，即使两个对象包含同样的属性及相同的值__

```javascript
var o = {x:1}, p = {x:1};
o === p                 // => false
var a = [], b = [];
a === b                 // => false
```

通常将对象𤠕引用类型（reference type）,以此来和 JavaScript 基本类型区分开。按术语的叫法，对象值都是引用（reference）,对象的比较均是引用的比较：__当且仅当它们引用同一个基本对象时，它们才相等__

```javascript
var a = [];
var b = a;
b[0] = 1;
a[0]        // => 1 变量 a 也会修改
a === b     // => true a 和 b 引用一个相同的数组，所以它们相等
```

### 类型转换

JavaScript 中的取值类型非常灵活，从布尔值可以看到这一点：当 JavaScript 期望使用一个布尔值的时候，你可以提供任意类型值， JavaScript 将根据需要自行转换类型。这在其它类型转换中同样适用

```javascript
10 + " objects"         // => "10 objects" 数字 10 转换成字符串
"7" * "4"               // => 28 两个字符串均转换为数字
var n = 1 - "x"         // => NaN 字符串 "x" 无法转换为数字
n + " objects"          // => "NaN objects" NaN 转换为字符串 "NaN"
```

__常用值转换成对应的类型结果__

_表3-1_

| 值                      | 字符串            | 数字        | 布尔值 | 对象                  |
| -------------------     | ----------------- | ---------   | -----  | --------------------- |
| undefined               | "undefined"       | NaN         | false  | throws TypeError      |
| null                    | "null"            | 0           | false  | throws TypeError      |
| true                    | "true"            | 1           |        | new Boolean(true)     |
| false                   | "false"           | 0           |        | new Boolean(false)    |
| "" (空字符串)           |                   | 0           | false  | new String("")        |
| "1.2" (非空数字)        |                   | 1.2         | true   | new String("1.2")     |
| "one" (非空，非数字)    |                   | NaN         | true   | new String("one")     |
| 0                       | "0"               |             | false  | new Number(0)         |
| -0                      | "0"               |             | false  | new Number(-0)        |
| NaN                     | "NaN"             |             | false  | new Number(NaN)       |
| Infinity                | "Infinity"        |             | true   | new Number(Infinity)  |
| -Infinity               | "-Infinity"       |             | true   | new Number(-Infinity) |
| 1 (无穷大，非零)        | "1"               |             | true   | new Number(1)         |
| {} (任意对象)           | 参考 §3.8.3       | 参考 §3.8.3 | true   |                       |
| [] (任意数组)           | ""                | 0           | true   |                       |
| [9] (1 个数字元素)      | "9"               | 9           | true   |                       |
| ['a'] (其它数组)        | use join() method | NaN         | true   |                       |
| function(){} (任意函数) | 参考 §3.8.3       | NaN         | true   |                       |

#### 转换和相等性

以下结果均为 true

```javascript
null == undefined
"0" == 0
0 == false
"0" == false
```

#### 显式类型转换

显式类型转换最简单的方法就是使用 Boolean(), Number(), String() 或 Object() 函数。

```javascript
Number("3")     // => 3
String(false)   // => "false"
Boolean([])     // => true
Object(3)       // => new Number(3)
```

除了 null 和 undefined 之外 __任何值__ 都具有 toString() 方法

JavaScript 中的某些运算符会做隐式的类型转换。如果「+」运算符的一个操作数是字符串，它将会把另外一个操作数转换为字符串。一元「!」运算符将其操作数转换为布尔值并取反

```javascript
x + ""      // 等价于 String(x)
+x          // 等价于 Number(x)
!!x         // 等价于 Boolean(x)
```

Number 类型定义的 toString() 方法可以接收表示转换基数的可选参数，默认是基于十进制的，toFixed(), toExponential(), toPrecision() 三个方法都会适当地进行四舍五入或填充 0

```javascript
var n = 17
binary_sting = n.toString(2)        // 转换为 "10001"
octal_string = "0" + n.toString(8)  // 转换为 "021"
hex_string = "0x" + n.toString(16)  // 转换为 "0x11"
```

通过 Number() 转换函数传入一个字符串，它会试图将其转换为一个整数或浮点数直接量，这个方法只能基于十进制数进行转换，并且不能出现 __非法的尾随字符__。parseInt() 和 parseFloat() 函数（全局函数，不属于任何类的方法）更加灵活。如果字符前缀是「0x」或「0X」，parseInt() 将其解释为十六进制数，parseInt() 和 parseFloat() 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略 __后面的内容__

```javascript
parseInt("3 blind mice")        // => 3
parseFloat(" 3.14 meters")      // => 3.14
parseInt(0xFF)                  // => 255
parseInt("0.1")                 // => 0
parseInt(".1")                  // => NaN
parseFloat("$72.47")            // => NaN
```

#### 对象转换为原始值

所有对象继承了两个转换方法 toString(), valueOf()

__toString()__ 的作用是返回一个反映这个对象的字符串

```javascript
({x:1, y:2}).toString()             // => "[object Object]"
[1,2,3].toString()                  // ==> "1,2,3"
(function(x) { f(x); }).toString()  // => "function(x) {\n f(x);\n }"
/\d+/g.toString()                   // => "/\\d+/g"
new Date(2010,0,1).toString()       // => "Fri Jan 01 2010 00:00:00 GMT+0800 (中国标准时间)"
```

__valueOf()__ 这个方法的作答并未详细定义：如果存在任意原始值，它就默认将对象转换为表示它的原始值。复合值默认返回对象本身

JavaScript 中对象到字符串的转换经过了如下这些步骤：

* 如果对象具有 toString() 方法，调用后，如果返回一个原始值，JavaScript 将这个值转换为字符串，并返回
* 如果没有 toString() 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 valueOf() 方法，如果存在这个方法，则调用它。如果返回值是原始值，就将这个值值的为字符串并返回
* 否则，无法从 toString() 和 valueOf() 获得一个原始值，这些将抛出一个类型错误异常

```javascript
var now = new Date();
typeof (now +1)             // => "string" 「+」将日期转换为字符串
typeof (now -1)             // => "number" 「-」使用对象到数字的转换
now == now.toString()       // => true
now > (now - 1)             // => true
```

### 变量声明

```javascript
var i;
var sum;
var i, sum;     // 单 var 声明多个变量
```

如果未在 var 声明语句中给变量指定初始值，那么虽然声明了这个变量，但在给它存入一个值之前，它的初始值就是 undefined

JavaScript 是弱类型语言，变量可以是任意数据类型，下面的写法是合法的：

```javascript
var i = 10;
i = "ten";
```

### 变量作用域

变量作用域（scope）是程序源代码中定义它的区域。在函数体内，局部变量的优先级高于 __同名__ 的全局变量，并且函数内部可以修改外部变量

```javascript
var scope = "global";
function checkScope() {
  var scope = 'local';
  return scope
}
```

在声明全局变量时可以不使用 var 前缀，但在声明局部变量时 __一定__ 要使用 var

```javascript
scope = "global";       // 定义一个全局变量
function checkScope2() {
    scope = 'local';
    myscope = 'local';

    return [scope, myscope]
}

checkScope2()           // => ['local', 'local']
scope                   // => "local"
myscope                 // => "local"
```

#### 函数作用域和声明提前（Hoisting）

像一些类 C 的编程语言中，花括号（{}）内的每一段代码都具有各自的作用域，变量在声明它们的代码段之外是不可见的，我们称为 __块级作用域__（block scope），而 JavaScript 中没有块级作用域。JavaScript 中使用了 __函数作用域__（function scope）：

> 变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是可以被访问到的

下面的代码中，在不同位置定义了变量 i,j 和 k，它们都在同一个作用域内。当调用 `test()` if 语句并没有执行，但是变量 j 已经定义却没被始化

```javascript
function test(o) {
    var i = 0;
    if ( typeof o === 'object' ) {
        var j = 0;
        for (var k = 0; k < 10; k++) {
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}
```

> JavaScript 的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的。这就意味着变量在声明之前甚至已经可用。JavaScript 的这个被非正式地称为声明提前（hoisting），即 JavaScript 函数里声明的所有变量（不包括赋值）都被「提前」到函数体的顶部 [参考](http://www.slideshare.net/lijing00333/javascript-engine)

```javascript
var scope = "global";
function f() {
    console.log(scope);     // => undefined
    var scope = "local";
    console.log(scope);     // => "local"
}
f();

function b() {
    console.log(scope);     // => "global"
}
b();
```
上面的代码中函数 f 的局部变量 scope 由于 __声明提前__，代码刚执行进入 f 内部的时候 scope 就被赋值 undefined，这时局部变量优先级高于同名全局变量，所以就返回了 undefined，只有代码执行到 var 的时候 scope 才真正被赋值。所以函数 f 等价于：

```javascript
function f() {
    var scope;
    console.log(scope);     // => undefined
    scope = "local";
    console.log(scope);     // => "local"
}
```

这也是为什么建议函数体内的变量尽量放在上面，避免造成混乱或者误解

#### 作为属性的变量

当声明一个 JavaScript 全局变量时，实际上是定义了全局对象的一个属性。当使用 var 声明一个变量时，这个变量是无法通过 delete 运算符删除的。不使用 var 声明的全局变量却是可以被 delete 的

```javascript
var truevar = 1;
fakevar = 2;                // 不用 var 创建一个全局变量
this.fakevar2 = 3;
delete truevar              // => false 不可删除
delete fakevar              // => true
delete this.fakevar2        // => true
```

#### 作用域链（scope chain）

JavaScript 是基于 __词法作用域__（lexically scoped）的语言：通过阅读包含变量定义在内的源代码就能知道变量的作用域

每一段 JavaScript 代码（全局代码或函数）都有一个与之关联的作用域链。这个作用域链是一个对象列表或者链表，这组对象定义了这段代码「作用域中」的变量。当 JavaScript 需要查找变量 x 值的时候（这个过程称做「变量解析」（valable resolution）），它会从链中的第一个对象开始查找，如果有则直接使用，如果没有 JavaScript 就会继续查找链上的下一个对象，以此类推。如果作用域名链上没有任何一个对象含有属性 x，那么就认为这段代码的作用域链接上不存在 x，并最终抛出一个引用错误（ReferenceError）异常

```javascript
a();
function a() {
    alert('1');
}
a();
function a() {
    alert('2');
}
a();
var a = function() {
    alert('3');
};
a();
```

## 引用

* IEEE 754 https://zh.wikipedia.org/wiki/IEEE_754
* 位操作 https://zh.wikipedia.org/wiki/位操作
* JavaScript Engine http://www.slideshare.net/lijing00333/javascript-engine
