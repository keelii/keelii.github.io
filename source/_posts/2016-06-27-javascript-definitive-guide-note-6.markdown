---
layout: post
title: "《JavaScript 权威指南》读书笔记 7 - 数组"
date: 2016-06-23 19:10:28 +0800
comments: true
categories:
    - javascript
    - JavaScript_The_Definitive_Guide
---

数组是值的 **有序集合**。每个值（任意 JavaScript 数据类型）叫做一个元素，元素在数组中的位置叫索引。JavaScript 数组是无/弱类型的（untyped），数组元素可以是任意类型

JavaScript 数组是 **动态的**，根据需要它们会增长或缩减，创建的时候不须要声明一个固定的大小

JavaScript 数组可能是 **稀疏的**，数组元素索引不一定要连续

JavaScript 数组是 JavaScritp 对象的特殊形式。数组的实现是经过优化的，用数字索引来访问数组元素一般来说比访问常规的对象属性要 **快很多**
<!--more-->

## 创建数组

```javascript
var empty = [];             // 使用数组直接量创建一个空数组
var primes = [2, 3, 5, 7, 11];
var base = 1024；
var misc = [1.2, true, "a", base + 1, [1,2,3], { a: 1}]     // 元素可以是任意值，甚至表达式
var count = [1, ,3];            // 数组有三个元素中间那个值为 undefined

var a = new Array();        // 调用构造函数 Array() 也可以创建数组
var a = new Array(10);
a.length;                   // => 10 创建一个长度为 10 的数组
var a = new Array(1, 2, 3);
a;                          // => [1, 2, 3]
```

## 数组元素的读和写

使用方括号 [] 操作符来访问数组中的一个元素，方括号左边是数组的引用，右边是一个返回 **非负整数值** 的任意表达式

```javascript
var a = ["world"];
a[0]                    // => "world"
a[1] = 3.14             // => 写入第 1 个元素 3.14
a                       // => ["world", 3.14]
i = 2;
a[i] = 3;               // => 写入第 2 个元素
a[i+1] = "hello";       // => 写入第 2 个元素
```

可以使用负数或者非整数来索引数组。这种情况下，数值转换为字符串，字符串作为属性名来用。既然名字不是非负整数，它就只能当做常规的对象属性，而非数组的索引。同样如果如果凑巧使用了非负整数的字符串，它就当做数组索引，而非对象属性

```javascript
a[-1.23] = true             // 给数组 a 创建一个名为 "-1.23" 的属性
a["1000"] = 0               // 这是数组的第 1001 个元素
a[1.000]                    // 和 a[1] 相等
```

事实上数组索引仅仅是对象属性名的一种特殊类型，这意味着 JavaScript 数组 **没有越界** 错误的概念。当试图查询任何对象中不存在的属性时，不会报错，只会得到 undefined 值，这一点类似于对象

## 稀疏数组（Sparse Arrays）

通常，数组的 length 属性代表数组中的元素个数。如果是稀疏数组，length 属性值大于元素个数。当在数组直接量中省略值是不会创建稀疏数组。省略的元素是存在的只是值为 undefined。使用 Array() 构造函数或者手动指定 length 大于当前的数组可以创建稀疏数组

```javascript
a = new Array(5);       // 数组没元素，但 a.length 是 5
a = [];
a[1000] = 0;            // 赋值添加一个元素，但设置 length 为　1001
var a1 = [,,,];         // 数组是 [undefined, undefined, undefined]
var a2 = new Array(3);
var a3 = [1,,3];
0 in a1                 // => true 非稀疏数组
0 in a2                 // => false 稀疏数组
1 in a3                 // => false 稀疏数组
```

在一些旧版的实现中，[1,,3] 和 [1, undefined, 3] 却是一模一样的

## 数组的长度

每个数组都有一个 length 属性，就是这个属性使其区别于常规的 JavaScript 对象。针对稠密数组，length 属性值代表数组中元素的个数，其值比数组中最大的索引大 1

数组有两个 **特殊行为**：

1. 如果为一个数组元素赋值，它的索引 i 大于或者等于现有数组的长度时，length 属性的值将设置为 i + 1
2. 如果设置一个数组的 length 属性小于这个数组长度的非负整数 n 时，当前数组中那些索引值大于或等于 n 的元素将被从中删除

```javascript
a = [1,2,3,4,5];
a.length = 3;
a                   // => [1,2,3]
a.length = 0;
a.length = 5;       // 长度为 5，类似 new Array(5)
```

数组也继承了对象的一些方法，比如 Object.defineProperty(), 可以使用这个方法让数组的 length 属性变成只读

```javascript
a = [1,2,3]
Object.defineProperty(a, "length", {
    writable: false
});
a.length = 0
a                   // => [1,2,3] 不会改变
```

## 数组元素的添加和删除

可以给新的索引赋值来添加元素，也可以调用 Array 对象的内置方法 push() 来在数组 **末尾** 增加一个或者多个元素，或者用 unshift() 给数组头部插入一个元素，并且将其它元素依次移动到更高的索引处

```javascript
a = []
a[0] = "zero"
a[1] = "one"
a               // => ["zero", "one"]

a = []
a.push("zero")
a.push("one", "two")
a               // => ["zero", "one", "two"]
a.unshift(0)
a               // => [0, "zero", "one", "two"]
```

可以使用 delete 运算符来删除数组元素，效果和对数组元素赋值 undefined 类似，使用 delete 删除数组后数组的长度是不变的

## 数组遍历

使用 for 循环是遍历数组元素最常见的方法，for/in 也可以但并不推荐

```javascript
var keys = Object.keys(o);
var values = [];
for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    values[i] = o[key]
}

for (var i = 0; i < keys.length; i++) {
    if (!a[i]) continue;    // 跳过 null, undefined 和不存在的元素
}
for (var i = 0; i < keys.length; i++) {
    if (!(i in a)) continue;    // 只跳过不存在的元素
}
for (var i in a) {
    if (!a.hasOwnProperty(i)) continue; // 跳过继承属性
}
```

ECMAScript 5 定义了一些遍历数组元素的新方法，比如 forEach()

```javascript
[1,2,3,4,5].forEach(function(x) {
    console.log(x);
});
```

## 多维数组

JavaScript 并不支持真正的多维数组，但可以模拟出来

```javascript
var table = new Array(10);
for (var i = 0; i < table.length; i++) {
    table[i] = new Array(10);
}

for (var row = 0; row < table.length; row++) {
    for (var col = 0; col < table[row].length; col++) {
        table[row][col] = row * col;
    }
}

table[5][7];        // => 35
```

## 数组方法

将所有元素都转化为字符串并通过分隔符链接起来，分隔符默认是逗号「,」

与之相反的 split 方法则是把字符串按分割符分割开来并返回数组，并且分割符可以是正则表达式

```javascript
var a = [1,2,3];
a.join();               // => "1,2,3"
a.join(" ")             // => "1 2 3"
a.join("")              // => "123"
new Array(10).join('-') // => "----------"

var str = "Hello world";
str.split(' ')          // => ["Hello", "world"]
var str = "0a1b2c3d";
str.split(/\d/g);       // => ["", "a", "b", "c", "d"]
```

### reverse()

反转数组元素

```javascript
var a = [1,2,3];
a.reverse();        // => [3,2,1]
```

### sort()

将数组中的元素排序并返回排序后的数组。不带参数调用 sort() 时，数组元素以字母表顺序排序，如果数组包含 undefined 元素，它们会被排到数组的尾部

```javascript
var a = ["banana", "cherry", "apple"]
a.sort();               // => ["apple", "banana", "cherry"]
```

sort 方法可以接收一个函数参数，该函数决定了它的两个参数在排好序的数组中的先后顺序。假设第一个参数应该在前，比较函数应该返回一个小于 0 的数值

```javascript
var a = [3,4,1,2]
a.sort()            // [1,2,3,4]
a.sort(function(a, b) {
    return b - a
})                  // [4,3,2,1]
```

### concat()

> Array.concat(value1, value2, ..., valueN)

创建并返回一个新数组，它的元素包括调用 concat 的原始数组元素和 concat 的每个参数

```javascript
var a = [1,2,3]
a.concat(4,5)           // => [1,2,3,4,5]
a.concat([4,5])         // => [1,2,3,4,5]
a.concat([4,5], [6,7])  // => [1,2,3,4,5,6,7]
a.concat(4, [5, [6,7]]) // => [1,2,3,4,5,[6,7]]
```

### slice()

> Array.slice([begin[, end]])

返回指定数组的一个片段或子数组，它的两个参数分别指定了片段的开始和结束的 **位置**，如果只指定一个参数（开始位置），返回的数组将包含从开始位置到数组结尾的所有元素，如果参数中出现了负数，它表示相对于数组中最后一个元素的位置，slice 不会修改原数组

```javascript
var a = [1,2,3,4,5]
a.slice(0, 3)       // => [1,2,3]
a.slice(3)          // => [4,5]
a.slice()           // => [1,2,3,4,5]
a.slice(1, -1)      // => [2,3,4]
a.slice(-3, -2)     // => [3]
```

### splice()

> Array.splice(start, deleteCount[, item1[, item2[, ...]]])

splice 方法是在数组中插入或删除元素的通用方法，会 **修改** 调用的数组

splice 能够从数组中删除元素、插入元素到数组中或者 **同时完成** 这两种操作。在插入或删除点之后的数组元素会根据需要增加或减小它们的索引值，因此数组的其它部分仍然保持连续。splice 第一个参数指定了插入和（或）删除的起始位置。第二个参数指定了应该从数组中删除的元素个数。如果省略第二个参数，从起始点开始到数组结尾的所有元素都将被删除。splice 返回一个由删除元素组成的数组

```javascript
var a = [1,2,3,4,5,6,7,8]
a.splice(4)             // => [5,6,7,8]
a                       // => [1,2,3,4]
a.splice(1,2)           // => [2,3]
a                       // => [1,4]
a.splice(1,1)           // => [4]
a                       // => [1]
```

splice 前两个参数指定了需要删除的数组元素。其后任意个数参数指定了需要插入到数组中的元素

```javascript
var a = [1,2,3,4,5]
a.splice(2, 0, "a", "b")        // => 0
a                               // => [1,2,"a","b",3,4,5]
a.splice(2, 2, [1,2], 3)        // => ["a", "b"]
a                               // => [1,2,[1,2],3,3,4,5]
```

### push() 和 pop()

push 和 pop 方法谲诈将数组当做 [栈](https://cloud.githubusercontent.com/assets/458894/16374650/f8b0fa6c-3c89-11e6-9e61-bc391f7f3cf4.png) 来使用，push 方法在数组尾部添加一个或者多个元素，并返回新的数组长度。pop 删除数组的最后一个元素，减小数组长度并返回它删除的值

```javascript
var stack = [];
stack.push(1,2)         // => 2 stack: [1,2]
stack.pop(1,2)          // => 1 stack: [2]
stack.push(3)           // => 2 stack: [1,3]
```

### unshift() 和 shift()

unshift 在数组的头部添加一个或者多个元素，shift 删除数组的第一个元素并将其返回

需要注意的是，当使用多个参数调用 unshift() 的时候，参数是一次性插入的，而非一次一个插入。这会影响插入到数组中元素的位置

```javascript
var a = [4,5,6];
a.unshift(3)
a               // => [3,4,5,6]
a.unshift(1,2)
a               // => [1,2,3,4,5,6]如果一次一个插入的话结果应该是 [2,1,3,4,5]
```

## ECMAScript 5 的数组方法

### forEach()

forEach() 从头至尾遍历数组，为每个元素调用指定的函数。传递函数作为 forEach() 的第一个参数，然后 forEach() 使用三个参数调用该当函数：数组元素、元素的索引和数组本身。forEach() 无法在所有元素都传递给调用的函数之前终止遍历，除非 forEach() 方法放在一个 try 块中，并抛出一个异常

```javascript
[1,2,3,4,5].forEach(function(value, index, arr) { arr[i] = v + 1 });
// => [2,3,4,5,6]
```

### map()

map() 方法将调用数组的每个元素传递给指定的函数，并返回一个数组。如果是稀疏数组，返回的也是相同方式的稀疏数组

```javascript
a = [1,2,3]
b = a.map(function(x) { return x*x })
b               // [1, 4, 9]
```

### filter()

filter() 方法返回数组元素是调用数组的一个 **子集**。传递的函数是用来逻辑判定的（true 或 false），如果返回 true 或者能转化为 true 的值，那么传递给判定函数的元素就是这个子集的成员，它将被添加到一个作为返回值的数组中，**filter() 会跳过稀疏数组中缺少的元素**，总是返回稠密的

```javascript
a = [5,4,3,2,1]
smallvalues = a.filter(function(x) { return x < 3 })    // [2, 1]
```

### every() 和 some()

数组的逻辑判定，它们对数组元素应用指定的函数进行判定，返回 true 或 false

```javascript
a = [1,2,3,4,5]
a.every(function(x) { return x < 10 })      // => true 数组元素都少于 10
a.some(function(x) { return x%2 === 0 })    // => true 数组中有一些值是偶数
```

注意，一旦 every() 和 some() 确认应该返回什么值时它们就会停止遍历数组元素（可以认为是惰性判断）。即：

* some() 在判定函数第一次返回 true 后就返回 true，不再进行遍历操作
* every() 在判定函数第一次返回 false 后就返回false，不再进行遍历操作

### reduce() 和 reduceRight()

> Array.reduce(callback, [initialValue])

reduct() 和 reduceRight() 方法使用指定的函数将数组元素进行组合，生成单个值，这在 **函数式编程（functional programming）** 中是很常见的操作，也可以称为「注入」和「折叠」，他们只是执行化简操作的顺序不一样，一个从左到右，一个从右到左

```javascript
var a = [1,2,3,4,5]
var sum = a.reduce(function(x, y) { return x + y }, 0)          // 数组求和
/**
+---------------------------------+
|                                 |
|     x      +     y     return   |
|                                 |
|   init: 0     a[0]: 1    1      |
|                                 |
|     1         a[1]: 2    3      |
|                                 |
|     3         a[2]: 3    6      |
|                                 |
|     6         a[3]: 4    10     |
|                                 |
|     10        a[4]: 5    15     |
|                                 |
+---------------------------------+
*/
var product = a.reduce(function(x, y) { return x * y }, 1)      // 数组求积
```

reduce 需要两个参数。第一个是执行化简操作的函数，它的任意就是用某种方法把两个值组合或化简为一个值，并返回化简后的值，第二个参数是传递给函数的初始值，如果没有指定初始值，它将使用数组的第一个元素作为其初始值。**这意味着第一次调用化简函数就使用了第一个和第二个数组元素作为 x,y**


### indexOf() 和 lastIndexOf()

> Array.indexOf(searchElement[, fromIndex = 0])

搜索整个数组中指定值的索引，没找到就返回 -1。indexOf() 从头至尾搜索，而 lastIndexOf() 则反向搜索。它们都接收第二个参数，指定数组中的一个索引，从这个索引处开始搜索

```javascript
a = [0,1,2,1,0]
a.indexOf(1)        // => 1
a.lastIndexOf(1)    // => 3
a.indexOf(3)        // => -1

// 在数组中查找所有出现的 x，并返回一个包含匹配索引的数组
function findall(a, x) {
    var results = [];
    var len = a.length;
    var pos = 0;

    while(pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;

        results.push(pos)
        pos = pos + 1;
    }

    return results;
}
findall([1,2,3,1,3,2], 1)       // => [0, 3]
```

## 数组类型

ECMAScript 5 中可以使用 Array.isArray() 函数来判断是否为数组，在 ECMAScript 5 之前判断却没这么简单，因为 typeof 运算符操作数组返回的是「对象」，一般用下面的方法下判断是否是数组

```javascript
var isArray = Array.isArray || function(o) {
    return typeof o === "object" &&
            Object.prototype.toString.call(0) === '[object Array]';
};
```

## 类数组对象

JavaScript 数组的一些特性是其他对象没有的：

* 当有新的元素添加到列表中时，自动更新 length 属性
* 设置 length 为一个较小值将截断数组
* 从 Array.prototype 中继承一些有用的方法
* 其类属性为「Array」

以下代码为一个常规对象增加了一些属性使其变成类数组对象，然后遍历生成的伪数组的「元素」

```javascript
var a = {}

var i = 0;
while (i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;
a               // => { 0: 0, 1: 1, 2: 4, 3: 9 ..., length: 10 }

// 现在就可以当成真正的数组遍历它
var total = 0;
for (var j = 0; j < a.length; j++) {
    total+=a[j]
}
```

Arguments 对象就是一个类数组对象，DOM 方法 document.getElementsByTagName() 也返回类数组对象，它们都有数组的一些特性，比如索引访问、length 属性，但它们并不是真正的数组

```javascript
function isArrayLike(o) {
    if ( o &&
        typeof o === "object" &&
        isFinite(o.length) &&
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&
        o.length < 4294967296 ) {       // 数组长度的最大值 2^32
        return true;
    } else {
        return false;
    }
}
```

JavaScript 数组方法是 **特意定义为通用的**，它们不仅可以应用在数组而且可以应用在类数组对象上，一般使用 Array.prototype.method.call 来使用

```javascript
var a = {"0": "a", "1": "b", "2": "c", length: 3};
Array.prototype.join.call(a, "+")           // => "a+b+c"
```

## 作为数组的字符串

在 ECMAScript 5 中，字符串的行为类似于 **只读** 的数组。除子用 charAt() 方法来访问单个字符以外，还可以使用方括号：

```javascript
var s = "test";
s.charAt(0)         // => "t"
s.[1]               // => "e"
```

字符串的行为类似于数组的事实使得通用的数组方法可以应用到字符串上。不过请记住，字符串是 **不可变值**，当把它们作为数组看待时，它们是只读的。所以诸如：push(), sort(), reverse 等 **会修改数组** 的方法 如果被使用在字符串上是无效的，而且会导致错误并且没有相关提示

```javascript
s = "JavaScript"
Array.prototype.join.call(s, " ")       // => "J a v a S c r i p t"
```
